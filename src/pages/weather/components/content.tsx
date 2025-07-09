// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Select from '@cloudscape-design/components/select';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';
import Icon from '@cloudscape-design/components/icon';

import {
  WeatherResponse,
  WeatherLocation,
  DEFAULT_LOCATIONS,
  getCompleteWeatherData,
  getWeatherDescription,
} from '../services/weather-api';
import { WeatherMetricCard } from './weather-metric-card';
import { HourlyForecastCard } from './hourly-forecast-card';
import { DailyForecastCard } from './daily-forecast-card';

export function WeatherContent() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(DEFAULT_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherData = async (location: WeatherLocation) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCompleteWeatherData(location);
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  const handleLocationChange = (detail: any) => {
    const location = DEFAULT_LOCATIONS.find(loc => loc.name === detail.selectedOption.value);
    if (location) {
      setSelectedLocation(location);
    }
  };

  const handleRefresh = () => {
    fetchWeatherData(selectedLocation);
  };

  if (loading && !weatherData) {
    return (
      <Container>
        <Box textAlign="center" padding="xxl">
          <Spinner size="large" />
          <Box variant="p" padding={{ top: 'm' }}>
            Loading weather data...
          </Box>
        </Box>
      </Container>
    );
  }

  if (error && !weatherData) {
    return (
      <Container>
        <Alert
          statusIconAriaLabel="Error"
          type="error"
          header="Failed to load weather data"
          action={
            <Button onClick={handleRefresh} iconName="refresh">
              Try again
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  const currentWeather = weatherData?.current;
  const weatherInfo = currentWeather ? getWeatherDescription(currentWeather.weatherCode) : null;

  return (
    <SpaceBetween size="l">
      {/* Location selector and current conditions header */}
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Select
                  selectedOption={{ label: selectedLocation.name, value: selectedLocation.name }}
                  onChange={({ detail }) => handleLocationChange(detail)}
                  options={DEFAULT_LOCATIONS.map(location => ({
                    label: `${location.name}, ${location.country}`,
                    value: location.name,
                  }))}
                  loadingText="Loading locations"
                  placeholder="Select location"
                />
                <Button iconName="refresh" loading={loading} onClick={handleRefresh} ariaLabel="Refresh weather data" />
              </SpaceBetween>
            }
          >
            Current Weather - {selectedLocation.name}
            {lastUpdated && (
              <Box variant="small" color="text-status-info" display="inline" margin={{ left: 's' }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </Box>
            )}
          </Header>
        }
      >
        {currentWeather && weatherInfo ? (
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3, xl: 3 } },
              { colspan: { default: 12, xs: 12, s: 6, m: 8, l: 9, xl: 9 } },
            ]}
          >
            <Box>
              <SpaceBetween size="s" alignItems="center">
                <Box textAlign="center">
                  <Icon name={weatherInfo.icon} size="big" />
                </Box>
                <Box textAlign="center">
                  <Box fontSize="display-l" fontWeight="bold">
                    {Math.round(currentWeather.temperature)}°C
                  </Box>
                  <Box variant="small" color="text-status-inactive">
                    {weatherInfo.description}
                  </Box>
                  <Badge color={currentWeather.isDay ? 'green' : 'blue'}>
                    {currentWeather.isDay ? 'Day' : 'Night'}
                  </Badge>
                </Box>
              </SpaceBetween>
            </Box>
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <SpaceBetween size="s">
                <WeatherMetricCard label="Humidity" value={`${currentWeather.humidity}%`} icon="percentage" />
                <WeatherMetricCard
                  label="Wind Speed"
                  value={`${Math.round(currentWeather.windSpeed)} km/h`}
                  icon="arrow-right"
                />
              </SpaceBetween>
              <SpaceBetween size="s">
                <WeatherMetricCard
                  label="Pressure"
                  value={`${Math.round(currentWeather.pressure)} hPa`}
                  icon="status-info"
                />
                <WeatherMetricCard label="Precipitation" value={`${currentWeather.precipitation} mm`} icon="menu" />
              </SpaceBetween>
            </Grid>
          </Grid>
        ) : (
          <Box variant="p" color="text-status-inactive">
            No current weather data available
          </Box>
        )}
      </Container>

      {/* Hourly forecast */}
      {weatherData?.hourly && <HourlyForecastCard hourlyData={weatherData.hourly} />}

      {/* Daily forecast */}
      {weatherData?.daily && <DailyForecastCard dailyData={weatherData.daily} />}

      {/* Weather locations grid */}
      <Container
        header={
          <Header variant="h2" description="Quick access to weather data for major cities">
            Popular Locations
          </Header>
        }
      >
        <Cards
          cardDefinition={{
            header: (item: WeatherLocation) => item.name,
            sections: [
              {
                id: 'country',
                content: (item: WeatherLocation) => <Badge>{item.country}</Badge>,
              },
              {
                id: 'coordinates',
                content: (item: WeatherLocation) => (
                  <Box variant="small" color="text-status-inactive">
                    {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                  </Box>
                ),
              },
              {
                id: 'actions',
                content: (item: WeatherLocation) => (
                  <Button
                    variant={item.name === selectedLocation.name ? 'normal' : 'primary'}
                    disabled={item.name === selectedLocation.name}
                    onClick={() => setSelectedLocation(item)}
                    fullWidth
                  >
                    {item.name === selectedLocation.name ? 'Current' : 'View Weather'}
                  </Button>
                ),
              },
            ],
          }}
          cardsPerRow={[
            { cards: 1, minWidth: 0 },
            { cards: 2, minWidth: 600 },
            { cards: 3, minWidth: 900 },
            { cards: 4, minWidth: 1200 },
          ]}
          items={DEFAULT_LOCATIONS}
          trackBy="name"
          visibleSections={['country', 'coordinates', 'actions']}
          header={<Header counter={`(${DEFAULT_LOCATIONS.length})`}>Available Locations</Header>}
        />
      </Container>
    </SpaceBetween>
  );
}
