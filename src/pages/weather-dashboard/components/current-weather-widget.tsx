// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';
import Badge from '@cloudscape-design/components/badge';

import { CurrentWeather, WeatherLocation, WeatherService } from '../services/weather-api';

interface CurrentWeatherWidgetProps {
  weather: CurrentWeather;
  location: WeatherLocation;
}

export function CurrentWeatherWidget({ weather, location }: CurrentWeatherWidgetProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const weatherDescription = WeatherService.getWeatherDescription(weather.weatherCode);
  const weatherIcon = WeatherService.getWeatherIcon(weather.weatherCode);

  return (
    <Container
      header={
        <Header variant="h2" description={`${location.name}${location.country ? `, ${location.country}` : ''}`}>
          Current Weather
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Box textAlign="center">
          <SpaceBetween size="s">
            <Box>
              <Icon name={weatherIcon} size="big" />
            </Box>
            <Box fontSize="display-l" fontWeight="bold">
              {Math.round(weather.temperature)}°C
            </Box>
            <Box variant="h3" color="text-status-info">
              {weatherDescription}
            </Box>
            <Badge color={weather.isDay ? 'blue' : 'grey'}>{weather.isDay ? 'Day' : 'Night'}</Badge>
          </SpaceBetween>
        </Box>

        <KeyValuePairs
          columns={2}
          items={[
            {
              label: 'Humidity',
              value: `${weather.humidity}%`,
            },
            {
              label: 'Wind Speed',
              value: `${Math.round(weather.windSpeed)} km/h`,
            },
            {
              label: 'Wind Direction',
              value: `${getWindDirection(weather.windDirection)} (${Math.round(weather.windDirection)}°)`,
            },
            {
              label: 'Last Updated',
              value: formatTime(weather.time),
            },
          ]}
        />
      </SpaceBetween>
    </Container>
  );
}
