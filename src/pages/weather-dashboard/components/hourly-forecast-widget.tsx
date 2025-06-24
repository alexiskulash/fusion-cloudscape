// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';

import { HourlyWeather } from '../types';
import { formatTemperature, formatTime, getWeatherInfo, getNext24Hours } from '../utils';

interface HourlyForecastWidgetProps {
  hourlyWeather: HourlyWeather;
  isLoading?: boolean;
}

export function HourlyForecastWidget({ hourlyWeather, isLoading }: HourlyForecastWidgetProps) {
  if (isLoading) {
    return (
      <Container header={<Header variant="h2">24-Hour Forecast</Header>}>
        <Box textAlign="center" color="inherit" padding="xl">
          <Icon name="loading" size="large" />
          <Box variant="p" color="inherit" margin={{ top: 'm' }}>
            Loading hourly forecast...
          </Box>
        </Box>
      </Container>
    );
  }

  const next24Hours = getNext24Hours(hourlyWeather.time);
  const next24Temps = getNext24Hours(hourlyWeather.temperature_2m);
  const next24Codes = getNext24Hours(hourlyWeather.weather_code);
  const next24Precip = getNext24Hours(hourlyWeather.precipitation_probability);

  return (
    <Container header={<Header variant="h2">24-Hour Forecast</Header>}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '8px 0',
          scrollbarWidth: 'thin',
        }}
      >
        {next24Hours.slice(0, 12).map((time, index) => {
          const weatherInfo = getWeatherInfo(next24Codes[index]);
          const isCurrentHour = index === 0;

          return (
            <div
              key={time}
              style={{
                minWidth: '80px',
                textAlign: 'center',
                padding: '12px 8px',
                border: isCurrentHour ? '2px solid #0972d3' : '1px solid #e9ebed',
                borderRadius: '8px',
                backgroundColor: isCurrentHour ? '#f2f8fd' : 'transparent',
              }}
            >
              <SpaceBetween size="xs">
                <Box variant="small" color={isCurrentHour ? 'text-label' : 'text-status-inactive'}>
                  {isCurrentHour ? 'Now' : formatTime(time)}
                </Box>

                <Box variant="h5" color="inherit">
                  {formatTemperature(next24Temps[index])}
                </Box>

                <Box variant="small" color="text-status-info">
                  {weatherInfo.description}
                </Box>

                {next24Precip[index] > 0 && (
                  <Badge color="blue" size="small">
                    {Math.round(next24Precip[index])}%
                  </Badge>
                )}
              </SpaceBetween>
            </div>
          );
        })}
      </div>

      <Box variant="small" color="text-status-inactive" margin={{ top: 's' }}>
        Scroll to see more hours • Precipitation probability shown when &gt; 0%
      </Box>
    </Container>
  );
}
