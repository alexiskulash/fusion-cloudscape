// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Icon from '@cloudscape-design/components/icon';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ExternalLinkItem } from '../../commons';

interface WeatherDashboardHeaderProps {
  actions: React.ReactNode;
}

export function WeatherDashboardHeader({ actions }: WeatherDashboardHeaderProps) {
  return (
    <Header
      variant="h1"
      info={
        <Link variant="info" onFollow={() => window.alert('Learn more about weather data')}>
          Info
        </Link>
      }
      description="Real-time weather information powered by Open-Meteo API"
      actions={actions}
    >
      Weather Dashboard
    </Header>
  );
}

export function WeatherDashboardInfo() {
  return (
    <HelpPanel
      header={<h2>Weather Dashboard</h2>}
      footer={
        <div>
          <h3>
            Learn more{' '}
            <span role="img" aria-label="Icon external Link">
              <Icon name="external" />
            </span>
          </h3>
          <ul>
            <li>
              <ExternalLinkItem href="https://open-meteo.com/" text="Open-Meteo Weather API" />
            </li>
            <li>
              <ExternalLinkItem href="https://cloudscape.design/components/" text="Cloudscape Design System" />
            </li>
          </ul>
        </div>
      }
    >
      <div>
        <Box variant="h3">Weather Dashboard Overview</Box>
        <Box variant="p">
          This dashboard provides comprehensive weather information using the Open-Meteo weather API. The dashboard
          displays current weather conditions, forecasts, and historical data for multiple locations.
        </Box>

        <Box variant="h3">Key Features</Box>
        <SpaceBetween size="s">
          <Box variant="p">
            <strong>Current Weather:</strong> Real-time temperature, humidity, precipitation, and weather conditions.
          </Box>
          <Box variant="p">
            <strong>Multi-location Support:</strong> Monitor weather across different cities and regions.
          </Box>
          <Box variant="p">
            <strong>Forecast Data:</strong> Extended weather forecasts with hourly and daily predictions.
          </Box>
          <Box variant="p">
            <strong>Weather Trends:</strong> Visual charts showing temperature and precipitation trends.
          </Box>
        </SpaceBetween>

        <Box variant="h3">Data Sources</Box>
        <Box variant="p">
          Weather data is provided by Open-Meteo, a free weather API that offers high-resolution forecasts without
          requiring an API key. Data is updated regularly to ensure accuracy.
        </Box>
      </div>
    </HelpPanel>
  );
}
