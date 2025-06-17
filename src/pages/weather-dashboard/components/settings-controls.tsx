// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import ButtonGroup from '@cloudscape-design/components/button-group';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { defaultLocations } from '../services/weather-api';
import { useWeatherSettings, TemperatureUnit } from '../context/weather-settings';

export function WeatherSettingsControls() {
  const { selectedLocation, temperatureUnit, setSelectedLocation, setTemperatureUnit } = useWeatherSettings();

  const locationOptions = defaultLocations.map(location => ({
    label: location.name,
    value: location.name,
    description: `${location.latitude}°, ${location.longitude}°`,
  }));

  const handleLocationChange = (detail: any) => {
    const location = defaultLocations.find(loc => loc.name === detail.selectedOption.value);
    if (location) {
      setSelectedLocation(location);
    }
  };

  const handleTemperatureUnitChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  return (
    <SpaceBetween direction="horizontal" size="s">
      <Select
        selectedOption={{
          label: selectedLocation.name,
          value: selectedLocation.name,
          description: `${selectedLocation.latitude}°, ${selectedLocation.longitude}°`,
        }}
        onChange={({ detail }) => handleLocationChange(detail)}
        options={locationOptions}
        placeholder="Select location"
        ariaLabel="Select weather location"
        expandToViewport
      />
      <ButtonGroup
        items={[
          {
            type: 'button',
            text: '°C',
            pressed: temperatureUnit === 'celsius',
          },
          {
            type: 'button',
            text: '°F',
            pressed: temperatureUnit === 'fahrenheit',
          },
        ]}
        onItemClick={({ detail }) => {
          const unit = detail.item.text === '°C' ? 'celsius' : 'fahrenheit';
          handleTemperatureUnitChange(unit as TemperatureUnit);
        }}
        ariaLabel="Temperature unit selection"
      />
    </SpaceBetween>
  );
}
