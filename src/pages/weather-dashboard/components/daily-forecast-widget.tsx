// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';
import Grid from '@cloudscape-design/components/grid';

import { DailyWeather } from '../types';
import { formatTemperature, formatDate, getWeatherInfo, formatPrecipitation, formatWindSpeed } from '../utils';

interface DailyForecastWidgetProps {
  dailyWeather: DailyWeather;
  isLoading?: boolean;
}

export function DailyForecastWidget({ dailyWeather, isLoading }: DailyForecastWidgetProps) {
  if (isLoading) {
    return (
      <Container header={<Header variant="h2">7-Day Forecast</Header>}>
        <Box textAlign="center" color="inherit" padding="xl">
          <Icon name="loading" size="large" />
          <Box variant="p" color="inherit" margin={{ top: 'm' }}>
            Loading daily forecast...
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container header={<Header variant="h2">7-Day Forecast</Header>}>
      <SpaceBetween size="s">
        {dailyWeather.time.map((date, index) => {
          const weatherInfo = getWeatherInfo(dailyWeather.weather_code[index]);
          const isToday = index === 0;

          return (
            <div
              key={date}
              style={{
                padding: '12px 16px',
                border: isToday ? '2px solid #0972d3' : '1px solid #e9ebed',
                borderRadius: '8px',
                backgroundColor: isToday ? '#f2f8fd' : 'transparent',
              }}
            >
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 3 } },
                  { colspan: { default: 12, s: 3 } },
                  { colspan: { default: 12, s: 3 } },
                  { colspan: { default: 12, s: 3 } },
                ]}
              >
                <div>
                  <Box variant="h5" color="inherit">
                    {isToday ? 'Today' : formatDate(date)}
                  </Box>
                  <Box variant="small" color="text-status-info">
                    {weatherInfo.description}
                  </Box>
                </div>

                <div>
                  <Box variant="awsui-key-label">Temperature</Box>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box variant="p" color="inherit">
                      {formatTemperature(dailyWeather.temperature_2m_max[index])}
                    </Box>
                    <Box variant="small" color="text-status-inactive">
                      / {formatTemperature(dailyWeather.temperature_2m_min[index])}
                    </Box>
                  </SpaceBetween>
                </div>

                <div>
                  <Box variant="awsui-key-label">Precipitation</Box>
                  <SpaceBetween direction="vertical" size="xs">
                    <Box variant="small">{formatPrecipitation(dailyWeather.precipitation_sum[index])}</Box>
                    {dailyWeather.precipitation_probability_max[index] > 0 && (
                      <Badge color="blue" size="small">
                        {Math.round(dailyWeather.precipitation_probability_max[index])}% chance
                      </Badge>
                    )}
                  </SpaceBetween>
                </div>

                <div>
                  <Box variant="awsui-key-label">Wind</Box>
                  <SpaceBetween direction="vertical" size="xs">
                    <Box variant="small">{formatWindSpeed(dailyWeather.wind_speed_10m_max[index])}</Box>
                    <Box variant="small" color="text-status-inactive">
                      Gusts: {formatWindSpeed(dailyWeather.wind_gusts_10m_max[index])}
                    </Box>
                  </SpaceBetween>
                </div>
              </Grid>
            </div>
          );
        })}
      </SpaceBetween>
    </Container>
  );
}
