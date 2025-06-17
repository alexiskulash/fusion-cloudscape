// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';
import { defaultLocations, generateMockWeatherData } from '../../services/weather-api';

function UvIndexHeader() {
  return <Header variant="h2">UV Index</Header>;
}

function UvIndexWidget() {
  const [uvData, setUvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUvData = async () => {
      try {
        setLoading(true);
        // Using mock data for demo
        const data = generateMockWeatherData(defaultLocations[0]); // New York
        setUvData({
          current: Math.round(Math.random() * 10),
          max: data.daily.uvIndexMax[0],
        });
      } catch (err) {
        console.error('Error loading UV data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUvData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <Spinner size="normal" />
        <Box margin={{ top: 's' }}>Loading UV data...</Box>
      </Box>
    );
  }

  const getUVStatus = (uvIndex: number) => {
    if (uvIndex <= 2) return { type: 'success' as const, text: 'Low', color: 'green' };
    if (uvIndex <= 5) return { type: 'warning' as const, text: 'Moderate', color: 'yellow' };
    if (uvIndex <= 7) return { type: 'warning' as const, text: 'High', color: 'orange' };
    if (uvIndex <= 10) return { type: 'error' as const, text: 'Very High', color: 'red' };
    return { type: 'error' as const, text: 'Extreme', color: 'purple' };
  };

  const currentStatus = getUVStatus(uvData.current);
  const maxStatus = getUVStatus(uvData.max);

  return (
    <SpaceBetween size="m">
      <div style={{ textAlign: 'center' }}>
        <Box variant="h1" color="text-label">
          {uvData.current}
        </Box>
        <StatusIndicator type={currentStatus.type}>Current: {currentStatus.text}</StatusIndicator>
      </div>

      <div>
        <Box variant="awsui-key-label">Today's Maximum</Box>
        <Box variant="h3" color="text-label" margin={{ bottom: 'xs' }}>
          {uvData.max}
        </Box>
        <ProgressBar
          value={(uvData.max / 11) * 100}
          additionalInfo={maxStatus.text}
          description="Peak UV expected around noon"
        />
      </div>

      <div>
        <Box variant="p" color="text-body-secondary">
          <strong>Protection advice:</strong>{' '}
          {uvData.current <= 2
            ? 'Minimal protection required'
            : uvData.current <= 5
              ? 'Wear sunglasses and use sunscreen'
              : 'Seek shade, wear protective clothing, and use SPF 30+ sunscreen'}
        </Box>
      </div>
    </SpaceBetween>
  );
}

export const uvIndex: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 3 },
  data: {
    icon: 'status-warning',
    title: 'UV Index',
    description: 'Ultraviolet radiation levels',
    header: UvIndexHeader,
    content: UvIndexWidget,
  },
};
