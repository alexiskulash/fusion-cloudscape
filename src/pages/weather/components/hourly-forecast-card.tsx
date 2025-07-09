// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';

import { HourlyForecast, getWeatherDescription } from '../services/weather-api';

interface HourlyForecastCardProps {
  hourlyData: HourlyForecast;
}

export function HourlyForecastCard({ hourlyData }: HourlyForecastCardProps) {
  // Show next 24 hours
  const next24Hours = hourlyData.time.slice(0, 24).map((time, index) => ({
    time,
    temperature: hourlyData.temperature[index],
    precipitation: hourlyData.precipitation[index],
    windSpeed: hourlyData.windSpeed[index],
    humidity: hourlyData.humidity[index],
    weatherCode: hourlyData.weatherCode[index],
  }));

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  const formatDate = (timeString: string) => {
    const date = new Date(timeString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <Container
      header={
        <Header variant="h2" description="Detailed hourly weather forecast for the next 24 hours">
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
              <Box>
                <Box fontWeight="bold">{formatTime(item.time)}</Box>
                <Box variant="small" color="text-status-inactive">
                  {formatDate(item.time)}
                </Box>
              </Box>
            ),
            width: 100,
          },
          {
            id: 'condition',
            header: 'Condition',
            cell: item => {
              const weather = getWeatherDescription(item.weatherCode);
              return (
                <Box>
                  <Icon name={weather.icon} /> {weather.description}
                </Box>
              );
            },
            width: 150,
          },
          {
            id: 'temperature',
            header: 'Temperature',
            cell: item => <Box fontWeight="bold">{Math.round(item.temperature)}°C</Box>,
            width: 100,
          },
          {
            id: 'precipitation',
            header: 'Rain',
            cell: item => (
              <Box>
                {item.precipitation > 0 ? (
                  <Badge color="blue">{item.precipitation.toFixed(1)} mm</Badge>
                ) : (
                  <Box color="text-status-inactive">0 mm</Box>
                )}
              </Box>
            ),
            width: 80,
          },
          {
            id: 'wind',
            header: 'Wind',
            cell: item => `${Math.round(item.windSpeed)} km/h`,
            width: 80,
          },
          {
            id: 'humidity',
            header: 'Humidity',
            cell: item => `${Math.round(item.humidity)}%`,
            width: 80,
          },
        ]}
        items={next24Hours}
        loadingText="Loading forecast"
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="p" color="inherit">
              No hourly forecast data available
            </Box>
          </Box>
        }
        stripedRows
      />
    </Container>
  );
}
