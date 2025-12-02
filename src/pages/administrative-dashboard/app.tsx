// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Sample data for area chart
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 3.5 },
      { x: 3, y: 3.2 },
      { x: 4, y: 3.8 },
      { x: 5, y: 4.2 },
      { x: 6, y: 4.5 },
      { x: 7, y: 4.3 },
      { x: 8, y: 3.9 },
      { x: 9, y: 4.1 },
      { x: 10, y: 3.7 },
      { x: 11, y: 4.0 },
      { x: 12, y: 5.0 },
    ],
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.3 },
      { x: 3, y: 2.1 },
      { x: 4, y: 2.5 },
      { x: 5, y: 2.8 },
      { x: 6, y: 1.2 },
      { x: 7, y: 1.5 },
      { x: 8, y: 1.3 },
      { x: 9, y: 1.8 },
      { x: 10, y: 2.2 },
      { x: 11, y: 2.5 },
      { x: 12, y: 2.7 },
    ],
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
    valueFormatter: (value: number) => value.toFixed(1),
  },
];

// Sample data for bar chart
const barChartSeries = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 183 },
      { x: 2, y: 257 },
      { x: 3, y: 213 },
      { x: 4, y: 122 },
      { x: 5, y: 210 },
    ],
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 200,
  },
];

// Sample table data
const tableItems = Array.from({ length: 12 }, (_, index) => ({
  id: `item-${index + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

const columnDefinitions = [
  {
    id: 'column1',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column1,
    sortingField: 'column1',
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column2,
    sortingField: 'column2',
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column3,
    sortingField: 'column3',
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column4,
    sortingField: 'column4',
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column5,
    sortingField: 'column5',
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column6,
    sortingField: 'column6',
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column7,
    sortingField: 'column7',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState<typeof tableItems>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
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
              Adminstration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Search and Pagination Controls */}
            <Container>
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 6, s: 6, m: 6, l: 6, xl: 6 } },
                  { colspan: { default: 12, xs: 6, s: 6, m: 6, l: 6, xl: 6 } },
                ]}
              >
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter data"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '32px',
                      backgroundColor: '#414D5C',
                    }}
                  />
                  <Button variant="icon" iconName="settings" ariaLabel="Settings" />
                </div>
              </Grid>
            </Container>

            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              {/* Area Chart */}
              <Container>
                <AreaChart
                  series={areaChartSeries}
                  xDomain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  yDomain={[0, 6]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Area chart showing site performance"
                  ariaDescription="Area chart displaying performance metrics for two sites over 12 periods"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                />
              </Container>

              {/* Bar Chart */}
              <Container>
                <BarChart
                  series={barChartSeries}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 300]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Bar chart showing site metrics"
                  ariaDescription="Bar chart displaying performance metrics across 5 periods"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                />
              </Container>
            </Grid>

            {/* Data Table */}
            <Table
              columnDefinitions={columnDefinitions}
              items={tableItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                  return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
                },
                allItemsSelectionLabel: ({ selectedItems }) => `${selectedItems.length} items selected`,
              }}
              variant="container"
              stickyHeader
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
