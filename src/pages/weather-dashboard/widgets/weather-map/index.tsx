// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';

function WeatherMapHeader() {
  return (
    <Header
      variant="h2"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="icon" iconName="refresh" ariaLabel="Refresh map" />
          <Button variant="icon" iconName="external" ariaLabel="Open full map" />
        </SpaceBetween>
      }
    >
      Weather Map
    </Header>
  );
}

function WeatherMapWidget() {
  return (
    <div style={{ position: 'relative', height: '300px', border: '1px solid #e9ebed', borderRadius: '8px' }}>
      {/* Placeholder for weather map */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SpaceBetween size="m">
          <Box textAlign="center" color="text-body-secondary">
            <Box variant="h3" color="inherit">
              Interactive Weather Map
            </Box>
            <Box variant="p" color="inherit">
              Real-time precipitation, temperature, and wind patterns
            </Box>
          </Box>

          {/* Mock map elements */}
          <div style={{ position: 'relative', height: '100px' }}>
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '30px',
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              NYC
              <br />
              22°C
            </div>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '40px',
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
              }}
            >
              LON
              <br />
              15°C
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 'bold',
              }}
            >
              TKY
              <br />
              28°C
            </div>
          </div>
        </SpaceBetween>
      </div>
    </div>
  );
}

export const weatherMap: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 3 },
  data: {
    icon: 'map',
    title: 'Weather Map',
    description: 'Interactive global weather visualization',
    header: WeatherMapHeader,
    content: WeatherMapWidget,
  },
};
