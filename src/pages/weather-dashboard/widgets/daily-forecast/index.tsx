// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { getWeatherDescription } from '../../services/weather-api';
import { useDailyForecast } from '../../hooks/use-weather-data';
import { WidgetConfig } from '../interfaces';

function DailyForecastHeader() {
  return (
    <Header variant="h2" description="7-day weather forecast">
      Daily Forecast
    </Header>
  );
}

function DailyForecastWidget() {
  const { data, loading, error } = useDailyForecast();

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="loading">Loading forecast data...</StatusIndicator>
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

  if (!data?.daily) {
    return (
      <Box textAlign="center" padding="l">
        <StatusIndicator type="warning">No forecast data available</StatusIndicator>
      </Box>
    );
  }

  const daily = data.daily;
  
  const forecastItems = daily.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }),
    condition: getWeatherDescription(daily.weather_code[index]),
    maxTemp: Math.round(daily.temperature_2m_max[index]),
    minTemp: Math.round(daily.temperature_2m_min[index]),
    precipitation: daily.precipitation_sum[index],
    windSpeed: Math.round(daily.wind_speed_10m_max[index]),
    uvIndex: Math.round(daily.uv_index_max[index]),
  }));

  return (
    <Table
      columnDefinitions={[
        {
          id: 'date',
          header: 'Date',
          cell: item => <Box variant="strong">{item.date}</Box>,
          sortingField: 'date',
        },
        {
          id: 'condition',
          header: 'Condition',
          cell: item => item.condition,
        },
        {
          id: 'temperature',
          header: 'Temperature',
          cell: item => (
            <Box>
              <Box component="span" color="text-status-error" fontWeight="bold">
                {item.maxTemp}°
              </Box>
              {' / '}
              <Box component="span" color="text-body-secondary">
                {item.minTemp}°
              </Box>
            </Box>
          ),
        },
        {
          id: 'precipitation',
          header: 'Rain',
          cell: item => `${item.precipitation} mm`,
        },
        {
          id: 'wind',
          header: 'Wind',
          cell: item => `${item.windSpeed} km/h`,
        },
        {
          id: 'uv',
          header: 'UV',
          cell: item => (
            <Box 
              color={
                item.uvIndex <= 2 ? 'text-status-success' :
                item.uvIndex <= 5 ? 'text-status-info' :
                item.uvIndex <= 7 ? 'text-status-warning' :
                'text-status-error'
              }
            >
              {item.uvIndex}
            </Box>
          ),
        },
      ]}
      columnDisplay={[
        { id: 'date', visible: true },
        { id: 'condition', visible: true },
        { id: 'temperature', visible: true },
        { id: 'precipitation', visible: true },
        { id: 'wind', visible: true },
        { id: 'uv', visible: true },
      ]}
      items={forecastItems}
      loadingText="Loading forecast"
      sortingDisabled
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="strong" textAlign="center" color="inherit">
            No forecast data
          </Box>
          <Box variant="p" padding={{ bottom: 's' }} color="inherit">
            Unable to load forecast data.
          </Box>
        </Box>
      }
    />
  );
}

export const dailyForecastWidget: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 6 },
  data: {
    icon: 'calendar',
    title: 'Daily Forecast',
    description: '7-day weather forecast',
    header: DailyForecastHeader,
    content: DailyForecastWidget,
    staticMinHeight: 350,
  },
};
