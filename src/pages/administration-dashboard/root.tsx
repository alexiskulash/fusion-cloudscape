// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

/**
 * Area Chart Data Configuration
 *
 * This data structure defines two data series for the area chart visualization.
 * Each series represents performance metrics from different sites over a 12-period timeline.
 * The area chart will display these as stacked or overlapping areas showing trends over time.
 *
 * Structure:
 * - title: Display name for the data series in the chart legend
 * - type: Chart type specification (must be 'area' for area charts)
 * - data: Array of data points with x (time period) and y (metric value) coordinates
 * - valueFormatter: Function to format displayed values (converts numbers to fixed decimal places)
 */
const areaChartData = [
  {
    // First data series - Site 1 performance metrics
    // Shows higher overall values with some fluctuation
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 4 },
      { x: 'x3', y: 4.5 },
      { x: 'x4', y: 3.8 },
      { x: 'x5', y: 4.2 },
      { x: 'x6', y: 5 },
      { x: 'x7', y: 4.8 },
      { x: 'x8', y: 5.2 },
      { x: 'x9', y: 4.5 },
      { x: 'x10', y: 5.5 },
      { x: 'x11', y: 5 },
      { x: 'x12', y: 4.8 },
    ],
    // Format y-axis values to one decimal place (e.g., 3.0, 4.5)
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
    // Second data series - Site 2 performance metrics
    // Shows lower overall values with declining trend in middle period
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 2 },
      { x: 'x2', y: 2.5 },
      { x: 'x3', y: 2.2 },
      { x: 'x4', y: 1.8 },
      { x: 'x5', y: 1.5 },
      { x: 'x6', y: 1 },
      { x: 'x7', y: 0.8 },
      { x: 'x8', y: 1.2 },
      { x: 'x9', y: 1.8 },
      { x: 'x10', y: 2 },
      { x: 'x11', y: 2.5 },
      { x: 'x12', y: 2.2 },
    ],
    // Format y-axis values to one decimal place for consistency
    valueFormatter: (value: number) => value.toFixed(1),
  },
];

/**
 * Bar Chart Data Configuration
 *
 * This data structure defines a single data series for the bar chart visualization.
 * Each data point represents a discrete metric value for different time periods or categories.
 * The bar chart displays these as vertical bars showing comparative values.
 *
 * Structure:
 * - x: Category or time period identifier (displayed on x-axis)
 * - y: Numeric value to be visualized as bar height (displayed on y-axis)
 *
 * In this example, the data shows varying performance metrics across 5 periods,
 * with values ranging from 122 to 257, demonstrating significant variance.
 */
const barChartData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

/**
 * Table Data Generation
 *
 * Generates sample data for the administration dashboard table.
 * Creates an array of 12 items, each representing a row in the table.
 * In a real application, this data would come from an API or database.
 *
 * Each item contains:
 * - id: Unique identifier for the row (used for selection and React keys)
 * - col1-col7: Seven columns of data (placeholder values in this demo)
 *
 * Array.from() is used to create exactly 12 rows with consistent structure.
 * The second parameter is a mapping function that generates each item.
 */
