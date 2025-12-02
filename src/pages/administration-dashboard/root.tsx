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

// Sample data for charts
const areaChartData = [
  {
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
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
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
    valueFormatter: (value: number) => value.toFixed(1),
  },
];

const barChartData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Sample table data
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

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigationHide
      toolsHide
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
            {/* Search and Pagination Controls */}
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

            {/* Charts */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container>
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

            {/* Data Table */}
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
