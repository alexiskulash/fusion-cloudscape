// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import {
  BaseStaticWidget,
  currentWeather,
  weatherAlerts,
  weatherForecast,
  weatherMap,
  weatherTrends,
  favoriteLocations,
  weatherSummary,
  airQuality,
  uvIndex,
} from '../widgets';

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
      ]}
    >
      {[
        currentWeather,
        weatherSummary,
        weatherForecast,
        weatherAlerts,
        weatherTrends,
        favoriteLocations,
        airQuality,
        uvIndex,
        weatherMap,
      ].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