const tableItems = Array.from({ length: 12 }, (_, i) => ({
  id: `item-${i + 1}`,
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

/**
 * Table Column Definitions
 *
 * Defines the structure and behavior of each column in the data table.
 * Each column definition specifies how data should be displayed and sorted.
 *
 * Properties:
 * - id: Unique identifier for the column (must match data field name)
 * - header: Display text shown in the column header
 * - cell: Function that extracts and formats the cell value from the row item
 * - sortingField: Field name used when sorting this column
 *
 * In this configuration, all 7 columns follow the same pattern,
 * displaying string values with sortable headers.
 */
const columnDefinitions = [
  {
    id: 'col1',
    header: 'Column header',
    cell: (item: any) => item.col1,
    sortingField: 'col1',
  },
  {
    id: 'col2',
    header: 'Column header',
    cell: (item: any) => item.col2,
    sortingField: 'col2',
  },
  {
    id: 'col3',
    header: 'Column header',
    cell: (item: any) => item.col3,
    sortingField: 'col3',
  },
  {
    id: 'col4',
    header: 'Column header',
    cell: (item: any) => item.col4,
    sortingField: 'col4',
  },
  {
    id: 'col5',
    header: 'Column header',
    cell: (item: any) => item.col5,
    sortingField: 'col5',
  },
  {
    id: 'col6',
    header: 'Column header',
    cell: (item: any) => item.col6,
    sortingField: 'col6',
  },
  {
    id: 'col7',
    header: 'Column header',
    cell: (item: any) => item.col7,
    sortingField: 'col7',
  },
];

/**
 * Administration Dashboard Component
 *
 * Main component for the administration dashboard page.
 * Displays a comprehensive view with:
 * - Breadcrumb navigation
 * - Page header with refresh action
 * - Search functionality
 * - Pagination controls
 * - Dual chart visualizations (Area Chart and Bar Chart)
 * - Data table with multi-select capability
 *
 * State Management:
 * - searchValue: Current text in the search input field
 * - currentPageIndex: Active page number for pagination (1-based indexing)
 * - selectedItems: Array of currently selected table rows
 */
export function App() {
  // Search input state - stores the filter text entered by user
  const [searchValue, setSearchValue] = useState('');

  // Pagination state - tracks which page of results is currently displayed
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  // Table selection state - maintains list of selected rows for bulk actions
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    // AppLayout provides the main page structure with header, navigation, and content areas
    <AppLayout
      // Breadcrumb navigation showing hierarchical path: Service > Administrative Dashboard
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      // Hide side navigation panel (not needed for this dashboard view)
      navigationHide
      // Hide tools/help panel (not needed for this dashboard view)
      toolsHide
      // Main content area containing the dashboard layout
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Collection description"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/*
              Search and Pagination Controls Section

              Responsive grid layout containing:
              - Left side (8/12 cols on small+ screens): Search input for filtering data
              - Right side (4/12 cols on small+ screens): Pagination controls and settings button

              On mobile (default), both sections stack vertically (12/12 cols each)
            */}
            <Grid gridDefinition={[{ colspan: { default: 12, s: 8 } }, { colspan: { default: 12, s: 4 } }]}>
              <Input
                type="search"
                placeholder="Placeholder"
                value={searchValue}
                onChange={({ detail }) => setSearchValue(detail.value)}
              />
              <Box textAlign="right">
                <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                  />
                  <Button iconName="settings" variant="icon" />
                </SpaceBetween>
              </Box>
            </Grid>

            {/*
              Data Visualization Charts Section

              Two-column responsive layout displaying complementary chart visualizations:
              - Left column: Area Chart showing multi-series trend data over time
              - Right column: Bar Chart showing comparative metric values

              On mobile/tablet (default to small), charts stack vertically (12/12 cols each)
              On medium+ screens, charts display side-by-side (6/12 cols each)
            */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container>
                {/*
                  Area Chart Configuration

                  Displays stacked area chart with two data series (Site 1 and Site 2).
                  - series: Data array defined above with two site performance metrics
                  - xDomain: All 12 time periods to display on x-axis
                  - yDomain: Y-axis range from 0 to 6 to accommodate all data points
                */}
                <AreaChart
                  series={areaChartData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    xAxisLabel: 'X-axis label',
                    yAxisLabel: 'y-axis label',
                    filterLabel: 'Filter data',
                    filterPlaceholder: 'Filter data',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value: any) => value,
                    yTickFormatter: (value: number) => `y${Math.round(value)}`,
                  }}
                  ariaLabel="Area chart"
                  height={300}
                  hideFilter
                  xScaleType="categorical"
                  yTitle="y-axis label"
                  xTitle="X-axis label"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>

              <Container>
                {/*
                  Bar Chart Configuration

                  Displays vertical bar chart with a single data series.
                  - series: Single data series with 5 data points showing varying values
                  - xDomain: 5 categories/time periods on x-axis
                  - yDomain: Y-axis range from 0 to 300 to accommodate highest value (257)
                  - valueFormatter: Converts numeric values to strings for display
                */}
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: barChartData,
                      valueFormatter: (value: number) => value.toString(),
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    xAxisLabel: 'X-axis label',
                    yAxisLabel: 'y-axis label',
                    filterLabel: 'Filter data',
                    filterPlaceholder: 'Filter data',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value: any) => value,
                    yTickFormatter: (value: number) => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Bar chart"
                  height={300}
                  hideFilter
                  xScaleType="categorical"
                  yTitle="y-axis label"
                  xTitle="X-axis label"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            {/*
              Data Table Section

              Displays tabular data with the following features:
              - Multi-row selection: Users can select multiple rows for bulk actions
              - 7 columns: Each column is sortable and displays cell values
              - 12 rows: Generated sample data (would be dynamic in production)
              - Full-page variant: Table uses available width for better readability

              State management:
              - selectedItems tracks which rows are currently selected
              - onSelectionChange updates state when user selects/deselects rows
            */}
            <Table
              columnDefinitions={columnDefinitions}
              items={tableItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
                },
                tableLabel: 'Administration data table',
              }}
              header={
                <Header counter={`(${tableItems.length})`} variant="h2">
                  Data
                </Header>
              }
              variant="full-page"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
