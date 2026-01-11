// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Administration Dashboard
 *
 * This component implements a comprehensive admin dashboard with:
 * - Top navigation with search and user utilities
 * - Real-time data visualization through charts
 * - Interactive data table with filtering and pagination
 * - Responsive layout that adapts to different screen sizes
 */

import React, { useState } from 'react';

// Navigation and Layout Components
import TopNavigation from '@cloudscape-design/components/top-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';

// Interactive Components
import Button from '@cloudscape-design/components/button';
import Input from '@cloudscape-design/components/input';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

// Data Visualization Components
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';

/**
 * Area Chart Data Configuration
 *
 * Defines two data series (Site 1 and Site 2) with overlapping area charts
 * to show performance trends over time. Includes a threshold line to mark
 * the performance goal.
 *
 * Data points represent monthly performance metrics (x-axis: months 1-12)
 */
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.5 },
      { x: 3, y: 2.8 },
      { x: 4, y: 3.2 },
      { x: 5, y: 3.5 },
      { x: 6, y: 3.8 },
      { x: 7, y: 4.2 },
      { x: 8, y: 4.5 },
      { x: 9, y: 4.8 },
      { x: 10, y: 5.1 },
      { x: 11, y: 5.3 },
      { x: 12, y: 4.9 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)}`,
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 1.8 },
      { x: 2, y: 2.2 },
      { x: 3, y: 2.6 },
      { x: 4, y: 2.9 },
      { x: 5, y: 3.3 },
      { x: 6, y: 3.7 },
      { x: 7, y: 4.0 },
      { x: 8, y: 4.3 },
      { x: 9, y: 4.7 },
      { x: 10, y: 5.0 },
      { x: 11, y: 5.2 },
      { x: 12, y: 4.8 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)}`,
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
    valueFormatter: (value: number) => `${value.toFixed(1)}`,
  },
];

/**
 * Bar Chart Data Configuration
 *
 * Displays vertical bar chart data for a single site across 5 data points.
 * Includes a horizontal threshold line to indicate the performance goal.
 *
 * Useful for comparing discrete values across different categories.
 */
const barChartSeries = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 'x1', y: 183 },
      { x: 'x2', y: 257 },
      { x: 'x3', y: 213 },
      { x: 'x4', y: 122 },
      { x: 'x5', y: 210 },
    ],
    valueFormatter: (value: number) => `${value}`,
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 200,
    valueFormatter: (value: number) => `${value}`,
  },
];

/**
 * Generate Mock Table Data
 *
 * Creates sample data for the administration table with 12 rows.
 * Each row contains 7 columns of placeholder data.
 *
 * In a production environment, this would be replaced with actual
 * API calls to fetch real administrative data.
 *
 * @returns {Array} Array of table items with id and column values
 */
const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      id: `item-${i}`,
      column1: 'Cell Value',
      column2: 'Cell Value',
      column3: 'Cell Value',
      column4: 'Cell Value',
      column5: 'Cell Value',
      column6: 'Cell Value',
      column7: 'Cell Value',
    });
  }
  return data;
};

/**
 * Administration Dashboard Component
 *
 * Main component that renders the complete dashboard interface including:
 * - Top navigation with search and utilities
 * - Breadcrumb navigation
 * - Page header with actions
 * - Data visualization charts (area and bar)
 * - Interactive data table with filtering and pagination
 */
