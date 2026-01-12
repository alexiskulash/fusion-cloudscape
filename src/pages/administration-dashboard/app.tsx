// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
  TextFilter,
  Pagination,
  AreaChart,
  BarChart,
  Table,
  Box,
} from '@cloudscape-design/components';

import '../../styles/administration-dashboard.scss';

// Mock data for the table
const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    col1: 'Cell Value',
    col2: 'Cell Value',
    col3: 'Cell Value',
    col4: 'Cell Value',
    col5: 'Cell Value',
    col6: 'Cell Value',
    col7: 'Cell Value',
  }));
};

const allTableItems = generateMockData(50);

// Mock data for Area Chart
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3.5 },
      { x: 4, y: 4 },
      { x: 5, y: 4.5 },
      { x: 6, y: 5 },
      { x: 7, y: 5.5 },
      { x: 8, y: 5 },
      { x: 9, y: 4.5 },
      { x: 10, y: 5 },
      { x: 11, y: 5.5 },
      { x: 12, y: 5 },
    ],
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 1.5 },
      { x: 3, y: 2 },
      { x: 4, y: 2.5 },
      { x: 5, y: 3 },
      { x: 6, y: 3.5 },
      { x: 7, y: 3.8 },
      { x: 8, y: 4 },
      { x: 9, y: 4.2 },
      { x: 10, y: 4.5 },
      { x: 11, y: 4.8 },
      { x: 12, y: 4.5 },
    ],
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
  },
];

// Mock data for Bar Chart
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
  },
];

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const itemsPerPage = 10;

  // Filter table items
  const filteredItems = allTableItems.filter(item =>
    Object.values(item).some(value => String(value).toLowerCase().includes(filteringText.toLowerCase())),
  );

  // Paginate filtered items
  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const tableColumns = [
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

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
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
            {/* Charts Section */}
            <div className="charts-grid">
              {/* Area Chart */}
              <Container className="chart-container">
                <SpaceBetween size="m">
                  <Box variant="h3" fontWeight="bold">
                    y-axis label
                  </Box>
                  <AreaChart
                    series={areaChartSeries}
                    height={300}
                    xScaleType="linear"
                    yScaleType="linear"
                    xDomain={[1, 12]}
                    yDomain={[0, 6]}
                    xTitle="X-axis label"
                    yTitle=""
                    ariaLabel="Area chart showing site performance"
                    hideFilter
                    hideLegend={false}
                    i18nStrings={{
                      filterLabel: 'Filter',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                  />
                </SpaceBetween>
              </Container>

              {/* Bar Chart */}
              <Container className="chart-container">
                <SpaceBetween size="m">
                  <Box variant="h3" fontWeight="bold">
                    y-axis label
                  </Box>
                  <BarChart
                    series={barChartSeries}
                    height={300}
                    xScaleType="categorical"
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 300]}
                    xTitle="X-axis label"
                    yTitle=""
                    ariaLabel="Bar chart showing site metrics"
                    hideFilter
                    hideLegend={false}
                    i18nStrings={{
                      filterLabel: 'Filter',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                  />
                </SpaceBetween>
              </Container>
            </div>

            {/* Table Section */}
            <Table
              columnDefinitions={tableColumns}
              items={paginatedItems}
              trackBy="id"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  countText={filteringText ? `${filteredItems.length} matches` : ''}
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                  filteringAriaLabel="Filter table items"
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
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
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
                },
              }}
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box padding={{ bottom: 's' }} variant="p">
                    No data available
                  </Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
