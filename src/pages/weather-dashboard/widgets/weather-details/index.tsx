// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';

import { WeatherData, LocationCoords, fetchWeatherData, formatTemperature, formatWindSpeed, formatHumidity, defaultLocations } from '../../services/weather-api';
import { WeatherWidgetConfig } from '../interfaces';

function WeatherDetailsHeader() {
  return (
    <Header variant="h2" description="Detailed weather metrics and conditions">
      Weather Details
    </Header>
  );
}

function WeatherDetailsWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location] = useState<LocationCoords>(defaultLocations[0]); // Berlin as default

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(location);
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [location]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spinner size="large" />
        <div style={{ marginTop: '16px' }}>Loading weather details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Failed to load weather details">
        {error}
      </Alert>
    );
  }

  if (!weatherData) {
    return (
      <Alert type="warning" header="No weather data available">
        Please try again later.
      </Alert>
    );
  }

  const { current, hourly } = weatherData;
  
  // Calculate average conditions for next 6 hours
  const next6Hours = hourly.precipitation.slice(0, 6);
  const avgPrecipitation = next6Hours.reduce((sum, val) => sum + val, 0) / next6Hours.length;
  
  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getPrecipitationStatus = (precipitation: number) => {
    if (precipitation === 0) return { type: 'success' as const, text: 'No precipitation' };
    if (precipitation < 1) return { type: 'info' as const, text: 'Light precipitation expected' };
    if (precipitation < 5) return { type: 'warning' as const, text: 'Moderate precipitation expected' };
    return { type: 'error' as const, text: 'Heavy precipitation expected' };
  };

  const precipitationStatus = getPrecipitationStatus(avgPrecipitation);

  return (
    <ColumnLayout columns={2} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">Wind Information</Box>
        <Box variant="p">
          <strong>Speed:</strong> {formatWindSpeed(current.wind_speed_10m)}
        </Box>
        <Box variant="p">
          <strong>Direction:</strong> {getWindDirection(current.wind_direction_10m)} ({current.wind_direction_10m}°)
        </Box>
      </div>
      
      <div>
        <Box variant="awsui-key-label">Atmospheric Conditions</Box>
        <Box variant="p">
          <strong>Humidity:</strong> {formatHumidity(current.relative_humidity_2m)}
        </Box>
        <Box variant="p">
          <strong>Feels like:</strong> {formatTemperature(current.apparent_temperature)}
        </Box>
      </div>
      
      <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
        <Box variant="awsui-key-label">Precipitation Forecast (6h)</Box>
        <StatusIndicator type={precipitationStatus.type}>
          {precipitationStatus.text}
        </StatusIndicator>
        {avgPrecipitation > 0 && (
          <Box variant="p" margin={{ top: 'xs' }}>
            Average: {avgPrecipitation.toFixed(1)} mm/h
          </Box>
        )}
      </div>
    </ColumnLayout>
  );
}

export const weatherDetails: WeatherWidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Weather Details',
    description: 'Detailed weather metrics and conditions',
    header: WeatherDetailsHeader,
    content: WeatherDetailsWidget,
  },
};
