// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { useWeather } from '../contexts/weather-context';

export function WeatherHeader() {
  const { selectedLocation, setSelectedLocation, availableLocations } = useWeather();

  const locationOptions = availableLocations.map(location => ({
    label: location.name,
    value: location.name,
    description: `${location.latitude}°, ${location.longitude}°`,
  }));

  const selectedOption = locationOptions.find(option => option.value === selectedLocation.name);

  return (
    <Header
      variant="h1"
      description={`Real-time weather monitoring dashboard for ${selectedLocation.name}`}
      actions={
        <SpaceBetween direction="horizontal" size="s">
          <Select
            selectedOption={selectedOption}
            onChange={({ detail }) => {
              const location = availableLocations.find(loc => loc.name === detail.selectedOption.value);
              if (location) {
                setSelectedLocation(location);
              }
            }}
            options={locationOptions}
            placeholder="Select city"
            selectedAriaLabel="Selected city"
          />
          <Button
            variant="primary"
            iconName="refresh"
            onClick={() => window.location.reload()}
          >
            Refresh data
          </Button>
        </SpaceBetween>
      }
    >
      Weather Dashboard
    </Header>
  );
}
