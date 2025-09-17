// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';

import { WeatherData, LocationCoords, fetchWeatherData, formatTemperature, formatWindSpeed, getWeatherCodeDescription, defaultLocations } from '../../services/weather-api';
import { WeatherWidgetConfig } from '../interfaces';

interface LocationWeatherData {
  location: LocationCoords;
  weather: WeatherData;
}

function MultiLocationHeader() {
  return (
    <Header variant="h2" description="Weather comparison across multiple cities">
      Global Weather Overview
    </Header>
  );
}

function MultiLocationWidget() {
  const [locationData, setLocationData] = useState<LocationWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const weatherPromises = defaultLocations.map(async (location) => {
          const weather = await fetchWeatherData(location);
          return { location, weather };
        });
        
        const results = await Promise.all(weatherPromises);
        setLocationData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadAllWeatherData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spinner size="large" />
        <div style={{ marginTop: '16px' }}>Loading global weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Failed to load weather data">
        {error}
      </Alert>
    );
  }

  const getTemperatureColor = (temp: number): 'blue' | 'green' | 'grey' | 'red' => {
    if (temp < 0) return 'blue';
    if (temp < 15) return 'grey';
    if (temp < 25) return 'green';
    return 'red';
  };

  return (
    <Table
      columnDefinitions={[
        {
          id: 'location',
          header: 'Location',
          cell: (item) => <strong>{item.location.name}</strong>,
          minWidth: 120,
        },
        {
          id: 'conditions',
          header: 'Conditions',
          cell: (item) => getWeatherCodeDescription(item.weather.current.weather_code),
          minWidth: 140,
        },
        {
          id: 'temperature',
          header: 'Temperature',
          cell: (item) => (
            <Badge color={getTemperatureColor(item.weather.current.temperature_2m)}>
              {formatTemperature(item.weather.current.temperature_2m)}
            </Badge>
          ),
          minWidth: 100,
        },
        {
          id: 'wind',
          header: 'Wind',
          cell: (item) => formatWindSpeed(item.weather.current.wind_speed_10m),
          minWidth: 80,
        },
      ]}
      items={locationData}
      loadingText="Loading locations..."
      trackBy="location.name"
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="p" color="inherit">
            No weather data available
          </Box>
        </Box>
      }
      header={
        <Header counter={`(${locationData.length})`}>
          Cities
        </Header>
      }
    />
  );
}

export const multiLocation: WeatherWidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 3 },
  data: {
    icon: 'table',
    title: 'Global Weather Overview',
    description: 'Weather comparison across multiple cities',
    header: MultiLocationHeader,
    content: MultiLocationWidget,
    staticMinHeight: 300,
  },
};
