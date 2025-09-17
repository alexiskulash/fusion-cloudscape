// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Badge from '@cloudscape-design/components/badge';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';
import ExpandableSection from '@cloudscape-design/components/expandable-section';

import { WeatherData, LocationCoords, fetchWeatherData, formatTemperature, formatWindSpeed, getWeatherCodeDescription, defaultLocations } from '../services/weather-api';

interface LocationWeatherData {
  location: LocationCoords;
  weather: WeatherData;
}

export function GlobalWeatherSection() {
  const [locationData, setLocationData] = useState<LocationWeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : 'Failed to load global weather data');
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureColor = (temp: number): 'blue' | 'green' | 'grey' | 'red' => {
    if (temp < 0) return 'blue';
    if (temp < 15) return 'grey';
    if (temp < 25) return 'green';
    return 'red';
  };

  const getConditionsBadgeColor = (weatherCode: number): 'blue' | 'green' | 'grey' | 'red' => {
    if (weatherCode === 0 || weatherCode === 1) return 'green'; // Clear/mainly clear
    if (weatherCode <= 3) return 'grey'; // Partly cloudy/overcast
    if (weatherCode >= 80) return 'red'; // Storms/severe weather
    return 'blue'; // Other conditions
  };

  return (
    <ExpandableSection
      headerText="Global weather comparison"
      headerDescription="Compare weather conditions across multiple major cities worldwide"
      defaultExpanded={false}
    >
      <Container
        header={
          <Header
            variant="h3"
            description="Weather comparison across multiple locations for broader monitoring"
            actions={
              <Button
                variant="normal"
                iconName="refresh"
                onClick={loadAllWeatherData}
                loading={loading}
                ariaLabel="Refresh global weather data"
              >
                Load global data
              </Button>
            }
          >
            Global overview
          </Header>
        }
      >
        {error ? (
          <Alert
            type="error"
            header="Unable to load global weather data"
            action={
              <Button onClick={loadAllWeatherData}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <Table
            columnDefinitions={[
              {
                id: 'location',
                header: 'Location',
                cell: (item) => <strong>{item.location.name}</strong>,
                minWidth: 120,
                sortingField: 'location.name',
              },
              {
                id: 'conditions',
                header: 'Conditions',
                cell: (item) => (
                  <Badge color={getConditionsBadgeColor(item.weather.current.weather_code)}>
                    {getWeatherCodeDescription(item.weather.current.weather_code)}
                  </Badge>
                ),
                minWidth: 160,
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
                sortingField: 'weather.current.temperature_2m',
              },
              {
                id: 'wind',
                header: 'Wind speed',
                cell: (item) => formatWindSpeed(item.weather.current.wind_speed_10m),
                minWidth: 100,
                sortingField: 'weather.current.wind_speed_10m',
              },
              {
                id: 'coordinates',
                header: 'Coordinates',
                cell: (item) => `${item.location.latitude}°, ${item.location.longitude}°`,
                minWidth: 140,
              },
            ]}
            items={locationData}
            loading={loading}
            loadingText="Loading global weather data..."
            trackBy="location.name"
            sortingDisabled={loading}
            ariaLabels={{
              allItemsSelectionLabel: () => 'Select all locations',
              itemSelectionLabel: (data, item) => `Select ${item.location.name}`,
              selectionGroupLabel: 'Location selection',
            }}
            header={
              <Header
                counter={locationData.length > 0 ? `(${locationData.length})` : undefined}
                description="Compare weather conditions across different time zones"
              >
                Cities
              </Header>
            }
          />
        )}
      </Container>
    </ExpandableSection>
  );
}
