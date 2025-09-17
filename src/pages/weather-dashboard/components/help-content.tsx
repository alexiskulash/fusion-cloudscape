// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import HelpPanel from '@cloudscape-design/components/help-panel';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function WeatherHelpContent() {
  return (
    <HelpPanel
      header={<Header variant="h3">Weather monitoring dashboard</Header>}
      footer={
        <Box textAlign="center">
          <Link external href="https://open-meteo.com/en/docs">
            Open-Meteo API documentation
          </Link>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <Box variant="p">
          This dashboard provides real-time weather monitoring using data from the Open-Meteo API.
          Monitor current conditions, view forecasts, and compare weather across multiple locations.
        </Box>

        <Box variant="h4">Location selection</Box>
        <Box variant="p">
          Use the location dropdown in the page header to select your primary monitoring location.
          The current conditions and forecast sections will update to show data for the selected city.
        </Box>

        <Box variant="h4">Current conditions</Box>
        <Box variant="p">
          View real-time weather data including temperature, humidity, wind speed and direction.
          Data is automatically refreshed and shows the most recent observations.
        </Box>

        <Box variant="h4">Weather forecast</Box>
        <Box variant="p">
          Toggle between 24-hour and 7-day forecast views. The chart shows temperature trends
          and helps identify upcoming weather patterns.
        </Box>

        <Box variant="h4">Global comparison</Box>
        <Box variant="p">
          Expand the global weather section to compare conditions across multiple major cities.
          This provides context for regional weather patterns and helps with travel planning.
        </Box>

        <Box variant="h4">Data source</Box>
        <Box variant="p">
          Weather data is provided by Open-Meteo, a free and open-source weather API.
          Data includes forecasts from multiple national weather services with high accuracy.
        </Box>
      </SpaceBetween>
    </HelpPanel>
  );
}
