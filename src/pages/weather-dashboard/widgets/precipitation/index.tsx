// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { useCurrentWeather } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function PrecipitationHeader() {
  return (
    <Header variant="h2" description="Current precipitation data">
      Precipitation
    </Header>
  );
}

function PrecipitationWidget() {
  const { data, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading precipitation data...</StatusIndicator>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="error">Error: {error}</StatusIndicator>
      </Box>
    );
  }

  if (!data?.current) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="warning">No precipitation data available</StatusIndicator>
      </Box>
    );
  }

  const current = data.current;

  const getPrecipitationStatus = () => {
    const total = current.precipitation;
    if (total === 0) return { status: 'success', text: 'No precipitation' };
    if (total < 0.5) return { status: 'info', text: 'Light' };
    if (total < 2.0) return { status: 'warning', text: 'Moderate' };
    return { status: 'error', text: 'Heavy' };
  };

  const precipitationStatus = getPrecipitationStatus();

  return (
    <KeyValuePairs
      columns={1}
      items={[
        {
          label: 'Total Precipitation',
          value: (
            <Box>
              <Box variant="h3">{current.precipitation} mm</Box>
              <StatusIndicator type={precipitationStatus.status as any}>{precipitationStatus.text}</StatusIndicator>
            </Box>
          ),
        },
        {
          label: 'Rain',
          value: `${current.rain} mm`,
        },
        {
          label: 'Showers',
          value: `${current.showers} mm`,
        },
        {
          label: 'Snowfall',
          value: `${current.snowfall} mm`,
        },
      ]}
    />
  );
}

export const precipitationWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'status-warning',
    title: 'Precipitation',
    description: 'Current precipitation amounts',
    header: PrecipitationHeader,
    content: PrecipitationWidget,
    staticMinHeight: 200,
  },
};
