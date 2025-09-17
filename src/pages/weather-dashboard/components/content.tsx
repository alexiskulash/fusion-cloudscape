// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';

import { WeatherConfiguration } from './configuration';
import { CurrentWeatherSection } from './current-weather-section';
import { ForecastSection } from './forecast-section';

export function Content() {
  return (
    <SpaceBetween size="l">
      {/* Primary configuration section */}
      <WeatherConfiguration />

      {/* Current weather monitoring */}
      <CurrentWeatherSection />

      {/* Weather forecasts and analysis */}
      <ForecastSection />
    </SpaceBetween>
  );
}
