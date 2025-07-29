// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getWeatherDescription } from '../../services/weather-api';
import { useHourlyForecast } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function HourlyForecastHeader() {
  return (
    <Header variant="h2" description="Next 24 hours forecast">
      Hourly Forecast
    </Header>
  );
}

function HourlyForecastWidget() {
  const { data, loading, error } = useHourlyForecast();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading hourly forecast...</StatusIndicator>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="error">Error: {error}</StatusIndicator>
      </Box>
    );
  }

  if (!data?.hourly) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="warning">No hourly forecast available</StatusIndicator>
      </Box>
    );
  }

  const hourly = data.hourly;

  // Show next 24 hours
  const forecastItems = hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    }),
    date: new Date(time).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    condition: getWeatherDescription(hourly.weather_code[index]),
    temperature: Math.round(hourly.temperature_2m[index]),
    humidity: hourly.relative_humidity_2m[index],
    precipitation: hourly.precipitation_probability[index],
    precipitationAmount: hourly.precipitation[index],
    windSpeed: Math.round(hourly.wind_speed_10m[index]),
  }));

  return (
    <Table
      columnDefinitions={[
        {
          id: 'time',
          header: 'Time',
          cell: item => (
            <Box>
              <Box variant="strong">{item.time}</Box>
              <Box variant="small" color="text-body-secondary">
                {item.date}
              </Box>
            </Box>
          ),
          sortingField: 'time',
        },
        {
          id: 'condition',
          header: 'Condition',
          cell: item => item.condition,
        },
        {
          id: 'temperature',
          header: 'Temp',
          cell: item => (
            <Box variant="strong" color="text-status-info">
              {item.temperature}°C
            </Box>
          ),
        },
        {
          id: 'precipitation',
          header: 'Rain %',
          cell: item => (
            <Box color={item.precipitation > 50 ? 'text-status-warning' : 'text-body-default'}>
              {item.precipitation}%
            </Box>
          ),
        },
        {
          id: 'precipitationAmount',
          header: 'Amount',
          cell: item => `${item.precipitationAmount} mm`,
        },
        {
          id: 'humidity',
          header: 'Humidity',
          cell: item => `${item.humidity}%`,
        },
        {
          id: 'wind',
          header: 'Wind',
          cell: item => `${item.windSpeed} km/h`,
        },
      ]}
      columnDisplay={[
        { id: 'time', visible: true },
        { id: 'condition', visible: true },
        { id: 'temperature', visible: true },
        { id: 'precipitation', visible: true },
        { id: 'precipitationAmount', visible: true },
        { id: 'humidity', visible: true },
        { id: 'wind', visible: true },
      ]}
      items={forecastItems}
      loadingText="Loading hourly forecast"
      sortingDisabled
      stripedRows
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="strong" textAlign="center" color="inherit">
            No hourly forecast data
          </Box>
          <Box variant="p" padding={{ bottom: 's' }} color="inherit">
            Unable to load hourly forecast data.
          </Box>
        </Box>
      }
    />
  );
}

export const hourlyForecastWidget: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 6 },
  data: {
    icon: 'clock',
    title: 'Hourly Forecast',
    description: 'Next 24 hours weather forecast',
    header: HourlyForecastHeader,
    content: HourlyForecastWidget,
    staticMinHeight: 400,
  },
};
