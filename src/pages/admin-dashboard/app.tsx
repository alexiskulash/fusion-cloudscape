// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Input from '@cloudscape-design/components/input';

// Mock data for charts
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.5 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 4.5 },
      { x: 6, y: 5 },
      { x: 7, y: 5.2 },
      { x: 8, y: 5 },
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
      { x: 3, y: 2.8 },
      { x: 4, y: 3.2 },
      { x: 5, y: 3.8 },
      { x: 6, y: 4.2 },
      { x: 7, y: 4.5 },
      { x: 8, y: 4.8 },
      { x: 9, y: 5.2 },
      { x: 10, y: 5.5 },
      { x: 11, y: 5.8 },
      { x: 12, y: 5.5 },
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

// Mock table data
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

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [filteringText, setFilteringText] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tableData = generateTableData();
  const filteredItems = tableData.filter(item =>
    Object.values(item).some(value => String(value).toLowerCase().includes(filteringText.toLowerCase())),
  );

  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * 10, currentPageIndex * 10);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div>
      {/* Top Navigation */}
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

      {/* Main Content */}
      <div style={{ padding: '40px 80px' }}>
        <SpaceBetween size="l">
          {/* Breadcrumbs */}
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />

          {/* Header with search and pagination */}
          <SpaceBetween size="m">
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

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter items"
                onChange={({ detail }) => {
                  setFilteringText(detail.filteringText);
                  setCurrentPageIndex(1);
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
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
                <div
                  style={{
                    width: '2px',
                    height: '32px',
                    backgroundColor: 'var(--awsui-color-border-divider-default, #414d5c)',
                  }}
                />
                <Button iconName="settings" variant="icon" ariaLabel="Settings" />
              </div>
            </Grid>
          </SpaceBetween>

          {/* Charts */}
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <Container>
              <AreaChart
                series={areaChartSeries}
                height={300}
                xTitle="X-axis label"
                yTitle="y-axis label"
                xScaleType="linear"
                yScaleType="linear"
                ariaLabel="Area chart"
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

            <Container>
              <BarChart
                series={barChartSeries}
                height={360}
                xTitle="X-axis label"
                yTitle="y-axis label"
                xScaleType="categorical"
                yScaleType="linear"
                ariaLabel="Bar chart"
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

          {/* Table */}
          <Table
            columnDefinitions={[
              {
                id: 'selection',
                header: '',
                cell: () => null,
                width: 50,
              },
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
            items={paginatedItems}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            trackBy="id"
            empty={
              <Box textAlign="center" color="inherit">
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  <b>No data</b>
                </Box>
              </Box>
            }
            ariaLabels={{
              selectionGroupLabel: 'Items selection',
              allItemsSelectionLabel: () => 'select all',
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
