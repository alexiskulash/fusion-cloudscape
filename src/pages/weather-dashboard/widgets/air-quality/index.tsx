// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';

function AirQualityHeader() {
  return <Header variant="h2">Air Quality Index</Header>;
}

function AirQualityWidget() {
  // Mock air quality data for demo
  const airQualityData = {
    aqi: 45,
    status: 'Good',
    pm25: 12,
    pm10: 18,
    ozone: 65,
    no2: 25,
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { type: 'success' as const, text: 'Good' };
    if (aqi <= 100) return { type: 'warning' as const, text: 'Moderate' };
    if (aqi <= 150) return { type: 'error' as const, text: 'Unhealthy for Sensitive Groups' };
    return { type: 'error' as const, text: 'Unhealthy' };
  };

  const status = getAQIStatus(airQualityData.aqi);

  return (
    <ColumnLayout columns={1}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Box variant="h1" color="text-label">
          {airQualityData.aqi}
        </Box>
        <StatusIndicator type={status.type}>{status.text}</StatusIndicator>
      </div>

      <ColumnLayout columns={2} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">PM2.5</Box>
          <Box variant="h4" color="text-label">
            {airQualityData.pm25} μg/m³
          </Box>
          <ProgressBar value={airQualityData.pm25} additionalInfo="Good" />
        </div>
        <div>
          <Box variant="awsui-key-label">PM10</Box>
          <Box variant="h4" color="text-label">
            {airQualityData.pm10} μg/m³
          </Box>
          <ProgressBar value={airQualityData.pm10} additionalInfo="Good" />
        </div>
        <div>
          <Box variant="awsui-key-label">Ozone</Box>
          <Box variant="h4" color="text-label">
            {airQualityData.ozone} μg/m³
          </Box>
          <ProgressBar value={airQualityData.ozone} additionalInfo="Moderate" />
        </div>
        <div>
          <Box variant="awsui-key-label">NO₂</Box>
          <Box variant="h4" color="text-label">
            {airQualityData.no2} μg/m³
          </Box>
          <ProgressBar value={airQualityData.no2} additionalInfo="Good" />
        </div>
      </ColumnLayout>
    </ColumnLayout>
  );
}

export const airQuality: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 3 },
  data: {
    icon: 'status-info',
    title: 'Air Quality',
    description: 'Current air quality metrics',
    header: AirQualityHeader,
    content: AirQualityWidget,
  },
};
