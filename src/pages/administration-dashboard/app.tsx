// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

/**
 * Area chart data configuration
 * 
 * This defines a multi-series area chart with:
 * - Two data series (Site 1 and Site 2) showing performance metrics over 12 time periods
 * - A horizontal threshold line at y=85 representing the performance goal
 * 
 * Data structure:
 * - type: 'area' for data series, 'threshold' for reference lines
 * - title: Series name displayed in the legend
 * - data: Array of {x, y} coordinate pairs
 * - y: Threshold value (for threshold type only)
 */
const AREA_CHART_DATA = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 95 },
      { x: 2, y: 85 },
      { x: 3, y: 90 },
      { x: 4, y: 88 },
      { x: 5, y: 92 },
      { x: 6, y: 96 },
      { x: 7, y: 100 },
      { x: 8, y: 98 },
      { x: 9, y: 102 },
      { x: 10, y: 95 },
      { x: 11, y: 105 },
      { x: 12, y: 98 },
    ],
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 62 },
      { x: 2, y: 68 },
      { x: 3, y: 75 },
      { x: 4, y: 78 },
      { x: 5, y: 82 },
      { x: 6, y: 85 },
      { x: 7, y: 88 },
      { x: 8, y: 86 },
      { x: 9, y: 80 },
      { x: 10, y: 73 },
      { x: 11, y: 65 },
      { x: 12, y: 62 },
    ],
  },
  // Horizontal threshold line showing the performance goal across all x values
  { type: 'threshold' as const, title: 'Performance goal', y: 85 },
];

/**
 * Bar chart data configuration
 * 
 * This defines a vertical bar chart with:
 * - One data series (Site 1) with 5 categorical data points
 * - A horizontal threshold line at y=150 representing the performance goal
 * 
 * Important: Uses categorical x-axis with string values ('x1', 'x2', etc.)
 * to ensure proper bar rendering and positioning
 */
const BAR_CHART_DATA = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 'x1', y: 183 }, // Bar 1: 183 units
      { x: 'x2', y: 257 }, // Bar 2: 257 units (highest)
      { x: 'x3', y: 213 }, // Bar 3: 213 units
      { x: 'x4', y: 122 }, // Bar 4: 122 units (lowest)
      { x: 'x5', y: 210 }, // Bar 5: 210 units
    ],
  },
  // Horizontal threshold line at y=150 showing the performance goal
  { type: 'threshold' as const, title: 'Performance goal', y: 150 },
];

/**
 * Sample table data
 * 
 * Generates 12 rows of placeholder data for demonstration purposes.
 * Each row contains:
 * - id: Unique identifier for the row
 * - col1-col7: Seven columns with 'Cell Value' as placeholder text
 * 
 * In a real application, this would be replaced with actual data
 * fetched from an API or database.
 */
const TABLE_ITEMS = Array.from({ length: 12 }, (_, i) => ({
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
 * Table column definitions
 * 
 * Defines the structure and behavior of each column in the data table:
 * - id: Unique identifier for the column
 * - header: Column header text displayed in the table
 * - cell: Function that extracts and formats the cell value from the row data
 * - sortingField: Field name used for sorting functionality
 * 
 * All columns are sortable and follow the same pattern for consistency.
 */
const COLUMN_DEFINITIONS = [
  {
    id: 'col1',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col1,
    sortingField: 'col1',
  },
  {
    id: 'col2',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col2,
    sortingField: 'col2',
  },
  {
    id: 'col3',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col3,
    sortingField: 'col3',
  },
  {
    id: 'col4',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col4,
    sortingField: 'col4',
  },
  {
    id: 'col5',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col5,
    sortingField: 'col5',
  },
  {
    id: 'col6',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col6,
    sortingField: 'col6',
  },
  {
    id: 'col7',
    header: 'Column header',
    cell: (item: (typeof TABLE_ITEMS)[0]) => item.col7,
    sortingField: 'col7',
  },
];

/**
 * Administration Dashboard Component
 * 
 * Main dashboard page that displays:
 * 1. Page header with title, description, and refresh action
 * 2. Two side-by-side charts (area chart and bar chart) in a responsive grid
 * 3. Data table with filtering, pagination, and multi-select capabilities
 * 
 * State management:
 * - filterText: Stores the current text filter value for the table
 * - currentPageIndex: Tracks the active page in the pagination
 * - selectedItems: Maintains the list of selected table rows
 */
export function App() {
  // Table filter state - used for searching/filtering table rows
  const [filterText, setFilterText] = useState('');
  
  // Pagination state - tracks which page is currently displayed (1-based index)
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  
  // Multi-select state - stores array of currently selected table items
  const [selectedItems, setSelectedItems] = useState<typeof TABLE_ITEMS>([]);

  return (
    <CustomAppLayout
      content={
        <ContentLayout
          header={
            // Page header with title, description, and primary action button
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
            {/* Two-column responsive grid for side-by-side charts */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              {/* Left column: Area Chart */}
              <Container>
                <AreaChart
                  series={AREA_CHART_DATA}
                  height={300}
                  xScaleType="linear" // Linear scale for numeric x-axis values (1-12)
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Area chart showing performance data"
                  legendTitle="Legend"
                  hideFilter={false} // Show series filter dropdown
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    // Format axis tick labels (e.g., "1" becomes "x1")
                    xTickFormatter: value => `x${value}`,
                    yTickFormatter: value => `y${value}`,
                  }}
                />
              </Container>
              
              {/* Right column: Bar Chart */}
              <Container>
                <BarChart
                  series={BAR_CHART_DATA}
                  height={300}
                  xScaleType="categorical" // Categorical scale for string x-axis values
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Bar chart showing metrics data"
                  legendTitle="Legend"
                  hideFilter={false} // Show series filter dropdown
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                  }}
                />
              </Container>
            </Grid>
            
            {/* Data table with multi-select, filtering, and pagination */}
            <Table
              columnDefinitions={COLUMN_DEFINITIONS}
              items={TABLE_ITEMS}
              selectionType="multi" // Enable checkbox selection for multiple rows
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              header={
                <Header
                  // Show count of selected items or total items in header
                  counter={
                    selectedItems.length ? `(${selectedItems.length}/${TABLE_ITEMS.length})` : `(${TABLE_ITEMS.length})`
                  }
                >
                  Data
                </Header>
              }
              filter={
                // Search/filter input above the table
                <TextFilter
                  filteringText={filterText}
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                  filteringPlaceholder="Placeholder"
                />
              }
              pagination={
                // Pagination controls below the table
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5} // Total number of pages
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        // Breadcrumb navigation showing: Service > Administrative Dashboard
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/administration-dashboard' },
          ]}
        />
      }
      navigationHide // Hide side navigation panel
      toolsHide // Hide help/tools panel
    />
  );
}