export function App() {
  // State Management

  /** Search input value for top navigation search bar */
  const [searchValue, setSearchValue] = useState('');

  /** Filter text for table data filtering */
  const [filteringText, setFilteringText] = useState('');

  /** Currently selected table rows for bulk actions */
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  /** Current page number for table pagination (1-indexed) */
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  /** Loading state for refresh data button */
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data Processing

  /** Generate the full dataset (in production, this would come from an API) */
  const tableData = generateTableData();

  /**
   * Filter table data based on user's search input
   * Searches across all column values for matches
   */
  const filteredItems = tableData.filter(item =>
    Object.values(item).some(value => String(value).toLowerCase().includes(filteringText.toLowerCase())),
  );

  /** Number of rows to display per page */
  const itemsPerPage = 10;

  /**
   * Slice filtered data to show only items for current page
   * Calculates the start and end indices based on current page number
   */
  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  /**
   * Handle Refresh Data Action
   *
   * Simulates a data refresh operation with loading state.
   * In production, this would trigger an API call to fetch fresh data.
   *
   * Shows loading indicator for 1 second to simulate network request.
   */
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="admin-dashboard">
      {/*
        Top Navigation Bar

        Provides global navigation with:
        - Service branding and logo
        - Global search functionality
        - Utility controls (notifications, settings, user profile)
        - External link to related resources
      */}
      <TopNavigation
        identity={{
          href: '/',
          title: 'Service name',
          logo: {
            src: '',
            alt: 'Logo',
          },
        }}
        search={
          <Input
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={({ detail }) => setSearchValue(detail.value)}
            ariaLabel="Search"
          />
        }
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#',
            iconName: 'external',
            iconAlign: 'right',
          },
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
          },
          {
            type: 'button',
            iconName: 'settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            iconName: 'user-profile',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'settings', text: 'Settings' },
              { id: 'signout', text: 'Sign out' },
            ],
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
        }}
      />

      {/*
        Main Dashboard Content Area

        Contains all dashboard elements with consistent spacing.
        Responsive padding adjusts based on screen size (see admin-dashboard.scss).
      */}
      <div className="dashboard-content">
        <SpaceBetween size="l">
          {/*
            Breadcrumb Navigation

            Shows the user's location in the application hierarchy.
            Helps users understand context and navigate back to parent pages.
          */}
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '/' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />

          {/*
            Page Header

            Displays the main page title, descriptive text, and primary actions.
            The "Refresh Data" button allows users to manually update dashboard data.
          */}
          <Header
            variant="h1"
            description="Collection description"
            actions={
              <Button
                variant="primary"
                iconName="external"
                iconAlign="right"
                loading={isRefreshing}
                onClick={handleRefresh}
              >
                Refresh Data
              </Button>
            }
          >
            Administration Dashboard
          </Header>

          {/*
            Search and Pagination Controls

            Two-column responsive layout:
            - Left: Text filter for searching table data
            - Right: Pagination controls with settings button

            On mobile (< xs breakpoint), columns stack vertically.
          */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xxs: 12, xs: 6 } },
              { colspan: { default: 12, xxs: 12, xs: 6 } },
            ]}
          >
            {/*
              Table Search Filter

              Allows users to filter table data by typing search terms.
              Resets pagination to page 1 when filter changes.
            */}
            <TextFilter
              filteringText={filteringText}
              filteringPlaceholder="Placeholder"
              filteringAriaLabel="Filter items"
              onChange={({ detail }) => {
                setFilteringText(detail.filteringText);
                setCurrentPageIndex(1);
              }}
            />
            {/*
              Pagination and Settings Controls

              Right-aligned group containing:
              - Page navigation controls
              - Visual divider
              - Settings button for table preferences
            */}
            <div className="pagination-controls">
              {/*
                Pagination Component

                Allows navigation between table pages.
                Shows current page and total page count.
              */}
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={5}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
              />
              {/* Visual divider between pagination and settings */}
              <div className="divider" />

              {/* Settings button for table configuration (e.g., column visibility, page size) */}
              <Button iconName="settings" variant="icon" ariaLabel="Settings" />
            </div>
          </Grid>

          {/*
            Data Visualization Charts Section

            Two-column responsive grid layout:
            - Desktop/Tablet (≥m): Charts displayed side-by-side (50% width each)
            - Mobile (<m): Charts stack vertically (100% width each)

            Both charts are wrapped in Container components for consistent styling.
          */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
            ]}
          >
            {/*
              Area Chart - Site Performance Trends

              Visualizes performance trends for two sites over 12 time periods.
              Includes a threshold line to indicate the performance goal.

              Features:
              - Stacked area visualization for easy comparison
              - Interactive legend for toggling series visibility
              - Labeled axes with custom formatters
            */}
            <Container>
              <AreaChart
                series={areaChartSeries}
                height={300}
                xTitle="X-axis label"
                yTitle="y-axis label"
                xScaleType="linear"
                yScaleType="linear"
                ariaLabel="Area chart showing site performance"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xTickFormatter: (value: number) => `x${value}`,
                  yTickFormatter: (value: number) => `y${value}`,
                }}
              />
            </Container>

            {/*
              Bar Chart - Site Metrics Comparison

              Displays discrete values across 5 categories for a single site.
              Useful for comparing performance across different metrics or time periods.

              Features:
              - Vertical bars for easy value comparison
              - Threshold line marking target performance
              - Categorical x-axis with linear y-axis scale
            */}
            <Container>
              <BarChart
                series={barChartSeries}
                height={360}
                xTitle="X-axis label"
                yTitle="y-axis label"
                xScaleType="categorical"
                yScaleType="linear"
                ariaLabel="Bar chart showing site metrics"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  yTickFormatter: (value: number) => `y${value}`,
                }}
              />
            </Container>
          </Grid>

          {/*
            Administrative Data Table

            Interactive table displaying administrative records with:
            - Multi-select functionality for bulk actions
            - 7 sortable columns
            - Pagination (10 items per page)
            - Search/filter integration
            - Empty state messaging

            Features:
            - Row selection with checkboxes
            - Column sorting (click headers)
            - Responsive layout
            - Accessibility labels for screen readers
          */}
          <Table
            columnDefinitions={[
              /**
               * Column 1 Definition
               *
               * Defines the first column with:
               * - Unique ID for referencing
               * - Header text displayed at top of column
               * - Cell renderer function to display data
               * - Sorting field for enabling sort functionality
               */
              {
                id: 'column1',
                header: 'Column header',
                cell: item => item.column1,
                sortingField: 'column1',
              },
              {
                id: 'column2',
                header: 'Column header',
                cell: item => item.column2,
                sortingField: 'column2',
              },
              {
                id: 'column3',
                header: 'Column header',
                cell: item => item.column3,
                sortingField: 'column3',
              },
              {
                id: 'column4',
                header: 'Column header',
                cell: item => item.column4,
                sortingField: 'column4',
              },
              {
                id: 'column5',
                header: 'Column header',
                cell: item => item.column5,
                sortingField: 'column5',
              },
              {
                id: 'column6',
                header: 'Column header',
                cell: item => item.column6,
                sortingField: 'column6',
              },
              {
                id: 'column7',
                header: 'Column header',
                cell: item => item.column7,
                sortingField: 'column7',
              },
            ]}
            // Data and interaction props
            items={paginatedItems} // Current page of filtered/paginated data
            selectionType="multi" // Enable multi-row selection with checkboxes
            selectedItems={selectedItems} // Currently selected rows
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)} // Update selection state
            trackBy="id" // Unique identifier for each row (optimization)
            sortingDisabled={false} // Allow column sorting
            // Empty state displayed when no data matches filters
            empty={
              <Box textAlign="center" color="inherit">
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  <b>No data</b>
                </Box>
                <Box variant="p" color="inherit">
                  No data available to display
                </Box>
              </Box>
            }
            /**
             * Accessibility Labels
             *
             * Provides screen reader-friendly labels for table interactions.
             * These labels help users with assistive technologies understand
             * the table structure and selection state.
             */
            ariaLabels={{
              // Label for the selection column
              selectionGroupLabel: 'Items selection',

              // Label for the "select all" checkbox in header
              allItemsSelectionLabel: () => 'select all',

              // Dynamic label for each row's selection checkbox
              // Announces whether the specific item is selected or not
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
              },
            }}
          />
        </SpaceBetween>
      </div>
    </div>
  );
}
