// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Spinner from '@cloudscape-design/components/spinner';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';
import { defaultLocations, generateMockWeatherData, getWeatherDescription } from '../../services/weather-api';

function WeatherForecastHeader() {
  return <Header variant="h2">7-Day Forecast</Header>;
}

function WeatherForecastWidget() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        // Using mock data for demo - replace with real API call if needed
        const data = generateMockWeatherData(defaultLocations[0]); // New York
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load forecast data');
        console.error('Weather API error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="l">
          <Spinner size="normal" />
          <Box margin={{ top: 's' }}>Loading forecast...</Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" padding="l">
          <StatusIndicator type="error">Failed to load forecast data</StatusIndicator>
        </Box>
      </Container>
    );
  }

  const { daily } = weatherData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <ColumnLayout columns={1}>
      {daily.time.map((date: string, index: number) => {
        const weatherInfo = getWeatherDescription(daily.weatherCode[index]);
        return (
          <div key={date} style={{ padding: '8px 0', borderBottom: index < 6 ? '1px solid #eee' : 'none' }}>
            <ColumnLayout columns={4} variant="text-grid">
              <div>
                <Box variant="awsui-key-label">{formatDate(date)}</Box>
                <Box variant="p" color="text-body-secondary">
                  {weatherInfo.description}
                </Box>
              </div>
              <div>
                <Box variant="awsui-key-label">High</Box>
                <Box variant="h4" color="text-label">
                  {daily.temperatureMax[index]}°C
                </Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Low</Box>
                <Box variant="h4" color="text-label">
                  {daily.temperatureMin[index]}°C
                </Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Precipitation</Box>
                <Box variant="h4" color="text-label">
                  {daily.precipitation[index].toFixed(1)}mm
                </Box>
              </div>
            </ColumnLayout>
          </div>
        );
      })}
    </ColumnLayout>
  );
}

export const weatherForecast: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 3 },
  data: {
    icon: 'list',
    title: '7-Day Forecast',
    description: 'Extended weather forecast',
    header: WeatherForecastHeader,
    content: WeatherForecastWidget,
  },
};
