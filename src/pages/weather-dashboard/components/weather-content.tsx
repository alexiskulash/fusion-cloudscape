// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState, useCallback } from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WeatherApiService } from '../services/weather-api';
import { WeatherData, WeatherLocation, POPULAR_CITIES } from '../types';
import { CurrentWeatherWidget } from './current-weather-widget';
import { DailyForecastWidget } from './daily-forecast-widget';
import { HourlyForecastWidget } from './hourly-forecast-widget';
import { LocationInputWidget } from './location-input-widget';
import { TemperatureChartWidget } from './temperature-chart-widget';

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function WeatherContent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(POPULAR_CITIES[0]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoLocationLoading, setAutoLocationLoading] = useState(false);

  const fetchWeatherData = useCallback(async (location: WeatherLocation) => {
    setLoading(true);
    setError(null);

    try {
      const data = await WeatherApiService.fetchWeatherData(location);
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLocationChange = useCallback(
    (location: WeatherLocation) => {
      setSelectedLocation(location);
      fetchWeatherData(location);
    },
    [fetchWeatherData],
  );

  const handleUseCurrentLocation = useCallback(async () => {
    setAutoLocationLoading(true);
    try {
      const userLocation = await WeatherApiService.getUserLocation();
      handleLocationChange(userLocation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get current location');
    } finally {
      setAutoLocationLoading(false);
    }
  }, [handleLocationChange]);

  const handleRefresh = useCallback(() => {
    fetchWeatherData(selectedLocation);
  }, [fetchWeatherData, selectedLocation]);

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [fetchWeatherData, selectedLocation]);

  // Auto-refresh setup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchWeatherData(selectedLocation);
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchWeatherData, selectedLocation, loading]);

  const locationSelectOptions = POPULAR_CITIES.map(city => ({
    label: city.name,
    value: city.name,
    city,
  }));

  if (loading && !weatherData) {
    return (
      <Container>
        <Box textAlign="center" padding="xl">
          <Spinner size="large" />
          <Box variant="p" padding={{ top: 'm' }}>
            Loading weather data...
          </Box>
        </Box>
      </Container>
    );
  }

  if (error && !weatherData) {
    return (
      <Container>
        <Alert
          type="error"
          header="Failed to load weather data"
          action={
            <Button onClick={handleRefresh} iconName="refresh">
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <SpaceBetween size="l">
      {/* Location Selection */}
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button loading={autoLocationLoading} onClick={handleUseCurrentLocation} iconName="status-info">
                  Use Current Location
                </Button>
                <Button loading={loading} onClick={handleRefresh} iconName="refresh">
                  Refresh
                </Button>
              </SpaceBetween>
            }
            info={
              lastUpdated && (
                <StatusIndicator type="success">Last updated: {lastUpdated.toLocaleTimeString()}</StatusIndicator>
              )
            }
          >
            Location Settings
          </Header>
        }
      >
        <ColumnLayout columns={2}>
          <div>
            <Box variant="awsui-key-label">Popular Cities</Box>
            <Select
              selectedOption={locationSelectOptions.find(option => option.city.name === selectedLocation.name) || null}
              onChange={({ detail }) => {
                if (detail.selectedOption?.city) {
                  handleLocationChange(detail.selectedOption.city);
                }
              }}
              options={locationSelectOptions}
              placeholder="Select a city"
              expandToViewport
            />
          </div>
          <LocationInputWidget onLocationSubmit={handleLocationChange} />
        </ColumnLayout>
      </Container>

      {error && (
        <Alert type="warning" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      {weatherData && (
        <>
          {/* Current Weather */}
          <CurrentWeatherWidget weatherData={weatherData} />

          {/* Hourly and Daily Forecasts */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
            ]}
          >
            <HourlyForecastWidget hourlyData={weatherData.hourly} />
            <DailyForecastWidget dailyData={weatherData.daily} />
          </Grid>

          {/* Temperature Chart */}
          <TemperatureChartWidget hourlyData={weatherData.hourly} dailyData={weatherData.daily} />
        </>
      )}
    </SpaceBetween>
  );
}
