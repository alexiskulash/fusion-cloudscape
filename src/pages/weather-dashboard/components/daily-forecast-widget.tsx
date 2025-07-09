// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Cards from '@cloudscape-design/components/cards';
import Icon from '@cloudscape-design/components/icon';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { DailyForecast, WeatherService } from '../services/weather-api';

interface DailyForecastWidgetProps {
  forecast: DailyForecast;
}

interface DailyDataRow {
  date: string;
  dayName: string;
  shortDate: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  windSpeedMax: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
}

export function DailyForecastWidget({ forecast }: DailyForecastWidgetProps) {
  const dailyData: DailyDataRow[] = forecast.time.map((time, index) => {
    const date = new Date(time);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (date.toDateString() === today.toDateString()) {
      dayName = 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dayName = 'Tomorrow';
    }

    return {
      date: time,
      dayName,
      shortDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperatureMax: Math.round(forecast.temperatureMax[index]),
      temperatureMin: Math.round(forecast.temperatureMin[index]),
      precipitation: forecast.precipitation[index],
      windSpeedMax: Math.round(forecast.windSpeedMax[index]),
      weatherCode: forecast.weatherCode[index],
      weatherDescription: WeatherService.getWeatherDescription(forecast.weatherCode[index]),
      weatherIcon: WeatherService.getWeatherIcon(forecast.weatherCode[index]),
    };
  });

  return (
    <Container
      header={
        <Header variant="h2" description="7-day weather forecast with daily highs and lows">
          7-Day Forecast
        </Header>
      }
    >
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, item) => `Weather for ${item.dayName}`,
          selectionGroupLabel: 'Daily forecast',
        }}
        cardDefinition={{
          header: item => (
            <SpaceBetween size="xs">
              <Box variant="h3">{item.dayName}</Box>
              <Box color="text-status-inactive">{item.shortDate}</Box>
            </SpaceBetween>
          ),
          sections: [
            {
              id: 'weather-icon',
              content: item => (
                <Box textAlign="center" padding={{ vertical: 's' }}>
                  <Icon name={item.weatherIcon} size="big" />
                  <Box margin={{ top: 'xs' }} color="text-status-info">
                    {item.weatherDescription}
                  </Box>
                </Box>
              ),
            },
            {
              id: 'temperature',
              content: item => (
                <Box textAlign="center">
                  <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                    <Box fontSize="heading-l" fontWeight="bold">
                      {item.temperatureMax}°
                    </Box>
                    <Box fontSize="heading-m" color="text-status-inactive">
                      {item.temperatureMin}°
                    </Box>
                  </SpaceBetween>
                </Box>
              ),
            },
            {
              id: 'details',
              content: item => (
                <SpaceBetween size="xs">
                  <Box>
                    <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                      <Icon name="tint" />
                      <span>
                        {item.precipitation > 0 ? (
                          <Badge color={item.precipitation > 10 ? 'red' : item.precipitation > 5 ? 'blue' : 'grey'}>
                            {item.precipitation.toFixed(1)} mm
                          </Badge>
                        ) : (
                          <span style={{ color: 'var(--color-text-status-inactive)' }}>No rain</span>
                        )}
                      </span>
                    </SpaceBetween>
                  </Box>
                  <Box>
                    <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                      <Icon name="share" />
                      <span>{item.windSpeedMax} km/h</span>
                    </SpaceBetween>
                  </Box>
                </SpaceBetween>
              ),
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1, minWidth: 0 },
          { cards: 2, minWidth: 400 },
          { cards: 3, minWidth: 600 },
          { cards: 4, minWidth: 800 },
          { cards: 7, minWidth: 1200 },
        ]}
        items={dailyData}
        loadingText="Loading forecast..."
        trackBy="date"
        visibleSections={['weather-icon', 'temperature', 'details']}
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No forecast data available
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
