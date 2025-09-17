// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { useWeather } from '../contexts/weather-context';

export function WeatherConfiguration() {
  const { selectedLocation, setSelectedLocation, availableLocations } = useWeather();

  const locationOptions = availableLocations.map(location => ({
    label: location.name,
    value: location.name,
    description: `Coordinates: ${location.latitude}°, ${location.longitude}°`,
  }));

  const selectedOption = locationOptions.find(option => option.value === selectedLocation.name);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Configure the primary location and monitoring settings for weather data"
          actions={
            <Button
              variant="normal"
              iconName="refresh"
              onClick={() => window.location.reload()}
              ariaLabel="Refresh weather data"
            >
              Refresh data
            </Button>
          }
        >
          Configuration
        </Header>
      }
    >
      <SpaceBetween size="l">
        <ColumnLayout columns={2}>
          <FormField
            label="Primary location"
            description="Select the main city for detailed weather monitoring"
            constraintText="Choose from available major cities worldwide"
          >
            <Select
              selectedOption={selectedOption}
              onChange={({ detail }) => {
                const location = availableLocations.find(loc => loc.name === detail.selectedOption.value);
                if (location) {
                  setSelectedLocation(location);
                }
              }}
              options={locationOptions}
              placeholder="Choose a city"
              selectedAriaLabel="Selected location for weather monitoring"
              expandToViewport
            />
          </FormField>

          <FormField label="Monitoring status" description="Current status of weather data collection">
            <StatusIndicator type="success">Active monitoring for {selectedLocation.name}</StatusIndicator>
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
}
