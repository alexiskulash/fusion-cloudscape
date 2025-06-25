// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

interface WeatherHeaderProps {
  actions?: React.ReactNode;
}

export function WeatherHeader({ actions }: WeatherHeaderProps) {
  return (
    <Header
      variant="h1"
      description="Real-time weather data and forecasts powered by Open-Meteo Weather API"
      actions={actions}
      info={
        <ExpandableSection headerText="Weather Dashboard Info" variant="footer">
          <SpaceBetween size="s">
            <Box variant="p">
              This weather dashboard provides comprehensive weather information including current conditions, hourly and
              daily forecasts, and interactive charts. Data is sourced from the Open-Meteo Weather API.
            </Box>
            <Box variant="p">
              <strong>Features:</strong>
            </Box>
            <ul>
              <li>Current weather conditions with real-time updates</li>
              <li>24-hour hourly forecasts</li>
              <li>7-day daily forecasts</li>
              <li>Interactive temperature charts</li>
              <li>Location selection and search</li>
              <li>Automatic refresh every 10 minutes</li>
            </ul>
          </SpaceBetween>
        </ExpandableSection>
      }
    >
      Weather Dashboard
    </Header>
  );
}

export function WeatherMainInfo() {
  return (
    <SpaceBetween size="s">
      <Box variant="h2">Weather Dashboard</Box>
      <StatusIndicator type="success">Data Source: Open-Meteo API</StatusIndicator>
      <Box variant="p">
        This dashboard provides comprehensive weather information using the Open-Meteo Weather API. The API provides
        free access to weather data without requiring an API key.
      </Box>
      <Box variant="h3">Available Data</Box>
      <ul>
        <li>Current weather conditions</li>
        <li>Hourly forecasts (24 hours)</li>
        <li>Daily forecasts (7 days)</li>
        <li>Temperature, humidity, wind speed</li>
        <li>Weather conditions and precipitation</li>
      </ul>
      <Box variant="h3">Auto-refresh</Box>
      <Box variant="p">
        Weather data automatically refreshes every 10 minutes to ensure you have the most current information.
      </Box>
    </SpaceBetween>
  );
}
