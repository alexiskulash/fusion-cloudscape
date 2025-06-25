// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WeatherData, WEATHER_CODES } from '../types';

interface CurrentWeatherWidgetProps {
  weatherData: WeatherData;
}

export function CurrentWeatherWidget({ weatherData }: CurrentWeatherWidgetProps) {
  const { current, location } = weatherData;
  const weatherInfo = WEATHER_CODES[current.weatherCode] || {
    description: 'Unknown',
    icon: '❓',
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  const getWindDirection = (degrees: number) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={`Current weather conditions for ${location.name}`}
          info={<StatusIndicator type="success">Live Data</StatusIndicator>}
        >
          Current Weather
        </Header>
      }
    >
      <SpaceBetween size="m">
        {/* Main Weather Display */}
        <ColumnLayout columns={3}>
          <div style={{ textAlign: 'center' }}>
            <Box fontSize="display-l" fontWeight="bold">
              {Math.round(current.temperature)}°C
            </Box>
            <Box variant="p" color="text-status-info">
              Temperature
            </Box>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Box fontSize="heading-xl">{weatherInfo.icon}</Box>
            <Box variant="p" color="text-status-info">
              {weatherInfo.description}
            </Box>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Box fontSize="heading-l" fontWeight="bold">
              {current.humidity}%
            </Box>
            <Box variant="p" color="text-status-info">
              Humidity
            </Box>
          </div>
        </ColumnLayout>

        {/* Detailed Information */}
        <KeyValuePairs
          columns={4}
          items={[
            {
              label: 'Wind Speed',
              value: `${Math.round(current.windSpeed)} km/h`,
            },
            {
              label: 'Wind Direction',
              value: `${getWindDirection(current.windDirection)} (${Math.round(current.windDirection)}°)`,
            },
            {
              label: 'Last Updated',
              value: formatTime(current.time),
            },
            {
              label: 'Location',
              value: location.name,
            },
          ]}
        />
      </SpaceBetween>
    </Container>
  );
}
