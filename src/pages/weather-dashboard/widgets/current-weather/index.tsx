// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';

import { WeatherData, LocationCoords, fetchWeatherData, formatTemperature, formatWindSpeed, formatHumidity, getWeatherCodeDescription, defaultLocations } from '../../services/weather-api';
import { WeatherWidgetConfig } from '../interfaces';

function CurrentWeatherHeader() {
  return (
    <Header variant="h2" description="Real-time weather conditions">
      Current Weather
    </Header>
  );
}

function CurrentWeatherWidget() {
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
        <div style={{ marginTop: '16px' }}>Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Failed to load weather data">
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

  const { current } = weatherData;

  return (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Location',
          value: (
            <span>
              <StatusIndicator type="success">{location.name}</StatusIndicator>
            </span>
          ),
        },
        {
          label: 'Conditions',
          value: getWeatherCodeDescription(current.weather_code),
        },
        {
          label: 'Temperature',
          value: <strong style={{ fontSize: '18px' }}>{formatTemperature(current.temperature_2m)}</strong>,
        },
        {
          label: 'Feels like',
          value: formatTemperature(current.apparent_temperature),
        },
        {
          label: 'Humidity',
          value: formatHumidity(current.relative_humidity_2m),
        },
        {
          label: 'Wind Speed',
          value: formatWindSpeed(current.wind_speed_10m),
        },
      ]}
    />
  );
}

export const currentWeather: WeatherWidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Current Weather',
    description: 'Real-time weather conditions',
    header: CurrentWeatherHeader,
    content: CurrentWeatherWidget,
  },
};
