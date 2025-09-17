// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';
import Button from '@cloudscape-design/components/button';

import { WeatherData, fetchWeatherData, formatTemperature } from '../services/weather-api';
import { useWeather } from '../contexts/weather-context';

export function ForecastSection() {
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
        setError(err instanceof Error ? err.message : 'Failed to load forecast data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [selectedLocation]);

  if (loading) {
    return (
      <Container
        header={
          <Header variant="h2" description="Temperature trends and weather forecasts">
            Weather forecast
          </Header>
        }
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner size="large" />
          <div style={{ marginTop: '16px' }}>Loading forecast data...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        header={
          <Header variant="h2" description="Temperature trends and weather forecasts">
            Weather forecast
          </Header>
        }
      >
        <Alert
          type="error"
          header="Unable to load forecast data"
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
          <Header variant="h2" description="Temperature trends and weather forecasts">
            Weather forecast
          </Header>
        }
      >
        <Alert type="warning" header="No forecast data available">
          Please try refreshing the page or selecting a different location.
        </Alert>
      </Container>
    );
  }

  // Get next 24 hours of forecast data
  const forecastData = weatherData.hourly.time.slice(0, 24).map((time, index) => ({
    x: new Date(time),
    y: weatherData.hourly.temperature_2m[index],
  }));

  const chartSeries = [
    {
      title: 'Temperature',
      type: 'line' as const,
      valueFormatter: (value: number) => formatTemperature(value),
      data: forecastData,
    },
  ];

  const xDomain = [forecastData[0]?.x, forecastData[forecastData.length - 1]?.x];

  return (
    <Container
      header={
        <Header variant="h2" description="24-hour temperature trends and forecasts">
          Weather forecast
        </Header>
      }
    >
      <LineChart
        series={chartSeries}
        xDomain={xDomain}
        xScaleType="time"
        xTitle="Time"
        yTitle="Temperature (°C)"
        height={300}
        hideFilter={true}
        ariaLabel={`Temperature forecast for ${selectedLocation.name}`}
        ariaDescription={`Line chart showing 24-hour temperature forecast for ${selectedLocation.name}`}
        i18nStrings={{
          xTickFormatter: (value: Date) => 
            value.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
          yTickFormatter: (value: number) => formatTemperature(value),
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter forecast data',
          legendAriaLabel: 'Temperature forecast legend',
          chartAriaRoleDescription: 'Temperature forecast line chart',
        }}
        loadingText="Loading forecast data..."
        errorText="Error loading forecast data"
        recoveryText="Retry"
      />
    </Container>
  );
}
