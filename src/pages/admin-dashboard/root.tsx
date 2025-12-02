// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Administration Dashboard Component
 * 
 * This module implements a comprehensive admin dashboard with the following features:
 * - Real-time data visualization using area and bar charts
 * - Interactive data table with filtering, sorting, and pagination
 * - Responsive grid layout that adapts to different screen sizes
 * - Alert banner for system notifications
 * 
 * The dashboard follows the Cloudscape Design System patterns and provides
 * a complete example of dashboard layout with navigation, tools panel, and data displays.
 */

import React, { useRef, useState } from 'react';

// Collection hooks for managing table data (filtering, sorting, pagination, selection)
import { useCollection } from '@cloudscape-design/collection-hooks';

// Type definitions for AppLayout component reference
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

// Cloudscape UI components for data display and interaction
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Grid from '@cloudscape-design/components/grid';
import Alert from '@cloudscape-design/components/alert';

// Common components shared across the application
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';

// Shared chart configuration and utilities
import { commonChartProps } from '../dashboard/widgets/chart-commons';

// Base styles for the application
import '../../styles/base.scss';

/**
 * Generates mock table data for demonstration purposes
 * 
 * Creates an array of 12 items, each with 7 columns of placeholder data.
 * In a production environment, this would be replaced with actual data fetching logic.
 * 
 * @returns {Array} Array of table row objects with id and column values
 */
const generateTableData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      id: `item-${i + 1}`,
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
 * Area Chart Data Configuration
 * 
 * Defines the series data for the area chart visualization.
 * Includes two data series (Site 1 and Site 2) showing performance trends,
 * plus a threshold line representing the performance goal.
 * 
 * The data pattern matches the original Figma design specifications.
 * Each data point consists of an x-value (time/category) and y-value (metric).
 */
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 2.8 },
      { x: 2, y: 3.2 },
      { x: 3, y: 3.8 },
      { x: 4, y: 4.2 },
      { x: 5, y: 4.8 },
      { x: 6, y: 5.2 },
      { x: 7, y: 5.5 },
      { x: 8, y: 5.8 },
      { x: 9, y: 5.5 },
      { x: 10, y: 5.2 },
      { x: 11, y: 5.5 },
      { x: 12, y: 5.8 },
    ],
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 1.8 },
      { x: 2, y: 2.0 },
      { x: 3, y: 2.5 },
      { x: 4, y: 3.0 },
      { x: 5, y: 3.5 },
      { x: 6, y: 4.0 },
      { x: 7, y: 3.8 },
      { x: 8, y: 3.5 },
      { x: 9, y: 3.0 },
      { x: 10, y: 2.8 },
      { x: 11, y: 3.2 },
      { x: 12, y: 3.8 },
    ],
  },
  {
    // Threshold line representing the performance goal
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
  },
];

/**
 * Bar Chart Data Configuration
 * 
 * Defines the series data for the bar chart visualization.
 * Shows performance metrics across 5 data points with a threshold indicator.
 * 
 * The threshold line helps users quickly identify whether performance
 * meets the defined goal across different metrics.
 */
const barChartSeries = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 450 },
      { x: 2, y: 630 },
      { x: 3, y: 520 },
      { x: 4, y: 300 },
      { x: 5, y: 510 },
    ],
  },
  {
    // Performance goal threshold displayed as a horizontal line
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 450,
  },
];

/**
 * Table Column Definitions
 * 
 * Configures the columns for the data table, including:
 * - Column IDs for identification
 * - Header text displayed in the table
 * - Cell rendering function to extract data from row items
 * - Sorting field to enable column-based sorting
 * 
 * Each column definition follows the Cloudscape Table component API.
 * The 'any' type is used here for flexibility; in production, a proper
 * interface should define the exact structure of table items.
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
 * Props interface for AdminDashboardContent component
 * 
 * @property {any[]} tableData - Array of data items to display in the table
 */
interface AdminDashboardContentProps {
  tableData: any[];
}

