// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getWeatherDescription } from '../../services/weather-api';
import { useCurrentWeather } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function WeatherConditionsHeader() {
  return (
    <Header variant="h2" description="Current atmospheric conditions">
      Weather Conditions
    </Header>
  );
}

function WeatherConditionsWidget() {
  const { data, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading conditions...</StatusIndicator>
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
        <StatusIndicator type="warning">No data available</StatusIndicator>
      </Box>
    );
  }

  const current = data.current;
  const isDay = current.is_day === 1;

  const getConditionStatus = () => {
    if (current.weather_code === 0) return 'success';
    if (current.weather_code <= 3) return 'info';
    if (current.weather_code >= 95) return 'error';
    return 'warning';
  };

  const getPrecipitationText = () => {
    if (current.precipitation > 0) return `${current.precipitation} mm`;
    if (current.rain > 0) return `${current.rain} mm rain`;
    if (current.snowfall > 0) return `${current.snowfall} mm snow`;
    return 'None';
  };

  return (
    <SpaceBetween size="m">
      <Box>
        <Box variant="h3">Sky Condition</Box>
        <StatusIndicator type={getConditionStatus()}>{getWeatherDescription(current.weather_code)}</StatusIndicator>
      </Box>

      <Box>
        <Box variant="h3">Time of Day</Box>
        <StatusIndicator type={isDay ? 'success' : 'info'}>{isDay ? 'Daytime' : 'Nighttime'}</StatusIndicator>
      </Box>

      <Box>
        <Box variant="h3">Precipitation</Box>
        <Box variant="p">{getPrecipitationText()}</Box>
      </Box>

      <Box>
        <Box variant="h3">Visibility</Box>
        <StatusIndicator type={current.cloud_cover < 25 ? 'success' : current.cloud_cover < 75 ? 'warning' : 'error'}>
          {current.cloud_cover < 25
            ? 'Excellent'
            : current.cloud_cover < 50
              ? 'Good'
              : current.cloud_cover < 75
                ? 'Fair'
                : 'Poor'}
        </StatusIndicator>
      </Box>
    </SpaceBetween>
  );
}

export const weatherConditionsWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'status-warning',
    title: 'Weather Conditions',
    description: 'Current atmospheric conditions',
    header: WeatherConditionsHeader,
    content: WeatherConditionsWidget,
    staticMinHeight: 250,
  },
};
