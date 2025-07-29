// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function WeatherDashboardHeader({ actions }: { actions?: React.ReactNode }) {
  return (
    <Header variant="h1" actions={actions} description="Real-time weather data and forecasts powered by Open-Meteo API">
      Weather Dashboard
    </Header>
  );
}

export function WeatherDashboardMainInfo() {
  return (
    <Box>
      <SpaceBetween size="l">
        <Box>
          <Box variant="h3">About this dashboard</Box>
          <Box variant="p">
            This weather dashboard provides comprehensive weather information including current conditions, hourly
            forecasts, and daily forecasts. Data is sourced from the Open-Meteo API, a free weather API that provides
            accurate meteorological data.
          </Box>
        </Box>
        <Box>
          <Box variant="h3">Data source</Box>
          <Box variant="p">
            All weather data is provided by Open-Meteo, an open-source weather API that offers free access to weather
            data worldwide. The API provides current weather conditions, forecasts, and historical data with high
            accuracy.
          </Box>
        </Box>
        <Box>
          <Box variant="h3">Default location</Box>
          <Box variant="p">
            The dashboard displays weather data for Berlin, Germany (52.52°N, 13.41°E) by default. This can be
            customized to show weather for any location worldwide.
          </Box>
        </Box>
      </SpaceBetween>
    </Box>
  );
}
