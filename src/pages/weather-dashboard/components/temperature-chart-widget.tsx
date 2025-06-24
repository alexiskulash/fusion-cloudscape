// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Icon from '@cloudscape-design/components/icon';

import { HourlyWeather } from '../types';
import { generateTemperatureChartData, getNext24Hours, formatTemperature } from '../utils';

interface TemperatureChartWidgetProps {
  hourlyWeather: HourlyWeather;
  isLoading?: boolean;
}

export function TemperatureChartWidget({ hourlyWeather, isLoading }: TemperatureChartWidgetProps) {
  if (isLoading) {
    return (
      <Container header={<Header variant="h2">Temperature Trend</Header>}>
        <Box textAlign="center" color="inherit" padding="xl">
          <Icon name="loading" size="large" />
          <Box variant="p" color="inherit" margin={{ top: 'm' }}>
            Loading temperature chart...
          </Box>
        </Box>
      </Container>
    );
  }

  const next24Hours = getNext24Hours(hourlyWeather.time);
  const next24Temps = getNext24Hours(hourlyWeather.temperature_2m);

  const chartData = generateTemperatureChartData(next24Hours, next24Temps, 'Temperature');

  return (
    <Container header={<Header variant="h2">Temperature Trend (24 Hours)</Header>}>
      <LineChart
        series={chartData}
        xDomain={[new Date(next24Hours[0]), new Date(next24Hours[next24Hours.length - 1])]}
        yTitle="Temperature (°C)"
        xTitle="Time"
        height={300}
        loadingText="Loading chart"
        errorText="Error loading data"
        recoveryText="Retry"
        xScaleType="time"
        yScaleType="linear"
        emphasizeBaselineAxis={false}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'line chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
          yTickFormatter: (value: number) => formatTemperature(value),
        }}
        ariaLabel="Temperature trend over the next 24 hours"
        ariaDescription="Line chart showing temperature changes throughout the day"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No temperature data available</b>
            <Box variant="p" color="inherit">
              Unable to load temperature trend data
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              No temperature data matches the current filters
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
