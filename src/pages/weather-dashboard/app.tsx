// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect, useCallback } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { WeatherResponse, WeatherLocation } from './types';
import { fetchWeatherData, getCurrentLocation, getLocationName, popularCities } from './services/weather-api';
import { getTimeOfDayGreeting } from './utils';

import { CurrentWeatherWidget } from './components/current-weather-widget';
import { HourlyForecastWidget } from './components/hourly-forecast-widget';
import { DailyForecastWidget } from './components/daily-forecast-widget';
import { TemperatureChartWidget } from './components/temperature-chart-widget';
import { LocationSelectorWidget } from './components/location-selector-widget';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Default location (New York City)
const DEFAULT_LOCATION: WeatherLocation = {
  latitude: 40.7128,
  longitude: -74.006,
  city: 'New York',
  country: 'USA',
};

export function App() {
  // Core weather data state - stores the complete API response from Open-Meteo
  // Contains current conditions, hourly forecasts, and daily forecasts
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  // Current location being displayed - includes lat/lng coordinates and optional city/country names
  // Defaults to New York City but gets updated with user's actual location on mount
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation>(DEFAULT_LOCATION);

  // Loading state to show spinners and disable interactions during API calls
  const [isLoading, setIsLoading] = useState(false);

  // Notification queue for user feedback - limited to 5 items to prevent UI overflow
  // Each notification has a unique ID for targeted removal
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([]);

  // Timestamp of last successful data fetch - used for "last updated" display
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /**
   * Adds a new notification to the queue with automatic ID generation
   * Limits queue to 5 items by removing oldest notifications
   * Uses current timestamp as unique ID to ensure no conflicts
   */
  const addNotification = useCallback((notification: FlashbarProps.MessageDefinition) => {
    setNotifications(prev => [{ ...notification, id: Date.now().toString() }, ...prev.slice(0, 4)]);
  }, []);

  /**
   * Removes a specific notification by ID
   * Used for manual dismissal or automatic cleanup
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /**
   * Core function to fetch weather data for a given location
   * Handles the complete flow: loading state, API call, data processing, and user feedback
   *
   * Process:
   * 1. Set loading state to show spinners
   * 2. Call Open-Meteo API with location coordinates
   * 3. Update weather data and timestamp on success
   * 4. Attempt to resolve location name if not already known (reverse geocoding)
   * 5. Show success/error notifications to user
   * 6. Always clear loading state in finally block
   */
  const fetchWeatherForLocation = useCallback(
    async (location: WeatherLocation) => {
      setIsLoading(true);
      try {
        // Fetch weather data from Open-Meteo API
        const weather = await fetchWeatherData(location);
        setWeatherData(weather);
        setLastUpdated(new Date());

        // Attempt to resolve human-readable location name if not already provided
        // This happens when user provides raw coordinates or uses geolocation
        if (!location.city || !location.country) {
          const locationInfo = await getLocationName(location);
          setCurrentLocation(prev => ({
            ...prev,
            ...locationInfo,
          }));
        }

        // Show success feedback to user
        addNotification({
          type: 'success',
          content: 'Weather data updated successfully',
          dismissible: true,
          onDismiss: () => removeNotification('weather-success'),
        });
      } catch (error) {
        // Log error for debugging and show user-friendly error message
        console.error('Error fetching weather data:', error);
        addNotification({
          type: 'error',
          content: `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`,
          dismissible: true,
          onDismiss: () => removeNotification('weather-error'),
        });
      } finally {
        // Always clear loading state, regardless of success or failure
        setIsLoading(false);
      }
    },
    [addNotification, removeNotification],
  );

  /**
   * Handler for location changes from the location selector widget
   * Updates current location state and immediately fetches weather for the new location
   * This provides instant feedback when users change locations
   */
  const handleLocationChange = useCallback(
    (newLocation: WeatherLocation) => {
      setCurrentLocation(newLocation);
      fetchWeatherForLocation(newLocation);
    },
    [fetchWeatherForLocation],
  );

  /**
   * Manual refresh handler for the refresh button
   * Re-fetches weather data for the current location
   * Useful when user wants to get the latest data or recover from errors
   */
  const handleRefresh = useCallback(() => {
    fetchWeatherForLocation(currentLocation);
  }, [fetchWeatherForLocation, currentLocation]);

  /**
   * Initialization effect - runs once on component mount
   * Attempts to get user's current location via browser geolocation API
   * Falls back to default location (NYC) if geolocation fails or is denied
   *
   * Flow:
   * 1. Request user's current coordinates
   * 2. Resolve coordinates to human-readable location name
   * 3. Update location state and fetch weather data
   * 4. On any error, use default location instead
   */
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // Request user's current location via browser geolocation
        const userLocation = await getCurrentLocation();
        // Resolve coordinates to city/country names for better UX
        const locationInfo = await getLocationName(userLocation);
        const fullLocation = { ...userLocation, ...locationInfo };
        setCurrentLocation(fullLocation);
        fetchWeatherForLocation(fullLocation);
      } catch (error) {
        // Geolocation can fail for many reasons: permission denied, unavailable, timeout
        console.warn('Could not get user location, using default:', error);
        fetchWeatherForLocation(DEFAULT_LOCATION);
      }
    };

    initializeLocation();
  }, [fetchWeatherForLocation]);

  /**
   * Auto-refresh effect - keeps weather data current without user intervention
   * Refreshes data every 10 minutes (600,000ms) when not actively loading
   * Prevents overlapping requests by checking loading state
   *
   * Cleanup function clears interval on component unmount or dependency changes
   */
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-refresh if not currently loading to prevent request conflicts
      if (!isLoading) {
        fetchWeatherForLocation(currentLocation);
      }
    }, 600000); // 10 minutes - matches typical weather data update frequency

    // Cleanup interval on unmount or dependency changes
    return () => clearInterval(interval);
  }, [fetchWeatherForLocation, currentLocation, isLoading]);

  /**
   * Dashboard header component with dynamic greeting and action buttons
   * - Shows time-based greeting (Good morning/afternoon/evening)
   * - Refresh button to manually update data (shows loading state)
   * - Settings button for future configuration options
   * - Last updated timestamp badge when data is available
   */
  const dashboardHeader = (
    <Header
      variant="h1"
      description={`${getTimeOfDayGreeting()}! Here's your local weather information and forecast.`}
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {/* Manual refresh button - disabled during loading to prevent multiple requests */}
          <Button iconName="refresh" loading={isLoading} onClick={handleRefresh}>
            Refresh
          </Button>
          {/* Settings button - placeholder for future configuration features */}
          <Button variant="primary" iconName="settings">
            Settings
          </Button>
        </SpaceBetween>
      }
      info={lastUpdated && <Badge color="green">Last updated: {lastUpdated.toLocaleTimeString()}</Badge>}
    >
      Weather Dashboard
    </Header>
  );

  /**
   * Informational panel explaining dashboard features and data source
   * Serves as both documentation and marketing for the weather dashboard
   * Positioned at the bottom of the grid to provide context without cluttering main content
   */
  const weatherOverviewInfo = (
    <Container>
      <SpaceBetween size="m">
        <Box variant="h3">Weather Dashboard</Box>
        <Box variant="p">
          This dashboard provides comprehensive weather information using the Open-Meteo Weather API. Get current
          conditions, hourly forecasts, and 7-day outlooks for any location worldwide.
        </Box>
        <SpaceBetween size="s">
          <Box variant="h4">Features:</Box>
          {/* Feature list highlighting key capabilities */}
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Real-time current weather conditions</li>
            <li>24-hour hourly forecast</li>
            <li>7-day daily forecast</li>
            <li>Temperature trend charts</li>
            <li>Multiple location support</li>
            <li>Automatic location detection</li>
          </ul>
        </SpaceBetween>
        {/* Attribution and auto-refresh information */}
        <Box variant="small" color="text-status-inactive">
          Weather data provided by Open-Meteo • Updates automatically every 10 minutes
        </Box>
      </SpaceBetween>
    </Container>
  );

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          {/* Main dashboard header with greeting, actions, and last updated info */}
          {dashboardHeader}

          {/* Global notification system for user feedback */}
          <Flashbar items={notifications} />

          {/*
            Responsive grid layout optimized for weather dashboard content:
            - Row 1: Current weather (8 cols) + Location selector (4 cols) on large screens
            - Row 2: Hourly forecast (6 cols) + Daily forecast (6 cols) on large screens
            - Row 3: Temperature chart (full width)
            - Row 4: Info panel (full width)

            On smaller screens, all components stack vertically (12 cols each)
          */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, l: 8 } }, // Current weather - primary content
              { colspan: { default: 12, l: 4 } }, // Location selector - sidebar
              { colspan: { default: 12, l: 6 } }, // Hourly forecast - left half
              { colspan: { default: 12, l: 6 } }, // Daily forecast - right half
              { colspan: { default: 12 } }, // Temperature chart - full width
              { colspan: { default: 12 } }, // Info panel - full width
            ]}
          >
            {/*
              Current Weather Widget - Primary content area
              Shows current conditions, temperature, humidity, wind, etc.
              Only renders when weather data is available
            */}
            {weatherData && (
              <CurrentWeatherWidget weather={weatherData.current} location={currentLocation} isLoading={isLoading} />
            )}

            {/*
              Location Selector Widget - Sidebar component
              Allows users to change location via popular cities, coordinates, or geolocation
              Always visible to allow location changes even without initial data
            */}
            <LocationSelectorWidget
              currentLocation={currentLocation}
              onLocationChange={handleLocationChange}
              isLoading={isLoading}
            />

            {/*
              Hourly Forecast Widget - Next 24 hours preview
              Scrollable horizontal layout showing hourly conditions
              Only renders when weather data is available
            */}
            {weatherData && <HourlyForecastWidget hourlyWeather={weatherData.hourly} isLoading={isLoading} />}

            {/*
              Daily Forecast Widget - 7-day outlook
              Vertical list showing daily conditions with min/max temps
              Only renders when weather data is available
            */}
            {weatherData && <DailyForecastWidget dailyWeather={weatherData.daily} isLoading={isLoading} />}

            {/*
              Temperature Chart Widget - Visual trend analysis
              Line chart showing temperature changes over next 24 hours
              Only renders when weather data is available
            */}
            {weatherData && <TemperatureChartWidget hourlyWeather={weatherData.hourly} isLoading={isLoading} />}

            {/*
              Information Panel - Dashboard documentation and features
              Always visible to provide context and feature explanation
            */}
            {weatherOverviewInfo}
          </Grid>
        </SpaceBetween>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Home', href: '/' },
            { text: 'Weather Dashboard', href: '/weather-dashboard' },
          ]}
        />
      }
      navigationHide
      toolsHide
      notifications={
        <Flashbar
          items={notifications.map(item => ({
            ...item,
            onDismiss: item.onDismiss || (() => removeNotification(item.id || '')),
          }))}
        />
      }
    />
  );
}
