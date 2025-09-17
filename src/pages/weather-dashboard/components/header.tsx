// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

import { useWeather } from '../contexts/weather-context';

export function WeatherHeader() {
  const { selectedLocation, setSelectedLocation, availableLocations } = useWeather();

  const locationActions = availableLocations.map(location => ({
    text: location.name,
    id: location.name,
    description: `${location.latitude}°, ${location.longitude}°`,
  }));

  return (
    <Header
      variant="h1"
      description="Monitor real-time weather conditions and forecasts across multiple locations"
      actions={
        <ButtonDropdown
          items={locationActions}
          variant="primary"
          onItemClick={({ detail }) => {
            const location = availableLocations.find(loc => loc.name === detail.id);
            if (location) {
              setSelectedLocation(location);
            }
          }}
          ariaLabel="Select location for weather monitoring"
        >
          {selectedLocation.name}
        </ButtonDropdown>
      }
      info={<Button variant="icon" iconName="status-info" ariaLabel="Information about weather dashboard" />}
    >
      Weather monitoring
    </Header>
  );
}