/**
 * AdminDashboardContent Component
 * 
 * Renders the main content area of the admin dashboard, including:
 * - Page header with title, description, and action button
 * - Informational alert banner
 * - Responsive grid with area chart and bar chart
 * - Data table with filtering, sorting, pagination, and multi-select capabilities
 * 
 * This component uses the useCollection hook to manage table state and interactions,
 * providing a fully functional data table experience with minimal custom code.
 * 
 * @param {AdminDashboardContentProps} props - Component properties
 */
function AdminDashboardContent({ tableData }: AdminDashboardContentProps) {
  // Track currently selected items in the table
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  /**
   * useCollection hook manages table interactions and state:
   * - items: Current page of filtered/sorted items
   * - actions: Methods to control filtering, sorting, etc.
   * - filteredItemsCount: Number of items matching current filter
   * - collectionProps: Props to spread on the Table component
   * - filterProps: Props to spread on the TextFilter component
   * - paginationProps: Props to spread on the Pagination component
   */
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      // Filtering configuration
      filtering: {
        empty: <TableEmptyState resourceName="Item" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      // Pagination configuration - 10 items per page
      pagination: { pageSize: 10 },
      // Sorting configuration - default sort by first column
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[0] } },
      // Enable row selection
      selection: {},
    },
  );

  return (
    <SpaceBetween size="l">
      {/* Page Header with title, description, and primary action */}
      <Header
        variant="h1"
        description="Collection description"
        actions={
          <Button variant="primary" iconName="external" iconAlign="right">
            Refresh Data
          </Button>
        }
      >
        Adminstration Dashboard
      </Header>

      {/* Alert banner providing dashboard context and information */}
      <Alert type="info" dismissible header="Dashboard information">
        This dashboard displays real-time administrative data and performance metrics. Data is automatically refreshed
        every 5 minutes.
      </Alert>

      {/* Responsive grid layout for charts - stacks on mobile, side-by-side on larger screens */}
      <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
        {/* Area Chart Container */}
        <Container fitHeight>
          <AreaChart
            {...commonChartProps}
            series={areaChartSeries}
            height={300}
            xScaleType="linear"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Area chart showing data trends"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>

        {/* Bar Chart Container */}
        <Container fitHeight>
          <BarChart
            {...commonChartProps}
            series={barChartSeries}
            height={300}
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Bar chart showing performance metrics"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>
      </Grid>

      {/* Data Table with multi-select, filtering, sorting, and pagination */}
      <Table
        {...collectionProps}
        selectionType="multi"
        header={
          <Header
            // Show selection count in header (e.g., "(2/12)" when 2 items selected)
            counter={selectedItems.length ? `(${selectedItems.length}/${tableData.length})` : `(${tableData.length})`}
          >
            Data
          </Header>
        }
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Placeholder"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        }
        pagination={<Pagination {...paginationProps} />}
        empty={
          // Empty state shown when table has no data
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}

/**
 * AdminDashboard Component (Main Export)
 * 
 * The root component for the administration dashboard page.
 * Implements the full page layout using CustomAppLayout, which includes:
 * - Navigation sidebar with active page highlighting
 * - Breadcrumb navigation
 * - Tools panel for contextual help
 * - Notification area
 * - Main content area with the dashboard content
 * 
 * This component manages the layout-level state (tools panel open/closed)
 * and passes the content to the layout wrapper.
 * 
 * @returns {JSX.Element} The complete admin dashboard page
 */
export default function AdminDashboard() {
  // Track whether the help/tools panel is open
  const [toolsOpen, setToolsOpen] = useState(false);

  // Reference to the AppLayout component for programmatic control
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  // Generate mock table data (in production, this would be fetched from an API)
  const tableData = generateTableData();

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="table"
      content={<AdminDashboardContent tableData={tableData} />}
      breadcrumbs={
        // Breadcrumb navigation showing: Service > Administrative Dashboard
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/admin-dashboard' },
          ]}
        />
      }
      navigation={
        // Side navigation with current page highlighted
        <Navigation activeHref="#/admin-dashboard" />
      }
      tools={
        // Help panel content displayed when tools panel is open
        <Box padding="l">
          <SpaceBetween size="l">
            <div>
              <Box variant="h3">Administration Dashboard</Box>
              <Box variant="p">View and manage administrative data with charts and detailed tables.</Box>
            </div>
          </SpaceBetween>
        </Box>
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
