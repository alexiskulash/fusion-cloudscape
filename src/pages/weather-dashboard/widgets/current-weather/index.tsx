// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { DEFAULT_LOCATION, getWeatherDescription } from '../../services/weather-api';
import { useCurrentWeather } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function CurrentWeatherHeader() {
  return (
    <Header variant="h2" description={`Current conditions for ${DEFAULT_LOCATION.name}`}>
      Current Weather
    </Header>
  );
}

function CurrentWeatherWidget() {
  const { data, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading weather data...</StatusIndicator>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="error">Error: {error}</StatusIndicator>
      </Box>
    );
  }

  if (!data?.current) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="warning">No weather data available</StatusIndicator>
      </Box>
    );
  }

  const current = data.current;
  const isDay = current.is_day === 1;

  return (
    <SpaceBetween size="l">
      <Box textAlign="center">
        <Box fontSize="display-l" fontWeight="bold" color={isDay ? 'text-status-info' : 'text-status-inactive'}>
          {Math.round(current.temperature_2m)}°C
        </Box>
        <Box variant="h3" color="text-label">
          {getWeatherDescription(current.weather_code)}
        </Box>
        <Box variant="small" color="text-body-secondary">
          Feels like {Math.round(current.apparent_temperature)}°C
        </Box>
      </Box>

      <KeyValuePairs
        columns={2}
        items={[
          {
            label: 'Humidity',
            value: `${current.relative_humidity_2m}%`,
          },
          {
            label: 'Wind Speed',
            value: `${Math.round(current.wind_speed_10m)} km/h`,
          },
          {
            label: 'Pressure',
            value: `${Math.round(current.pressure_msl)} hPa`,
          },
          {
            label: 'Cloud Cover',
            value: `${current.cloud_cover}%`,
          },
        ]}
      />

      <Box variant="small" color="text-body-secondary" textAlign="center">
        Last updated: {new Date(current.time).toLocaleTimeString()}
      </Box>
    </SpaceBetween>
  );
}

export const currentWeatherWidget: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 4 },
  data: {
    icon: 'status-info',
    title: 'Current Weather',
    description: 'Real-time weather conditions',
    header: CurrentWeatherHeader,
    content: CurrentWeatherWidget,
    staticMinHeight: 300,
  },
};
