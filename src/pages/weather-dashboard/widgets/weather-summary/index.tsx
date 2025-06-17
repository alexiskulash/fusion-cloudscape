// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';
import Spinner from '@cloudscape-design/components/spinner';

import { WidgetConfig } from '../../../dashboard/widgets/interfaces';
import { defaultLocations, generateMockWeatherData } from '../../services/weather-api';

function WeatherSummaryHeader() {
  return <Header variant="h2">Weather Summary</Header>;
}

function WeatherSummaryWidget() {
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        setLoading(true);
        // Generate mock summary data
        const locationsWeather = defaultLocations.slice(0, 5).map(location => generateMockWeatherData(location));

        const totalLocations = locationsWeather.length;
        const avgTemp = Math.round(
          locationsWeather.reduce((sum, weather) => sum + weather.current.temperature, 0) / totalLocations,
        );
        const rainyLocations = locationsWeather.filter(weather => weather.current.precipitation > 0).length;
        const maxTemp = Math.max(...locationsWeather.map(weather => weather.current.temperature));
        const minTemp = Math.min(...locationsWeather.map(weather => weather.current.temperature));

        setSummaryData({
          totalLocations,
          avgTemp,
          rainyLocations,
          maxTemp,
          minTemp,
        });
      } catch (err) {
        console.error('Error loading summary data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSummaryData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" padding="l">
        <Spinner size="normal" />
        <Box margin={{ top: 's' }}>Loading summary...</Box>
      </Box>
    );
  }

  return (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Tracked Locations',
          value: (
            <Link variant="awsui-value-large" href="#/weather-dashboard/locations" ariaLabel="Tracked locations">
              {summaryData.totalLocations}
            </Link>
          ),
        },
        {
          label: 'Average Temperature',
          value: (
            <Box variant="awsui-value-large" color="text-label">
              {summaryData.avgTemp}°C
            </Box>
          ),
        },
        {
          label: 'Locations with Rain',
          value: (
            <Link variant="awsui-value-large" href="#/weather-dashboard/precipitation" ariaLabel="Rainy locations">
              {summaryData.rainyLocations}
            </Link>
          ),
        },
        {
          label: 'Temperature Range',
          value: (
            <Box variant="awsui-value-large" color="text-label">
              {summaryData.minTemp}° - {summaryData.maxTemp}°C
            </Box>
          ),
        },
      ]}
    />
  );
}

export const weatherSummary: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 3 },
  data: {
    icon: 'list',
    title: 'Weather Summary',
    description: 'Overview of all monitored locations',
    header: WeatherSummaryHeader,
    content: WeatherSummaryWidget,
  },
};
