// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { useCurrentWeather } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function HumidityPressureHeader() {
  return (
    <Header variant="h2" description="Atmospheric humidity and pressure">
      Humidity & Pressure
    </Header>
  );
}

function HumidityPressureWidget() {
  const { data, loading, error } = useCurrentWeather();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading atmospheric data...</StatusIndicator>
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
        <StatusIndicator type="warning">No atmospheric data available</StatusIndicator>
      </Box>
    );
  }

  const current = data.current;
  
  const getHumidityStatus = () => {
    if (current.relative_humidity_2m < 30) return { status: 'warning', text: 'Low' };
    if (current.relative_humidity_2m > 70) return { status: 'info', text: 'High' };
    return { status: 'success', text: 'Comfortable' };
  };

  const getPressureStatus = () => {
    if (current.pressure_msl < 1000) return { status: 'warning', text: 'Low (Storm)' };
    if (current.pressure_msl > 1020) return { status: 'success', text: 'High (Fair)' };
    return { status: 'info', text: 'Normal' };
  };

  const humidityStatus = getHumidityStatus();
  const pressureStatus = getPressureStatus();

  return (
    <KeyValuePairs
      columns={1}
      items={[
        {
          label: 'Relative Humidity',
          value: (
            <Box>
              <Box variant="h3">{current.relative_humidity_2m}%</Box>
              <StatusIndicator type={humidityStatus.status as any}>
                {humidityStatus.text}
              </StatusIndicator>
            </Box>
          ),
        },
        {
          label: 'Sea Level Pressure',
          value: (
            <Box>
              <Box variant="h3">{Math.round(current.pressure_msl)} hPa</Box>
              <StatusIndicator type={pressureStatus.status as any}>
                {pressureStatus.text}
              </StatusIndicator>
            </Box>
          ),
        },
        {
          label: 'Surface Pressure',
          value: `${Math.round(current.surface_pressure)} hPa`,
        },
      ]}
    />
  );
}

export const humidityPressureWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'status-info',
    title: 'Humidity & Pressure',
    description: 'Atmospheric conditions',
    header: HumidityPressureHeader,
    content: HumidityPressureWidget,
    staticMinHeight: 200,
  },
};
