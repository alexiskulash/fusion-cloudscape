// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';
import { defaultLocations, generateMockWeatherData, getWeatherDescription } from '../../services/weather-api';
import { useWeatherSettings, convertTemperature, getTemperatureSymbol } from '../../context/weather-settings';

function FavoriteLocationsHeader() {
  return (
    <Header
      variant="h2"
      actions={
        <Button iconName="add-plus" variant="icon" ariaLabel="Add location">
          Add location
        </Button>
      }
    >
      Favorite Locations
    </Header>
  );
}

function FavoriteLocationsWidget() {
  const { temperatureUnit } = useWeatherSettings();
  const [locationsData, setLocationsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocationsData = async () => {
      try {
        setLoading(true);
        // Generate mock data for multiple locations
        const data = defaultLocations.slice(0, 4).map(location => ({
          location,
          weather: generateMockWeatherData(location),
        }));
        setLocationsData(data);
      } catch (err) {
        console.error('Error loading locations data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLocationsData();
  }, [temperatureUnit]);

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <Spinner size="normal" />
        <Box margin={{ top: 's' }}>Loading locations...</Box>
      </Box>
    );
  }

  return (
    <SpaceBetween size="s">
      {locationsData.map(({ location, weather }) => {
        const weatherInfo = getWeatherDescription(weather.current.weatherCode);
        const currentTemp = convertTemperature(weather.current.temperature, 'celsius', temperatureUnit);
        const highTemp = convertTemperature(weather.daily.temperatureMax[0], 'celsius', temperatureUnit);
        const lowTemp = convertTemperature(weather.daily.temperatureMin[0], 'celsius', temperatureUnit);
        const tempSymbol = getTemperatureSymbol(temperatureUnit);

        return (
          <div key={location.name} style={{ padding: '12px', border: '1px solid #e9ebed', borderRadius: '8px' }}>
            <ColumnLayout columns={3} variant="text-grid">
              <div>
                <Box variant="awsui-key-label">
                  <Link href={`#/weather-dashboard/location/${location.name.toLowerCase()}`}>{location.name}</Link>
                </Box>
                <Box variant="p" color="text-body-secondary">
                  {weatherInfo.description}
                </Box>
              </div>
              <div>
                <Box variant="h3" color="text-label">
                  {currentTemp}
                  {tempSymbol}
                </Box>
              </div>
              <div>
                <Box variant="p" color="text-body-secondary">
                  H: {highTemp}° L: {lowTemp}°
                </Box>
              </div>
            </ColumnLayout>
          </div>
        );
      })}
    </SpaceBetween>
  );
}

export const favoriteLocations: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 3 },
  data: {
    icon: 'list',
    title: 'Favorite Locations',
    description: 'Quick weather overview for saved locations',
    header: FavoriteLocationsHeader,
    content: FavoriteLocationsWidget,
  },
};
