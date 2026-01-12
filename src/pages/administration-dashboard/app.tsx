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
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
  const types = ['Standard', 'Premium', 'Enterprise', 'Trial'];
  const owners = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Wilson'];

  return Array.from({ length: count }, (_, i) => ({
    id: `resource-${String(i + 1).padStart(4, '0')}`,
    name: `Resource ${i + 1}`,
    status: statuses[i % statuses.length],
    type: types[i % types.length],
    region: regions[i % regions.length],
    owner: owners[i % owners.length],
    created: new Date(2024, 0, 1 + (i % 365)).toLocaleDateString(),
    instances: Math.floor(Math.random() * 50) + 1,
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
      id: 'name',
      header: 'Resource Name',
      cell: (item: any) => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: any) => item.status,
      sortingField: 'status',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: any) => item.type,
      sortingField: 'type',
    },
    {
      id: 'region',
      header: 'Region',
      cell: (item: any) => item.region,
      sortingField: 'region',
    },
    {
      id: 'owner',
      header: 'Owner',
      cell: (item: any) => item.owner,
      sortingField: 'owner',
    },
    {
      id: 'created',
      header: 'Created Date',
      cell: (item: any) => item.created,
      sortingField: 'created',
    },
    {
      id: 'instances',
      header: 'Instances',
      cell: (item: any) => item.instances,
      sortingField: 'instances',
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
