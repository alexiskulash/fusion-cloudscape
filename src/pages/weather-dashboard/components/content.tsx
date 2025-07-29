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

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
      ]}
    >
      {[
        currentWeatherWidget,
        weatherConditionsWidget,
        windInfoWidget,
        humidityPressureWidget,
        uvIndexWidget,
        precipitationWidget,
        dailyForecastWidget,
        hourlyForecastWidget,
      ].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
