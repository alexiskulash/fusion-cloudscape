// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';

import { WeatherData, fetchWeatherData, formatTemperature } from '../../services/weather-api';
import { useWeather } from '../../contexts/weather-context';
import { WeatherWidgetConfig } from '../interfaces';

function TemperatureForecastHeader() {
  return (
    <Header variant="h2" description="24-hour temperature forecast">
      Temperature Forecast
    </Header>
  );
}

function TemperatureForecastWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedLocation: location } = useWeather();

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
        <div style={{ marginTop: '16px' }}>Loading forecast data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Failed to load forecast data">
        {error}
      </Alert>
    );
  }

  if (!weatherData) {
    return (
      <Alert type="warning" header="No forecast data available">
        Please try again later.
      </Alert>
    );
  }

  // Get next 24 hours of data
  const next24Hours = weatherData.hourly.time.slice(0, 24).map((time, index) => ({
    x: new Date(time),
    y: weatherData.hourly.temperature_2m[index],
  }));

  const chartSeries = [
    {
      title: 'Temperature',
      type: 'line' as const,
      valueFormatter: (value: number) => formatTemperature(value),
      data: next24Hours,
    },
  ];

  const xDomain = [next24Hours[0]?.x, next24Hours[next24Hours.length - 1]?.x];

  return (
    <LineChart
      series={chartSeries}
      xDomain={xDomain}
      xScaleType="time"
      xTitle="Time"
      yTitle="Temperature (°C)"
      fitHeight={true}
      height={25}
      hideFilter={true}
      ariaLabel="Temperature forecast"
      ariaDescription="Line chart showing 24-hour temperature forecast"
      i18nStrings={{
        xTickFormatter: (value: Date) =>
          value.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        yTickFormatter: (value: number) => formatTemperature(value),
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'line chart',
      }}
      loadingText="Loading forecast data..."
      errorText="Error loading forecast data."
      recoveryText="Retry"
    />
  );
}

export const temperatureForecast: WeatherWidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 3, minRowSpan: 3 },
  data: {
    icon: 'lineChart',
    title: 'Temperature Forecast',
    description: '24-hour temperature forecast',
    header: TemperatureForecastHeader,
    content: TemperatureForecastWidget,
    staticMinHeight: 400,
  },
};
