// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';

function WeatherAlertsHeader() {
  return <Header variant="h2">Weather Alerts</Header>;
}

function WeatherAlertsWidget() {
  // Mock alerts for demo purposes
  const alerts = [
    {
      type: 'info' as const,
      title: 'Partly Cloudy',
      message: 'Expect partly cloudy conditions throughout the day with temperatures around 22°C.',
    },
    {
      type: 'warning' as const,
      title: 'Rain Expected',
      message: 'Light rain is expected this evening. Consider carrying an umbrella.',
    },
  ];

  return (
    <SpaceBetween size="s">
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <Alert key={index} type={alert.type} header={alert.title}>
            {alert.message}
          </Alert>
        ))
      ) : (
        <Box textAlign="center" padding="l">
          <Box variant="p" color="text-body-secondary">
            No active weather alerts
          </Box>
        </Box>
      )}
    </SpaceBetween>
  );
}

export const weatherAlerts: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 3 },
  data: {
    icon: 'mixedContent',
    title: 'Weather Alerts',
    description: 'Active weather warnings and notifications',
    header: WeatherAlertsHeader,
    content: WeatherAlertsWidget,
  },
};
