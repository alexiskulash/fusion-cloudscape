// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Icon from '@cloudscape-design/components/icon';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';

import { HourlyForecast, WeatherService } from '../services/weather-api';

interface HourlyForecastWidgetProps {
  forecast: HourlyForecast;
}

interface HourlyDataRow {
  time: string;
  hour: string;
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
}

export function HourlyForecastWidget({ forecast }: HourlyForecastWidgetProps) {
  // Get next 24 hours of data
  const next24Hours = 24;
  const hourlyData: HourlyDataRow[] = forecast.time.slice(0, next24Hours).map((time, index) => {
    const date = new Date(time);
    return {
      time,
      hour: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperature: Math.round(forecast.temperature[index]),
      humidity: forecast.humidity[index],
      precipitation: forecast.precipitation[index],
      windSpeed: Math.round(forecast.windSpeed[index]),
      weatherCode: forecast.weatherCode[index],
      weatherDescription: WeatherService.getWeatherDescription(forecast.weatherCode[index]),
      weatherIcon: WeatherService.getWeatherIcon(forecast.weatherCode[index]),
    };
  });

  const columnDefinitions = [
    {
      id: 'time',
      header: 'Time',
      cell: (item: HourlyDataRow) => (
        <Box>
          <div style={{ fontWeight: 'bold' }}>{item.hour}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-status-inactive)' }}>{item.date}</div>
        </Box>
      ),
      width: 80,
      minWidth: 80,
    },
    {
      id: 'weather',
      header: 'Weather',
      cell: (item: HourlyDataRow) => (
        <Box>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Icon name={item.weatherIcon} />
            <span style={{ fontWeight: 'bold' }}>{item.temperature}°C</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-status-inactive)' }}>
            {item.weatherDescription}
          </div>
        </Box>
      ),
      width: 180,
      minWidth: 150,
    },
    {
      id: 'precipitation',
      header: 'Rain',
      cell: (item: HourlyDataRow) => (
        <Box>
          {item.precipitation > 0 ? (
            <>
              <Badge color={item.precipitation > 5 ? 'red' : item.precipitation > 1 ? 'blue' : 'grey'}>
                {item.precipitation.toFixed(1)} mm
              </Badge>
            </>
          ) : (
            <span style={{ color: 'var(--color-text-status-inactive)' }}>None</span>
          )}
        </Box>
      ),
      width: 80,
      minWidth: 80,
    },
    {
      id: 'humidity',
      header: 'Humidity',
      cell: (item: HourlyDataRow) => `${item.humidity}%`,
      width: 80,
      minWidth: 80,
    },
    {
      id: 'wind',
      header: 'Wind',
      cell: (item: HourlyDataRow) => `${item.windSpeed} km/h`,
      width: 100,
      minWidth: 80,
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2" description="Hourly weather forecast for the next 24 hours">
          24-Hour Forecast
        </Header>
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={hourlyData}
        loadingText="Loading forecast..."
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No forecast data available
            </Box>
          </Box>
        }
        variant="borderless"
      />
    </Container>
  );
}
