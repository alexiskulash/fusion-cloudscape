// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getWindDirection } from '../../services/weather-api';
import { useCurrentWeather } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function WindInfoHeader() {
  return (
    <Header variant="h2" description="Current wind conditions">
      Wind Information
    </Header>
  );
}

function WindInfoWidget() {
  const { data, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading wind data...</StatusIndicator>
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
        <StatusIndicator type="warning">No wind data available</StatusIndicator>
      </Box>
    );
  }

  const current = data.current;
  const windSpeed = Math.round(current.wind_speed_10m);
  const windGusts = Math.round(current.wind_gusts_10m);
  const windDirection = getWindDirection(current.wind_direction_10m);

  const getWindStrength = () => {
    if (windSpeed < 12) return { status: 'success', text: 'Light' };
    if (windSpeed < 25) return { status: 'info', text: 'Moderate' };
    if (windSpeed < 50) return { status: 'warning', text: 'Strong' };
    return { status: 'error', text: 'Very Strong' };
  };

  const windStrength = getWindStrength();

  return (
    <SpaceBetween size="l">
      <Box textAlign="center">
        <Box fontSize="display-l" fontWeight="bold" color="text-status-info">
          {windSpeed}
        </Box>
        <Box variant="h3">km/h</Box>
        <StatusIndicator type={windStrength.status as any}>{windStrength.text}</StatusIndicator>
      </Box>

      <KeyValuePairs
        columns={1}
        items={[
          {
            label: 'Direction',
            value: `${windDirection} (${Math.round(current.wind_direction_10m)}°)`,
          },
          {
            label: 'Gusts',
            value: `${windGusts} km/h`,
          },
        ]}
      />
    </SpaceBetween>
  );
}

export const windInfoWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'status-pending',
    title: 'Wind Information',
    description: 'Current wind speed and direction',
    header: WindInfoHeader,
    content: WindInfoWidget,
    staticMinHeight: 200,
  },
};
