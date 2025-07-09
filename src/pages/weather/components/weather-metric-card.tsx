// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';

interface WeatherMetricCardProps {
  label: string;
  value: string;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}

export function WeatherMetricCard({ label, value, icon, trend }: WeatherMetricCardProps) {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return 'angle-up';
      case 'down':
        return 'angle-down';
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up':
        return 'text-status-success';
      case 'down':
        return 'text-status-error';
      default:
        return 'text-status-inactive';
    }
  };

  return (
    <Box padding="s" className="weather-metric-card">
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Icon name={icon} variant="subtle" />
        <SpaceBetween size="xxs">
          <Box variant="small" color="text-status-inactive">
            {label}
          </Box>
          <SpaceBetween direction="horizontal" size="xs" alignItems="center">
            <Box fontWeight="bold">{value}</Box>
            {trend && getTrendIcon(trend) && <Icon name={getTrendIcon(trend)!} size="small" variant="subtle" />}
          </SpaceBetween>
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
}
