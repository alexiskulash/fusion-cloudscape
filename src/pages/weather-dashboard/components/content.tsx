// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import {
  currentWeatherWidget,
  dailyForecastWidget,
  hourlyForecastWidget,
  weatherConditionsWidget,
  windInfoWidget,
  uvIndexWidget,
  humidityPressureWidget,
  precipitationWidget,
} from '../widgets';
import { BaseStaticWidget } from '../widgets/base-static-widget';

/**
 * Content component for the Weather Dashboard
 *
 * This component renders the main content area of the weather dashboard using a responsive
 * grid layout. It displays 8 different weather widgets arranged in a carefully designed
 * layout that adapts to different screen sizes.
 *
 * Layout Structure:
 * - Row 1: Current Weather (8 cols) + Weather Conditions (4 cols)
 * - Row 2: Wind Info (6 cols) + Humidity/Pressure (6 cols)
 * - Row 3: UV Index (4 cols) + Precipitation (4 cols) + Daily Forecast (4 cols)
 * - Row 4: Hourly Forecast (full width - 12 cols)
 *
 * The grid uses Cloudscape's responsive column system:
 * - l: Large screens (desktop)
 * - m: Medium screens (tablet)
 * - default: Small screens (mobile) - all widgets stack to full width
 *
 * @returns {JSX.Element} The weather dashboard content grid with all widgets
 */
export function Content() {
  return (
    <Grid
      gridDefinition={[
        // Row 1: Primary weather display
        { colspan: { l: 8, m: 8, default: 12 } }, // Current Weather - main temperature and conditions
        { colspan: { l: 4, m: 4, default: 12 } }, // Weather Conditions - detailed status info

        // Row 2: Secondary weather metrics
        { colspan: { l: 6, m: 6, default: 12 } }, // Wind Information - speed, direction, gusts
        { colspan: { l: 6, m: 6, default: 12 } }, // Humidity & Pressure - atmospheric conditions

        // Row 3: Additional metrics in compact layout
        { colspan: { l: 4, m: 4, default: 12 } }, // UV Index - sun exposure safety
        { colspan: { l: 4, m: 4, default: 12 } }, // Precipitation - rain, snow amounts
        { colspan: { l: 4, m: 4, default: 12 } }, // Daily Forecast - 7-day outlook

        // Row 4: Detailed forecast data
        { colspan: { l: 12, m: 12, default: 12 } }, // Hourly Forecast - next 24 hours (full width)
      ]}
    >
      {/*
        Render all weather widgets in the specified order using BaseStaticWidget wrapper.
        Each widget contains its own data fetching logic and error handling.
        The order matches the grid definition above for proper layout positioning.
      */}
      {[
        currentWeatherWidget,      // Primary temperature and basic conditions
        weatherConditionsWidget,   // Detailed weather status and visibility
        windInfoWidget,           // Wind speed, direction and strength indicators
        humidityPressureWidget,   // Atmospheric pressure and humidity levels
        uvIndexWidget,            // UV index with safety recommendations
        precipitationWidget,      // Current precipitation amounts by type
        dailyForecastWidget,      // 7-day weather forecast table
        hourlyForecastWidget,     // 24-hour detailed forecast table
      ].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
