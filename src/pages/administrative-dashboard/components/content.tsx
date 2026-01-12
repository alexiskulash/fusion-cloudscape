// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Sample data for the table
const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: `item-${i}`,
      col1: `Cell Value ${i}`,
      col2: `Cell Value ${i}`,
      col3: `Cell Value ${i}`,
      col4: `Cell Value ${i}`,
      col5: `Cell Value ${i}`,
      col6: `Cell Value ${i}`,
      col7: `Cell Value ${i}`,
    });
  }
  return data;
};

const allTableItems = generateTableData();

// Area chart data
const areaSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 2 },
      { x: 'x2', y: 3 },
      { x: 'x3', y: 3.5 },
      { x: 'x4', y: 4 },
      { x: 'x5', y: 4.5 },
      { x: 'x6', y: 5 },
      { x: 'x7', y: 5.5 },
      { x: 'x8', y: 5 },
      { x: 'x9', y: 4.5 },
      { x: 'x10', y: 3.5 },
      { x: 'x11', y: 3 },
      { x: 'x12', y: 2.5 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 1.5 },
      { x: 'x2', y: 2 },
      { x: 'x3', y: 2.8 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 3.8 },
      { x: 'x6', y: 4.2 },
      { x: 'x7', y: 4.5 },
      { x: 'x8', y: 4.8 },
      { x: 'x9', y: 5.2 },
      { x: 'x10', y: 5.5 },
      { x: 'x11', y: 5.8 },
      { x: 'x12', y: 6 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    valueFormatter: (value: number) => `y${value}`,
  },
];

// Bar chart data
const barSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 3.5 },
      { x: 'x2', y: 5 },
      { x: 'x3', y: 4 },
      { x: 'x4', y: 2.5 },
      { x: 'x5', y: 4 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
  },
];

export function DashboardContent() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Table columns
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

  // Use collection hooks for filtering, pagination, and sorting
  const { items, collectionProps, filterProps, paginationProps, filteredItemsCount } = useCollection(allTableItems, {
    filtering: {
      empty: (
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No items</b>
          </Box>
        </Box>
      ),
      noMatch: (
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No matches</b>
          </Box>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  return (
    <SpaceBetween size="l">
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

      {/* Charts Section */}
      <ColumnLayout columns={2} variant="default">
        <Container>
          <AreaChart
            series={areaSeries}
            height={300}
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Area chart showing site performance"
            legendTitle="Legend"
            hideFilter
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              xAxisAriaRoleDescription: 'x axis',
              yAxisAriaRoleDescription: 'y axis',
            }}
          />
        </Container>

        <Container>
          <BarChart
            series={barSeries}
            height={300}
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Bar chart showing site performance"
            legendTitle="Legend"
            hideFilter
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
              xAxisAriaRoleDescription: 'x axis',
              yAxisAriaRoleDescription: 'y axis',
            }}
          />
        </Container>
      </ColumnLayout>

      {/* Table Section */}
      <Table
        {...collectionProps}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        columnDefinitions={columnDefinitions}
        items={items}
        trackBy="id"
        header={
          <Header variant="h2" counter={`(${allTableItems.length})`}>
            Data Table
          </Header>
        }
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Placeholder"
            filteringAriaLabel="Filter items"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        }
        pagination={
          <Pagination
            {...paginationProps}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber}`,
            }}
          />
        }
        ariaLabels={{
          selectionGroupLabel: 'Items selection',
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
            return `${item.col1} is ${isItemSelected ? '' : 'not '}selected`;
          },
        }}
        variant="full-page"
        stickyHeader
      />
    </SpaceBetween>
  );
}
