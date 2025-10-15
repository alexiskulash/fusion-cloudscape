// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Admin Dashboard Application
 * 
 * This component implements a comprehensive administrative dashboard that demonstrates
 * the use of Cloudscape Design System components including:
 * - Data visualization with area and bar charts
 * - Interactive data tables with filtering, sorting, and pagination
 * - Responsive grid layouts
 * - Navigation and breadcrumb components
 * - Alert banners for user notifications
 * 
 * The dashboard is designed to showcase typical cloud application patterns
 * for data monitoring and management interfaces.
 */

import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Core layout and navigation components
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';

// UI controls and interactive elements
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Alert from '@cloudscape-design/components/alert';

// Layout and container components
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

// Data visualization components
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';

/**
 * Generate sample data for the area chart visualization
 * 
 * Creates two data series representing different sites and a performance threshold:
 * - Site 1: Random data points between 50-90
 * - Site 2: Random data points between 30-80  
 * - Performance goal: Fixed threshold at 60
 * 
 * @returns Array of chart series objects with data points and configuration
 */
const generateAreaChartData = () => {
  const xLabels = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
  
  return [
    {
      title: 'Site 1',
      type: 'area',
      // Generate random data points for demonstration purposes
      data: xLabels.map((x, i) => ({ x, y: 50 + Math.random() * 40 })),
      valueFormatter: (value: number) => value.toFixed(0),
    },
    {
      title: 'Site 2', 
      type: 'area',
      // Generate random data points with different range
      data: xLabels.map((x, i) => ({ x, y: 30 + Math.random() * 50 })),
      valueFormatter: (value: number) => value.toFixed(0),
    },
    {
      title: 'Performance goal',
      type: 'threshold', // Horizontal line showing target performance
      y: 60,
      valueFormatter: (value: number) => value.toFixed(0),
    },
  ];
};

/**
 * Generate sample data for the bar chart visualization
 * 
 * Creates a simple dataset with 5 data points representing
 * different categories with varying values for demonstration.
 * 
 * @returns Array of objects with x (category) and y (value) properties
 */
const generateBarChartData = () => {
  return [
    { x: 'x1', y: 45 },
    { x: 'x2', y: 65 },
    { x: 'x3', y: 55 },
    { x: 'x4', y: 30 },
    { x: 'x5', y: 52 },
  ];
};

/**
 * Generate sample tabular data for the data table
 * 
 * Creates 13 rows of mock data with 7 columns each.
 * Each row contains identical "Cell Value" text for demonstration purposes.
 * In a real application, this would contain actual business data.
 * 
 * @returns Array of row objects with id and column data
 */
const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 13; i++) {
    data.push({
      id: `row-${i}`, // Unique identifier for each row
      col1: 'Cell Value',
      col2: 'Cell Value', 
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }
  return data;
};

/**
 * Table column configuration
 * 
 * Defines the structure and behavior of each column in the data table:
 * - id: Unique identifier for the column
 * - header: Display text in the column header
 * - cell: Function to render cell content from row data
 * - sortingField: Field used for sorting operations
 * 
 * Each column is configured to be sortable and display the corresponding
 * property from the row data object.
 */
const COLUMN_DEFINITIONS = [
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
 * Main Admin Dashboard Application Component
 * 
 * This is the primary component that orchestrates the entire dashboard interface.
 * It manages state for charts, table data, and UI interactions while providing
 * a comprehensive administrative interface.
 * 
 * Key features:
 * - Responsive layout with navigation breadcrumbs
 * - Dismissible alert banner for notifications
 * - Side-by-side chart visualizations
 * - Interactive data table with search and pagination
 * - Consistent spacing and styling using Cloudscape components
 */
export function App() {
  // Chart data state - generated once on component mount
  const [areaChartData] = useState(generateAreaChartData());
  const [barChartData] = useState(generateBarChartData());
  const [tableData] = useState(generateTableData());
  
  // UI state for controlling alert banner visibility
  const [showBanner, setShowBanner] = useState(true);

  /**
   * useCollection hook configuration
   * 
   * Provides comprehensive table functionality including:
   * - Filtering: Search through table data
   * - Pagination: Break data into manageable pages (10 items per page)
   * - Sorting: Allow column-based data sorting
   * - Selection: Enable multi-row selection
   * 
   * Returns props and handlers that can be spread into Table components
   * for consistent behavior across the application.
   */
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      filtering: {
        // Message displayed when no data is available
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No data</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No data to display.
            </Box>
          </Box>
        ),
        // Message displayed when search returns no results
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              We cannot find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 }, // Show 10 rows per page
      sorting: {}, // Enable sorting on all sortable columns
      selection: {}, // Enable multi-row selection
    },
  );

  return (
    <AppLayout
      // Hide navigation sidebar and tools panel for focused dashboard view
      navigationHide
      toolsHide
      
      // Breadcrumb navigation showing current location in application hierarchy
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/admin-dashboard' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      
      content={
        <ContentLayout
          // Page header with title, description, and primary action
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
          {/* Main content area with consistent vertical spacing */}
          <SpaceBetween size="l">
            
            {/* Filter and pagination controls container */}
            <Container
              header={
                <Grid gridDefinition={[{ colspan: { default: 12, s: 8 } }, { colspan: { default: 12, s: 4 } }]}>
                  {/* Search/filter input - takes up most of the width */}
                  <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter data"
                  />
                  
                  {/* Pagination and settings controls - aligned to the right */}
                  <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                      <Pagination
                        {...paginationProps}
                        ariaLabels={{
                          nextPageLabel: 'Next page',
                          previousPageLabel: 'Previous page',
                          pageLabel: (pageNumber) => `Page ${pageNumber}`,
                        }}
                      />
                      <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                    </SpaceBetween>
                  </Box>
                </Grid>
              }
            >
              <div />
            </Container>

            {/* Dismissible alert banner for user notifications */}
            {showBanner && (
              <Alert 
                type="info" 
                statusIconAriaLabel="Info" 
                dismissible 
                onDismiss={() => setShowBanner(false)}
              >
                Demo environment: Metrics update every minute. Values may be delayed.
              </Alert>
            )}

            {/* Chart visualization section - two charts side by side */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              
              {/* Area chart container - shows multi-series data with threshold */}
              <Container>
                <AreaChart
                  series={areaChartData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => value.toString(),
                  }}
                  ariaLabel="Area chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  
                  // Empty state when no data is available
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  
                  // No match state when filters exclude all data
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

              {/* Bar chart container - shows single series categorical data */}
              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: barChartData,
                      valueFormatter: (value: number) => value.toFixed(0),
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => value.toString(),
                  }}
                  ariaLabel="Bar chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  
                  // Empty state when no data is available
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  
                  // No match state when filters exclude all data
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

            {/* Data table section - interactive table with full CRUD operations */}
            <Table
              {...collectionProps} // Spread collection props for filtering, sorting, selection
              columnDefinitions={COLUMN_DEFINITIONS}
              items={items} // Filtered and paginated items from useCollection
              selectionType="multi" // Allow multiple row selection
              variant="container" // Table styling variant
              stickyHeader // Keep header visible during scroll
              resizableColumns // Allow column width adjustment
              
              // Accessibility labels for screen readers
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) => item.id,
              }}
              
              // Pagination controls at bottom of table
              pagination={<Pagination {...paginationProps} />}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
