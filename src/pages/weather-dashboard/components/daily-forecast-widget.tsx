// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';

import { DailyForecast, WEATHER_CODES } from '../types';

interface DailyForecastWidgetProps {
  dailyData: DailyForecast;
}

export function DailyForecastWidget({ dailyData }: DailyForecastWidgetProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const tableItems = dailyData.time.map((time, index) => ({
    time,
    date: formatDate(time),
    temperatureMax: Math.round(dailyData.temperatureMax[index]),
    temperatureMin: Math.round(dailyData.temperatureMin[index]),
    precipitation: dailyData.precipitation[index],
    windSpeed: Math.round(dailyData.windSpeed[index]),
    weatherCode: dailyData.weatherCode[index],
    weatherInfo: WEATHER_CODES[dailyData.weatherCode[index]] || { description: 'Unknown', icon: '❓' },
  }));

  return (
    <Container
      header={
        <Header variant="h2" description="7-day weather forecast">
          Daily Forecast
        </Header>
      }
    >
      <Table
        columnDefinitions={[
          {
            id: 'date',
            header: 'Date',
            cell: item => <Box variant="strong">{item.date}</Box>,
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
            cell: item => (
              <div>
                <Box variant="strong">{item.temperatureMax}°C</Box>
                <Box variant="small" color="text-status-inactive">
                  {item.temperatureMin}°C
                </Box>
              </div>
            ),
            minWidth: 100,
          },
          {
            id: 'precipitation',
            header: 'Precipitation',
            cell: item => `${item.precipitation.toFixed(1)} mm`,
            minWidth: 100,
          },
          {
            id: 'wind',
            header: 'Max Wind',
            cell: item => `${item.windSpeed} km/h`,
            minWidth: 100,
          },
        ]}
        items={tableItems}
        trackBy="time"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No daily forecast available</b>
          </Box>
        }
      />
    </Container>
  );
}
