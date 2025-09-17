// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';

import { WeatherData, fetchWeatherData, formatTemperature, formatWindSpeed, formatHumidity, getWeatherCodeDescription } from '../services/weather-api';
import { useWeather } from '../contexts/weather-context';

export function CurrentWeatherSection() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedLocation } = useWeather();

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(selectedLocation);
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [selectedLocation]);

  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <Container
        header={
          <Header variant="h2" description="Current weather conditions and atmospheric data">
            Current conditions
          </Header>
        }
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner size="large" />
          <div style={{ marginTop: '16px' }}>Loading current weather conditions...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        header={
          <Header variant="h2" description="Current weather conditions and atmospheric data">
            Current conditions
          </Header>
        }
      >
        <Alert
          type="error"
          header="Unable to load weather data"
          action={
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!weatherData) {
    return (
      <Container
        header={
          <Header variant="h2" description="Current weather conditions and atmospheric data">
            Current conditions
          </Header>
        }
      >
        <Alert type="warning" header="No weather data available">
          Please try refreshing the page or selecting a different location.
        </Alert>
      </Container>
    );
  }

  const { current } = weatherData;

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Current weather conditions and atmospheric data"
          actions={
            <StatusIndicator type="success">
              Live data
            </StatusIndicator>
          }
        >
          Current conditions
        </Header>
      }
    >
      <ColumnLayout columns={2}>
        <KeyValuePairs
          columns={1}
          items={[
            {
              label: 'Temperature',
              value: <strong style={{ fontSize: '24px', color: '#0972d3' }}>{formatTemperature(current.temperature_2m)}</strong>,
            },
            {
              label: 'Feels like',
              value: formatTemperature(current.apparent_temperature),
            },
            {
              label: 'Conditions',
              value: getWeatherCodeDescription(current.weather_code),
            },
          ]}
        />

        <KeyValuePairs
          columns={1}
          items={[
            {
              label: 'Wind speed',
              value: formatWindSpeed(current.wind_speed_10m),
            },
            {
              label: 'Wind direction',
              value: `${getWindDirection(current.wind_direction_10m)} (${current.wind_direction_10m}°)`,
            },
            {
              label: 'Humidity',
              value: formatHumidity(current.relative_humidity_2m),
            },
          ]}
        />
      </ColumnLayout>
    </Container>
  );
}
