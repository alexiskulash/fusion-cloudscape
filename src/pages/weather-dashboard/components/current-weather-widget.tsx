// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Badge from '@cloudscape-design/components/badge';
import Grid from '@cloudscape-design/components/grid';
import Icon from '@cloudscape-design/components/icon';

import { CurrentWeather, WeatherLocation } from '../types';
import { formatTemperature, formatPercentage, formatWindSpeed, getWeatherInfo, getWindDirection } from '../utils';

interface CurrentWeatherWidgetProps {
  weather: CurrentWeather;
  location: WeatherLocation;
  isLoading?: boolean;
}

export function CurrentWeatherWidget({ weather, location, isLoading }: CurrentWeatherWidgetProps) {
  const weatherInfo = getWeatherInfo(weather.weather_code);
  const windDirection = getWindDirection(weather.wind_direction_10m);

  if (isLoading) {
    return (
      <Container header={<Header variant="h2">Current Weather</Header>}>
        <Box textAlign="center" color="inherit" padding="xl">
          <Icon name="loading" size="large" />
          <Box variant="p" color="inherit" margin={{ top: 'm' }}>
            Loading current weather...
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={location.city && location.country ? `${location.city}, ${location.country}` : 'Current location'}
        >
          Current Weather
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
          <div>
            <SpaceBetween size="m">
              <div>
                <Box variant="h1" color="inherit" fontSize="display-l">
                  {formatTemperature(weather.temperature_2m)}
                </Box>
                <Box variant="p" color="text-status-info" fontSize="body-s">
                  Feels like {formatTemperature(weather.apparent_temperature)}
                </Box>
              </div>
              <div>
                <SpaceBetween direction="horizontal" size="s">
                  <Badge color="blue">{weatherInfo.description}</Badge>
                  {weather.is_day ? <Badge color="green">Day</Badge> : <Badge color="grey">Night</Badge>}
                </SpaceBetween>
              </div>
            </SpaceBetween>
          </div>

          <div>
            <SpaceBetween size="s">
              <div>
                <Box variant="awsui-key-label">Humidity</Box>
                <Box variant="p">{formatPercentage(weather.relative_humidity_2m)}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Wind</Box>
                <Box variant="p">
                  {formatWindSpeed(weather.wind_speed_10m)} {windDirection}
                </Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Precipitation</Box>
                <Box variant="p">{weather.precipitation.toFixed(1)} mm</Box>
              </div>
            </SpaceBetween>
          </div>
        </Grid>

        <Box variant="small" color="text-status-inactive">
          Last updated: {new Date(weather.time).toLocaleTimeString()}
        </Box>
      </SpaceBetween>
    </Container>
  );
}
