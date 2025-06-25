// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { WeatherLocation } from '../types';

interface LocationInputWidgetProps {
  onLocationSubmit: (location: WeatherLocation) => void;
}

export function LocationInputWidget({ onLocationSubmit }: LocationInputWidgetProps) {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!locationName.trim() || !latitude.trim() || !longitude.trim()) {
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return;
    }

    setSubmitting(true);
    try {
      onLocationSubmit({
        name: locationName.trim(),
        latitude: lat,
        longitude: lng,
      });
      // Clear form after successful submission
      setLocationName('');
      setLatitude('');
      setLongitude('');
    } finally {
      setSubmitting(false);
    }
  };

  const isValid =
    locationName.trim() &&
    latitude.trim() &&
    longitude.trim() &&
    !isNaN(parseFloat(latitude)) &&
    !isNaN(parseFloat(longitude)) &&
    parseFloat(latitude) >= -90 &&
    parseFloat(latitude) <= 90 &&
    parseFloat(longitude) >= -180 &&
    parseFloat(longitude) <= 180;

  return (
    <div>
      <Box variant="awsui-key-label" margin={{ bottom: 'xs' }}>
        Custom Location
      </Box>
      <SpaceBetween size="s">
        <FormField label="Location name">
          <Input
            value={locationName}
            onChange={({ detail }) => setLocationName(detail.value)}
            placeholder="e.g., My Location"
          />
        </FormField>
        <FormField
          label="Latitude"
          description="Valid range: -90 to 90"
          errorText={
            latitude && (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90)
              ? 'Invalid latitude'
              : undefined
          }
        >
          <Input
            value={latitude}
            onChange={({ detail }) => setLatitude(detail.value)}
            placeholder="e.g., 40.7128"
            type="number"
            step="any"
          />
        </FormField>
        <FormField
          label="Longitude"
          description="Valid range: -180 to 180"
          errorText={
            longitude && (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180)
              ? 'Invalid longitude'
              : undefined
          }
        >
          <Input
            value={longitude}
            onChange={({ detail }) => setLongitude(detail.value)}
            placeholder="e.g., -74.0060"
            type="number"
            step="any"
          />
        </FormField>
        <Button variant="primary" onClick={handleSubmit} loading={submitting} disabled={!isValid} fullWidth>
          Get Weather
        </Button>
      </SpaceBetween>
    </div>
  );
}
