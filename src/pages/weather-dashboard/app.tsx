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
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation>(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const addNotification = useCallback((notification: FlashbarProps.MessageDefinition) => {
    setNotifications(prev => [{ ...notification, id: Date.now().toString() }, ...prev.slice(0, 4)]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const fetchWeatherForLocation = useCallback(
    async (location: WeatherLocation) => {
      setIsLoading(true);
      try {
        const weather = await fetchWeatherData(location);
        setWeatherData(weather);
        setLastUpdated(new Date());

        // Try to get location name if not provided
        if (!location.city || !location.country) {
          const locationInfo = await getLocationName(location);
          setCurrentLocation(prev => ({
            ...prev,
            ...locationInfo,
          }));
        }

        addNotification({
          type: 'success',
          content: 'Weather data updated successfully',
          dismissible: true,
          onDismiss: () => removeNotification('weather-success'),
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        addNotification({
          type: 'error',
          content: `Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`,
          dismissible: true,
          onDismiss: () => removeNotification('weather-error'),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addNotification, removeNotification],
  );

  const handleLocationChange = useCallback(
    (newLocation: WeatherLocation) => {
      setCurrentLocation(newLocation);
      fetchWeatherForLocation(newLocation);
    },
    [fetchWeatherForLocation],
  );

  const handleRefresh = useCallback(() => {
    fetchWeatherForLocation(currentLocation);
  }, [fetchWeatherForLocation, currentLocation]);

  // Initialize with user's current location or default
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const userLocation = await getCurrentLocation();
        const locationInfo = await getLocationName(userLocation);
        const fullLocation = { ...userLocation, ...locationInfo };
        setCurrentLocation(fullLocation);
        fetchWeatherForLocation(fullLocation);
      } catch (error) {
        console.warn('Could not get user location, using default:', error);
        fetchWeatherForLocation(DEFAULT_LOCATION);
      }
    };

    initializeLocation();
  }, [fetchWeatherForLocation]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchWeatherForLocation(currentLocation);
      }
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [fetchWeatherForLocation, currentLocation, isLoading]);

  const dashboardHeader = (
    <Header
      variant="h1"
      description={`${getTimeOfDayGreeting()}! Here's your local weather information and forecast.`}
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button iconName="refresh" loading={isLoading} onClick={handleRefresh}>
            Refresh
          </Button>
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
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Real-time current weather conditions</li>
            <li>24-hour hourly forecast</li>
            <li>7-day daily forecast</li>
            <li>Temperature trend charts</li>
            <li>Multiple location support</li>
            <li>Automatic location detection</li>
          </ul>
        </SpaceBetween>
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
          {dashboardHeader}

          <Flashbar items={notifications} />

          <Grid
            gridDefinition={[
              { colspan: { default: 12, l: 8 } },
              { colspan: { default: 12, l: 4 } },
              { colspan: { default: 12, l: 6 } },
              { colspan: { default: 12, l: 6 } },
              { colspan: { default: 12 } },
              { colspan: { default: 12 } },
            ]}
          >
            {/* Current Weather - Main */}
            {weatherData && (
              <CurrentWeatherWidget weather={weatherData.current} location={currentLocation} isLoading={isLoading} />
            )}

            {/* Location Selector - Sidebar */}
            <LocationSelectorWidget
              currentLocation={currentLocation}
              onLocationChange={handleLocationChange}
              isLoading={isLoading}
            />

            {/* Hourly Forecast */}
            {weatherData && <HourlyForecastWidget hourlyWeather={weatherData.hourly} isLoading={isLoading} />}

            {/* Daily Forecast */}
            {weatherData && <DailyForecastWidget dailyWeather={weatherData.daily} isLoading={isLoading} />}

            {/* Temperature Chart */}
            {weatherData && <TemperatureChartWidget hourlyWeather={weatherData.hourly} isLoading={isLoading} />}

            {/* Info Panel */}
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
