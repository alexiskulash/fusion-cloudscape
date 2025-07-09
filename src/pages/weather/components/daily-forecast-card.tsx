// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Cards from '@cloudscape-design/components/cards';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';

import { DailyForecast, getWeatherDescription } from '../services/weather-api';

interface DailyForecastCardProps {
  dailyData: DailyForecast;
}

interface DailyWeatherItem {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  windSpeedMax: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export function DailyForecastCard({ dailyData }: DailyForecastCardProps) {
  const dailyItems: DailyWeatherItem[] = dailyData.time.map((date, index) => ({
    date,
    temperatureMax: dailyData.temperatureMax[index],
    temperatureMin: dailyData.temperatureMin[index],
    precipitation: dailyData.precipitation[index],
    windSpeedMax: dailyData.windSpeedMax[index],
    weatherCode: dailyData.weatherCode[index],
    sunrise: dailyData.sunrise[index],
    sunset: dailyData.sunset[index],
    uvIndexMax: dailyData.uvIndexMax[index],
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getUvIndexBadge = (uvIndex: number) => {
    if (uvIndex <= 2) return { color: 'green' as const, text: 'Low' };
    if (uvIndex <= 5) return { color: 'blue' as const, text: 'Moderate' };
    if (uvIndex <= 7) return { color: 'grey' as const, text: 'High' };
    if (uvIndex <= 10) return { color: 'red' as const, text: 'Very High' };
    return { color: 'red' as const, text: 'Extreme' };
  };

  return (
    <Container
      header={
        <Header variant="h2" description="7-day weather forecast with detailed conditions">
          Daily Forecast
        </Header>
      }
    >
      <Cards
        cardDefinition={{
          header: (item: DailyWeatherItem) => (
            <Box>
              <Box fontWeight="bold">{formatDate(item.date)}</Box>
              <Box variant="small" color="text-status-inactive">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </Box>
            </Box>
          ),
          sections: [
            {
              id: 'weather',
              content: (item: DailyWeatherItem) => {
                const weather = getWeatherDescription(item.weatherCode);
                return (
                  <SpaceBetween size="s" alignItems="center">
                    <Box textAlign="center">
                      <Icon name={weather.icon} size="normal" />
                    </Box>
                    <Box textAlign="center" variant="small">
                      {weather.description}
                    </Box>
                  </SpaceBetween>
                );
              },
            },
            {
              id: 'temperature',
              content: (item: DailyWeatherItem) => (
                <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                  <Box textAlign="center">
                    <Box fontSize="heading-s" fontWeight="bold" color="text-status-error">
                      {Math.round(item.temperatureMax)}°
                    </Box>
                    <Box variant="small" color="text-status-inactive">
                      High
                    </Box>
                  </Box>
                  <Box textAlign="center">
                    <Box fontSize="heading-s" fontWeight="bold" color="text-status-info">
                      {Math.round(item.temperatureMin)}°
                    </Box>
                    <Box variant="small" color="text-status-inactive">
                      Low
                    </Box>
                  </Box>
                </Grid>
              ),
            },
            {
              id: 'details',
              content: (item: DailyWeatherItem) => (
                <SpaceBetween size="xs">
                  <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                    <Box variant="small">
                      <Icon name="menu" size="small" /> {item.precipitation.toFixed(1)} mm
                    </Box>
                    <Box variant="small">
                      <Icon name="arrow-right" size="small" /> {Math.round(item.windSpeedMax)} km/h
                    </Box>
                  </Grid>
                  <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                    <Box variant="small">
                      <Icon name="status-positive" size="small" /> {formatTime(item.sunrise)}
                    </Box>
                    <Box variant="small">
                      <Icon name="status-negative" size="small" /> {formatTime(item.sunset)}
                    </Box>
                  </Grid>
                  {item.uvIndexMax > 0 && (
                    <Box textAlign="center">
                      <Badge color={getUvIndexBadge(item.uvIndexMax).color}>
                        UV: {Math.round(item.uvIndexMax)} - {getUvIndexBadge(item.uvIndexMax).text}
                      </Badge>
                    </Box>
                  )}
                </SpaceBetween>
              ),
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1, minWidth: 0 },
          { cards: 2, minWidth: 500 },
          { cards: 3, minWidth: 768 },
          { cards: 4, minWidth: 1024 },
          { cards: 7, minWidth: 1400 },
        ]}
        items={dailyItems}
        trackBy="date"
        visibleSections={['weather', 'temperature', 'details']}
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="p" color="inherit">
              No daily forecast data available
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
