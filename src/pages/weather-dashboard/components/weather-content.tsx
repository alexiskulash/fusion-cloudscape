// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';
import Spinner from '@cloudscape-design/components/spinner';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';

import { WeatherLocation, WeatherResponse, WeatherService } from '../services/weather-api';
import { LocationSelector } from './location-selector';
import { CurrentWeatherWidget } from './current-weather-widget';
import { HourlyForecastWidget } from './hourly-forecast-widget';
import { DailyForecastWidget } from './daily-forecast-widget';

export function WeatherContent() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (location: WeatherLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await WeatherService.getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: WeatherLocation) => {
    setSelectedLocation(location);
    fetchWeatherData(location);
  };

  const handleRefresh = () => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  };

  // Load default location on mount
  useEffect(() => {
    const defaultLocation = WeatherService.getDefaultLocations()[0];
    setSelectedLocation(defaultLocation);
    fetchWeatherData(defaultLocation);
  }, []);

  return (
    <SpaceBetween size="l">
      {error && (
        <Flashbar
          items={[
            {
              type: 'error',
              content: error,
              dismissible: true,
              onDismiss: () => setError(null),
              action: selectedLocation ? (
                <Button onClick={handleRefresh} iconName="refresh">
                  Retry
                </Button>
              ) : undefined,
            },
          ]}
        />
      )}

      <LocationSelector selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />

      {isLoading && (
        <Box textAlign="center" padding="l">
          <Spinner size="large" />
          <Box variant="p" margin={{ top: 's' }}>
            Loading weather data...
          </Box>
        </Box>
      )}

      {weatherData && !isLoading && (
        <SpaceBetween size="l">
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 4, xl: 4 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 8, xl: 8 } },
            ]}
          >
            <CurrentWeatherWidget weather={weatherData.current} location={weatherData.location} />
            <HourlyForecastWidget forecast={weatherData.hourly} />
          </Grid>

          <DailyForecastWidget forecast={weatherData.daily} />
        </SpaceBetween>
      )}

      {!weatherData && !isLoading && !error && selectedLocation && (
        <Box textAlign="center" padding="l">
          <Box variant="h3" margin={{ bottom: 's' }}>
            No weather data available
          </Box>
          <Box variant="p" margin={{ bottom: 'm' }}>
            Unable to load weather data for {selectedLocation.name}. Please try again.
          </Box>
          <Button variant="primary" onClick={handleRefresh} iconName="refresh">
            Retry
          </Button>
        </Box>
      )}
    </SpaceBetween>
  );
}
