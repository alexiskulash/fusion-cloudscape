// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';

import { HourlyForecast, WEATHER_CODES } from '../types';

interface HourlyForecastWidgetProps {
  hourlyData: HourlyForecast;
}

export function HourlyForecastWidget({ hourlyData }: HourlyForecastWidgetProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffHours = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60));

    if (diffHours === 0) return 'Now';
    if (diffHours === 1) return 'In 1 hour';
    if (diffHours > 1) return `In ${diffHours} hours`;
    return formatTime(timeString);
  };

  const tableItems = hourlyData.time.slice(0, 12).map((time, index) => ({
    time,
    hour: formatHour(time),
    formattedTime: formatTime(time),
    temperature: Math.round(hourlyData.temperature[index]),
    humidity: hourlyData.humidity[index],
    precipitation: hourlyData.precipitation[index],
    windSpeed: Math.round(hourlyData.windSpeed[index]),
    weatherCode: hourlyData.weatherCode[index],
    weatherInfo: WEATHER_CODES[hourlyData.weatherCode[index]] || { description: 'Unknown', icon: '❓' },
  }));

  return (
    <Container
      header={
        <Header variant="h2" description="Weather forecast for the next 12 hours">
          Hourly Forecast
        </Header>
      }
    >
      <Table
        columnDefinitions={[
          {
            id: 'time',
            header: 'Time',
            cell: item => (
              <div>
                <Box variant="strong">{item.hour}</Box>
                <Box variant="small" color="text-status-inactive">
                  {item.formattedTime}
                </Box>
              </div>
            ),
            minWidth: 100,
          },
          {
            id: 'weather',
            header: 'Condition',
            cell: item => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2em' }}>{item.weatherInfo.icon}</span>
                <span>{item.weatherInfo.description}</span>
              </div>
            ),
            minWidth: 150,
          },
          {
            id: 'temperature',
            header: 'Temperature',
            cell: item => `${item.temperature}°C`,
            minWidth: 80,
          },
          {
            id: 'precipitation',
            header: 'Rain',
            cell: item => `${item.precipitation.toFixed(1)} mm`,
            minWidth: 80,
          },
          {
            id: 'humidity',
            header: 'Humidity',
            cell: item => `${item.humidity}%`,
            minWidth: 80,
          },
          {
            id: 'wind',
            header: 'Wind',
            cell: item => `${item.windSpeed} km/h`,
            minWidth: 80,
          },
        ]}
        items={tableItems}
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No hourly data available</b>
          </Box>
        }
      />
    </Container>
  );
}
