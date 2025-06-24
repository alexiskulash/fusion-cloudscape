// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select from '@cloudscape-design/components/select';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Grid from '@cloudscape-design/components/grid';
import Alert from '@cloudscape-design/components/alert';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';

import { WeatherLocation } from '../types';
import { popularCities, getCurrentLocation } from '../services/weather-api';

interface LocationSelectorWidgetProps {
  currentLocation: WeatherLocation;
  onLocationChange: (location: WeatherLocation) => void;
  isLoading?: boolean;
}

export function LocationSelectorWidget({ currentLocation, onLocationChange, isLoading }: LocationSelectorWidgetProps) {
  const [customLatitude, setCustomLatitude] = useState('');
  const [customLongitude, setCustomLongitude] = useState('');
  const [locationError, setLocationError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const cityOptions = popularCities.map(city => ({
    label: `${city.city}, ${city.country}`,
    value: `${city.latitude},${city.longitude}`,
    description: `Lat: ${city.latitude.toFixed(4)}, Lng: ${city.longitude.toFixed(4)}`,
  }));

  const handleCitySelection = (selectedOption: any) => {
    if (selectedOption?.value) {
      const [lat, lng] = selectedOption.value.split(',').map(Number);
      const selectedCity = popularCities.find(city => city.latitude === lat && city.longitude === lng);

      if (selectedCity) {
        onLocationChange({
          latitude: lat,
          longitude: lng,
          city: selectedCity.city,
          country: selectedCity.country,
        });
        setLocationError('');
      }
    }
  };

  const handleCustomLocationSubmit = () => {
    const lat = parseFloat(customLatitude);
    const lng = parseFloat(customLongitude);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setLocationError('Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)');
      return;
    }

    onLocationChange({ latitude: lat, longitude: lng });
    setLocationError('');
    setCustomLatitude('');
    setCustomLongitude('');
  };

  const handleGetCurrentLocation = async () => {
    setLoadingLocation(true);
    setLocationError('');

    try {
      const location = await getCurrentLocation();
      onLocationChange(location);
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'Failed to get current location');
    } finally {
      setLoadingLocation(false);
    }
  };

  const getCurrentLocationDisplay = () => {
    if (currentLocation.city && currentLocation.country) {
      return `${currentLocation.city}, ${currentLocation.country}`;
    }
    return `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`;
  };

  return (
    <Container header={<Header variant="h2">Location Settings</Header>}>
      <SpaceBetween size="l">
        <div>
          <Box variant="h3" color="inherit">
            Current Location
          </Box>
          <SpaceBetween direction="horizontal" size="s">
            <Badge color="blue">{getCurrentLocationDisplay()}</Badge>
            <Button
              variant="primary"
              iconName="refresh"
              size="small"
              loading={loadingLocation}
              onClick={handleGetCurrentLocation}
            >
              Use Current Location
            </Button>
          </SpaceBetween>
        </div>

        {locationError && (
          <Alert type="error" dismissible onDismiss={() => setLocationError('')}>
            {locationError}
          </Alert>
        )}

        <div>
          <Box variant="h3" color="inherit" margin={{ bottom: 's' }}>
            Popular Cities
          </Box>
          <FormField label="Select a city">
            <Select
              selectedOption={null}
              onChange={({ detail }) => handleCitySelection(detail.selectedOption)}
              options={cityOptions}
              placeholder="Choose a city..."
              loadingText="Loading cities"
              statusType={isLoading ? 'loading' : 'finished'}
              empty="No cities found"
            />
          </FormField>
        </div>

        <div>
          <Box variant="h3" color="inherit" margin={{ bottom: 's' }}>
            Custom Coordinates
          </Box>
          <Grid
            gridDefinition={[
              { colspan: { default: 12, s: 5 } },
              { colspan: { default: 12, s: 5 } },
              { colspan: { default: 12, s: 2 } },
            ]}
          >
            <FormField label="Latitude">
              <Input
                value={customLatitude}
                onChange={({ detail }) => setCustomLatitude(detail.value)}
                placeholder="e.g., 40.7128"
                type="number"
                inputMode="decimal"
              />
            </FormField>

            <FormField label="Longitude">
              <Input
                value={customLongitude}
                onChange={({ detail }) => setCustomLongitude(detail.value)}
                placeholder="e.g., -74.0060"
                type="number"
                inputMode="decimal"
              />
            </FormField>

            <FormField label=" ">
              <Button
                variant="primary"
                onClick={handleCustomLocationSubmit}
                disabled={!customLatitude || !customLongitude}
                iconName="search"
              >
                Apply
              </Button>
            </FormField>
          </Grid>
        </div>

        <Box variant="small" color="text-status-inactive">
          <SpaceBetween direction="vertical" size="xs">
            <div>
              <Icon name="status-info" size="small" /> Weather data is provided by Open-Meteo API
            </div>
            <div>Coordinates are used to fetch accurate local weather information</div>
          </SpaceBetween>
        </Box>
      </SpaceBetween>
    </Container>
  );
}
