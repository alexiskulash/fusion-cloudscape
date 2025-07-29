// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { useDailyForecast } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function UvIndexHeader() {
  return (
    <Header variant="h2" description="Today's UV index forecast">
      UV Index
    </Header>
  );
}

function UvIndexWidget() {
  const { data, loading, error } = useDailyForecast();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading UV data...</StatusIndicator>
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

  if (!data?.daily?.uv_index_max?.[0]) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="warning">No UV data available</StatusIndicator>
      </Box>
    );
  }

  const uvIndex = Math.round(data.daily.uv_index_max[0]);

  const getUvStatus = () => {
    if (uvIndex <= 2) return { status: 'success', text: 'Low', advice: 'No protection required' };
    if (uvIndex <= 5) return { status: 'info', text: 'Moderate', advice: 'Some protection required' };
    if (uvIndex <= 7) return { status: 'warning', text: 'High', advice: 'Protection required' };
    if (uvIndex <= 10) return { status: 'error', text: 'Very High', advice: 'Extra protection required' };
    return { status: 'error', text: 'Extreme', advice: 'Avoid sun exposure' };
  };

  const uvStatus = getUvStatus();

  return (
    <Box textAlign="center">
      <Box fontSize="display-l" fontWeight="bold" color="text-status-warning" margin={{ bottom: 's' }}>
        {uvIndex}
      </Box>

      <StatusIndicator type={uvStatus.status as any} iconAriaLabel={uvStatus.text}>
        <Box variant="h3">{uvStatus.text}</Box>
      </StatusIndicator>

      <Box variant="small" color="text-body-secondary" margin={{ top: 'm' }}>
        {uvStatus.advice}
      </Box>

      <Box variant="small" color="text-body-secondary" margin={{ top: 's' }}>
        Max UV index for today
      </Box>
    </Box>
  );
}

export const uvIndexWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'status-warning',
    title: 'UV Index',
    description: "Today's UV index forecast",
    header: UvIndexHeader,
    content: UvIndexWidget,
    staticMinHeight: 200,
  },
};
