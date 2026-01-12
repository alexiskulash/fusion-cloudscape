// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Dashboard Charts Component
 *
 * Displays two chart visualizations side-by-side in a responsive grid:
 *
 * 1. Area Chart (Time Series)
 *    - Shows performance metrics over time for two sites
 *    - Includes a threshold line for performance goals
 *    - Uses time-based x-axis (monthly data points for 2023)
 *    - Y-axis displays percentage values
 *
 * 2. Bar Chart (Categorical)
 *    - Displays categorical data across 5 data points
 *    - Includes a horizontal threshold line for performance goals
 *    - Uses categorical x-axis labels (x1-x5)
 *
 * Both charts use useMemo to optimize performance by memoizing series data
 * and preventing unnecessary re-renders.
 */

import React, { useMemo } from 'react';

import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function DashboardCharts() {
  /**
   * Area Chart Series Data
   *
   * Memoized array containing:
   * - Two area series (Site 1 and Site 2) with monthly data points for 2023
   * - One threshold line representing the performance goal at 30%
   *
   * Each data point has:
   * - x: Date object representing the month
   * - y: Percentage value for that month
   *
   * The valueFormatter ensures y-values are displayed with a % symbol
   */
  const areaSeries = useMemo(
    () => [
      {
        title: 'Site 1',
        type: 'area' as const,
        // Monthly performance data for Site 1 throughout 2023
        // Shows gradual increase from 28% to 36% with some fluctuation
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
        // Monthly performance data for Site 2 throughout 2023
        // Consistently 6% lower than Site 1, ranging from 22% to 30%
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
        // Horizontal threshold line representing the performance goal
        // Displayed at 30% across the entire chart
        title: 'Performance goal',
        type: 'threshold' as const,
        y: 30,
        valueFormatter: (value: number) => `${value}%`,
      },
    ],
    [],
  );

  /**
   * Bar Chart Series Data
   *
   * Memoized array containing:
   * - One bar series showing values across 5 categorical data points
   * - One threshold line at value 50 representing the performance goal
   *
   * Data points use categorical x-values (x1, x2, x3, x4, x5)
   * with varying y-values showing performance metrics
   */
  const barSeries = useMemo(
    () => [
      {
        title: 'Site 1',
        type: 'bar' as const,
        // Categorical data points with varying values
        // Shows peak at x2 (63) and lowest at x4 (30)
        data: [
          { x: 'x1', y: 45 },
          { x: 'x2', y: 63 },
          { x: 'x3', y: 52 },
          { x: 'x4', y: 30 },
          { x: 'x5', y: 52 },
        ],
      },
      {
        // Horizontal threshold line at value 50
        // Acts as a performance goal/target line across all categories
        title: 'Performance goal',
        type: 'threshold' as const,
        y: 50,
      },
    ],
    [],
  );

  return (
    /**
     * Responsive Grid Layout
     * - On small screens (< 600px): Each chart takes full width (12 columns), stacked vertically
     * - On medium+ screens: Each chart takes half width (6 columns), displayed side-by-side
     *
     * The gridDefinition uses responsive breakpoints:
     * - default: 12 columns (full width on mobile)
     * - s (small): 6 columns (half width on desktop)
     */
    <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
      {/*
        Area Chart Container
        - Time series visualization showing Site 1 and Site 2 performance over 2023
        - Height fixed at 300px for consistency
        - xScaleType="time" enables proper date formatting on x-axis
        - hideFilter removes the filter dropdown for simpler UI
        - statusType="finished" indicates data has loaded successfully
        - Custom CSS class "chart-container" applies white background and shadow (see admin-dashboard.scss)
      */}
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
            yTickFormatter: value => `${value}%`,
          }}
          hideFilter
          statusType="finished"
        />
      </div>

      {/*
        Bar Chart Container
        - Categorical visualization showing Site 1 metrics across 5 data points
        - xScaleType="categorical" treats x-values as discrete categories
        - Same height as area chart (300px) for visual consistency
        - hideFilter simplifies the UI by removing series filtering
        - Custom CSS class "chart-container" provides consistent styling
      */}
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
