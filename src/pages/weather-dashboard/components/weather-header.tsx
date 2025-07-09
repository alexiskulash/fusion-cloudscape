// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import TextContent from '@cloudscape-design/components/text-content';

interface WeatherHeaderProps {
  actions?: React.ReactNode;
}

export function WeatherHeader({ actions }: WeatherHeaderProps) {
  return (
    <Header variant="h1" actions={actions} description="Real-time weather data and forecasts powered by Open-Meteo API">
      Weather Dashboard
    </Header>
  );
}

export function WeatherMainInfo() {
  return (
    <SpaceBetween size="l">
      <Box>
        <TextContent>
          <h3>About Weather Dashboard</h3>
          <p>
            This dashboard provides comprehensive weather information including current conditions, hourly forecasts,
            and 7-day outlook. Weather data is sourced from the Open-Meteo API, which provides accurate meteorological
            information worldwide.
          </p>
        </TextContent>
      </Box>

      <Box>
        <KeyValuePairs
          columns={1}
          items={[
            {
              label: 'Data Source',
              value: 'Open-Meteo API',
            },
            {
              label: 'Update Frequency',
              value: 'Hourly',
            },
            {
              label: 'Forecast Range',
              value: '7 days',
            },
            {
              label: 'Coverage',
              value: 'Global',
            },
          ]}
        />
      </Box>

      <Box>
        <TextContent>
          <h4>Features</h4>
          <ul>
            <li>Current weather conditions</li>
            <li>24-hour hourly forecast</li>
            <li>7-day daily forecast</li>
            <li>Location search functionality</li>
            <li>Temperature, humidity, wind, and precipitation data</li>
            <li>Weather condition icons and descriptions</li>
          </ul>
        </TextContent>
      </Box>
    </SpaceBetween>
  );
}
