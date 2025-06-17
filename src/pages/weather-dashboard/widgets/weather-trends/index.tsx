// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Spinner from '@cloudscape-design/components/spinner';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';
import { defaultLocations, generateMockWeatherData } from '../../services/weather-api';

function WeatherTrendsHeader() {
  return <Header variant="h2">24-Hour Temperature Trend</Header>;
}

function WeatherTrendsWidget() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        // Using mock data for demo - replace with real API call if needed
        const data = generateMockWeatherData(defaultLocations[0]); // New York

        const temperatureData = data.hourly.time.map((time: string, index: number) => ({
          x: new Date(time),
          y: data.hourly.temperature[index],
        }));

        setChartData([
          {
            title: 'Temperature (°C)',
            type: 'line',
            data: temperatureData,
          },
        ]);
        setError(null);
      } catch (err) {
        setError('Failed to load trend data');
        console.error('Weather API error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <Spinner size="normal" />
        <Box margin={{ top: 's' }}>Loading trend data...</Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="error">Failed to load trend data</StatusIndicator>
      </Box>
    );
  }

  return (
    <LineChart
      series={chartData}
      xDomain={[chartData[0]?.data[0]?.x, chartData[0]?.data[chartData[0]?.data.length - 1]?.x]}
      yDomain={[
        Math.min(...chartData[0]?.data.map((d: any) => d.y)) - 2,
        Math.max(...chartData[0]?.data.map((d: any) => d.y)) + 2,
      ]}
      xTitle="Time"
      yTitle="Temperature (°C)"
      height={300}
      hideFilter
      hideLegend
      xScaleType="time"
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="p" color="inherit">
            No temperature data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <Box variant="p" color="inherit">
            No matching temperature data
          </Box>
        </Box>
      }
    />
  );
}

export const weatherTrends: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 6 },
  data: {
    icon: 'trending-up',
    title: 'Temperature Trends',
    description: '24-hour temperature chart',
    header: WeatherTrendsHeader,
    content: WeatherTrendsWidget,
  },
};
