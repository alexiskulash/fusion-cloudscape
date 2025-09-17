// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';

import { WeatherWidgetDataType } from '../widgets/interfaces';
import {
  currentWeather,
  temperatureForecast,
  weatherDetails,
  multiLocation,
} from '../widgets';

function WeatherStaticWidget({ config }: { config: WeatherWidgetDataType }) {
  const Wrapper = config.provider ?? React.Fragment;
  return (
    <div style={{ minHeight: config.staticMinHeight }}>
      <Wrapper>
        <Container
          header={<config.header />}
          fitHeight={true}
          footer={config.footer && <config.footer />}
          disableContentPaddings={config.disableContentPaddings}
        >
          <config.content />
        </Container>
      </Wrapper>
    </div>
  );
}

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 4, m: 6, default: 12 } }, // Current weather
        { colspan: { l: 4, m: 6, default: 12 } }, // Weather details
        { colspan: { l: 4, m: 12, default: 12 } }, // Multi-location (empty space for now)
        { colspan: { l: 8, m: 12, default: 12 } }, // Temperature forecast
        { colspan: { l: 4, m: 12, default: 12 } }, // Multi-location table
      ]}
    >
      <WeatherStaticWidget config={currentWeather.data} />
      <WeatherStaticWidget config={weatherDetails.data} />
      <div /> {/* Empty space for better layout */}
      <WeatherStaticWidget config={temperatureForecast.data} />
      <WeatherStaticWidget config={multiLocation.data} />
    </Grid>
  );
}
