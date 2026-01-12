// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';

import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function DashboardCharts() {
  const areaSeries = useMemo(
    () => [
      {
        title: 'Site 1',
        type: 'area' as const,
        data: [
          { x: new Date(2023, 0, 1), y: 28 },
          { x: new Date(2023, 1, 1), y: 30 },
          { x: new Date(2023, 2, 1), y: 32 },
          { x: new Date(2023, 3, 1), y: 34 },
          { x: new Date(2023, 4, 1), y: 31 },
          { x: new Date(2023, 5, 1), y: 33 },
          { x: new Date(2023, 6, 1), y: 35 },
          { x: new Date(2023, 7, 1), y: 36 },
          { x: new Date(2023, 8, 1), y: 33 },
          { x: new Date(2023, 9, 1), y: 35 },
          { x: new Date(2023, 10, 1), y: 34 },
          { x: new Date(2023, 11, 1), y: 36 },
        ],
        valueFormatter: (value: number) => `${value}%`,
      },
      {
        title: 'Site 2',
        type: 'area' as const,
        data: [
          { x: new Date(2023, 0, 1), y: 22 },
          { x: new Date(2023, 1, 1), y: 24 },
          { x: new Date(2023, 2, 1), y: 26 },
          { x: new Date(2023, 3, 1), y: 28 },
          { x: new Date(2023, 4, 1), y: 25 },
          { x: new Date(2023, 5, 1), y: 27 },
          { x: new Date(2023, 6, 1), y: 29 },
          { x: new Date(2023, 7, 1), y: 30 },
          { x: new Date(2023, 8, 1), y: 27 },
          { x: new Date(2023, 9, 1), y: 29 },
          { x: new Date(2023, 10, 1), y: 28 },
          { x: new Date(2023, 11, 1), y: 30 },
        ],
        valueFormatter: (value: number) => `${value}%`,
      },
      {
        title: 'Performance goal',
        type: 'threshold' as const,
        y: 30,
        valueFormatter: (value: number) => `${value}%`,
      },
    ],
    []
  );

  const barSeries = useMemo(
    () => [
      {
        title: 'Site 1',
        type: 'bar' as const,
        data: [
          { x: 'x1', y: 45 },
          { x: 'x2', y: 63 },
          { x: 'x3', y: 52 },
          { x: 'x4', y: 30 },
          { x: 'x5', y: 52 },
        ],
      },
      {
        title: 'Performance goal',
        type: 'threshold' as const,
        y: 50,
      },
    ],
    []
  );

  return (
    <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
      <div className="chart-container">
        <AreaChart
          series={areaSeries}
          height={300}
          xScaleType="time"
          yTitle="y-axis label"
          xTitle="X-axis label"
          ariaLabel="Area chart showing performance metrics over time"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'area chart',
            yTickFormatter: (value) => `${value}%`,
          }}
          hideFilter
          statusType="finished"
        />
      </div>

      <div className="chart-container">
        <BarChart
          series={barSeries}
          height={300}
          xScaleType="categorical"
          yTitle="y-axis label"
          xTitle="X-axis label"
          ariaLabel="Bar chart showing categorical metrics"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'bar chart',
          }}
          hideFilter
          statusType="finished"
        />
      </div>
    </Grid>
  );
}
