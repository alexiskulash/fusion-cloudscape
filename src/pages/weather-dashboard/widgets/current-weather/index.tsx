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

function CurrentWeatherHeader() {
  return <Header variant="h2">Current Weather</Header>;
}

function CurrentWeatherWidget() {
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
        setError('Failed to load weather data');
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
          <Box margin={{ top: 's' }}>Loading current weather...</Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" padding="l">
          <StatusIndicator type="error">Failed to load weather data</StatusIndicator>
        </Box>
      </Container>
    );
  }

  const { current } = weatherData;
  const weatherInfo = getWeatherDescription(current.weatherCode);

  return (
    <ColumnLayout columns={2} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">Location</Box>
        <Box variant="h1" color="text-label">
          New York
        </Box>
        <Box variant="p" color="text-body-secondary">
          {weatherInfo.description}
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Temperature</Box>
        <Box variant="h1" color="text-label">
          {current.temperature}°C
        </Box>
        <Box variant="p" color="text-body-secondary">
          Feels like {current.temperature + Math.round(Math.random() * 4 - 2)}°C
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Humidity</Box>
        <Box variant="h3" color="text-label">
          {current.humidity}%
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Wind Speed</Box>
        <Box variant="h3" color="text-label">
          {current.windSpeed} km/h
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Pressure</Box>
        <Box variant="h3" color="text-label">
          {current.pressure} hPa
        </Box>
      </div>
      <div>
        <Box variant="awsui-key-label">Visibility</Box>
        <Box variant="h3" color="text-label">
          {current.visibility} km
        </Box>
      </div>
    </ColumnLayout>
  );
}

export const currentWeather: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 3 },
  data: {
    icon: 'mixedContent',
    title: 'Current Weather',
    description: 'Real-time weather conditions',
    header: CurrentWeatherHeader,
    content: CurrentWeatherWidget,
  },
};
