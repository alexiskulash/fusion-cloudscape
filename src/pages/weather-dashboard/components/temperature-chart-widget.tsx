// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';
import Tabs from '@cloudscape-design/components/tabs';

import { DailyForecast, HourlyForecast } from '../types';

interface TemperatureChartWidgetProps {
  hourlyData: HourlyForecast;
  dailyData: DailyForecast;
}

export function TemperatureChartWidget({ hourlyData, dailyData }: TemperatureChartWidgetProps) {
  const [activeTab, setActiveTab] = useState('hourly');

  const formatHourlyTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDailyTime = (timeString: string) => {
    const date = new Date(timeString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const hourlyChartData = [
    {
      title: 'Temperature',
      type: 'line' as const,
      data: hourlyData.time.slice(0, 24).map((time, index) => ({
        x: new Date(time),
        y: hourlyData.temperature[index],
      })),
      valueFormatter: (value: number) => `${Math.round(value)}°C`,
    },
  ];

  const dailyChartData = [
    {
      title: 'Max Temperature',
      type: 'line' as const,
      data: dailyData.time.map((time, index) => ({
        x: new Date(time),
        y: dailyData.temperatureMax[index],
      })),
      valueFormatter: (value: number) => `${Math.round(value)}°C`,
    },
    {
      title: 'Min Temperature',
      type: 'line' as const,
      data: dailyData.time.map((time, index) => ({
        x: new Date(time),
        y: dailyData.temperatureMin[index],
      })),
      valueFormatter: (value: number) => `${Math.round(value)}°C`,
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2" description="Interactive temperature charts">
          Temperature Trends
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: 'hourly',
            label: 'Hourly (24h)',
            content: (
              <Box padding={{ vertical: 'm' }}>
                <LineChart
                  series={hourlyChartData}
                  xDomain={[
                    hourlyData.time[0] ? new Date(hourlyData.time[0]) : new Date(),
                    hourlyData.time[23] ? new Date(hourlyData.time[23]) : new Date(),
                  ]}
                  yDomain={[Math.min(...hourlyData.temperature) - 2, Math.max(...hourlyData.temperature) + 2]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'line chart',
                    xTickFormatter: formatHourlyTime,
                  }}
                  ariaLabel="Hourly temperature chart"
                  height={300}
                  hideFilter
                  hideLegend
                  xTitle="Time"
                  yTitle="Temperature (°C)"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                    </Box>
                  }
                />
              </Box>
            ),
          },
          {
            id: 'daily',
            label: 'Daily (7 days)',
            content: (
              <Box padding={{ vertical: 'm' }}>
                <LineChart
                  series={dailyChartData}
                  xDomain={[
                    dailyData.time[0] ? new Date(dailyData.time[0]) : new Date(),
                    dailyData.time[dailyData.time.length - 1]
                      ? new Date(dailyData.time[dailyData.time.length - 1])
                      : new Date(),
                  ]}
                  yDomain={[Math.min(...dailyData.temperatureMin) - 2, Math.max(...dailyData.temperatureMax) + 2]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'line chart',
                    xTickFormatter: formatDailyTime,
                  }}
                  ariaLabel="Daily temperature chart"
                  height={300}
                  hideFilter
                  xTitle="Date"
                  yTitle="Temperature (°C)"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                    </Box>
                  }
                />
              </Box>
            ),
          },
        ]}
        activeTabId={activeTab}
        onChange={({ detail }) => setActiveTab(detail.activeTabId)}
      />
    </Container>
  );
}
