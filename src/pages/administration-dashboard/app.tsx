// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Mock data for charts
const areaChartData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 2 },
      { x: 'x2', y: 3 },
      { x: 'x3', y: 4 },
      { x: 'x4', y: 5 },
      { x: 'x5', y: 5 },
      { x: 'x6', y: 6 },
      { x: 'x7', y: 4 },
      { x: 'x8', y: 3 },
      { x: 'x9', y: 2 },
      { x: 'x10', y: 3 },
      { x: 'x11', y: 4 },
      { x: 'x12', y: 3 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 4 },
      { x: 'x3', y: 5 },
      { x: 'x4', y: 4 },
      { x: 'x5', y: 3 },
      { x: 'x6', y: 5 },
      { x: 'x7', y: 6 },
      { x: 'x8', y: 5 },
      { x: 'x9', y: 4 },
      { x: 'x10', y: 5 },
      { x: 'x11', y: 6 },
      { x: 'x12', y: 4 },
    ],
  },
];

const barChartData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Mock data for table
const tableItems = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: { src: '', alt: 'Logo' },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#',
            external: true,
            externalIconAriaLabel: ' (opens in a new tab)',
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
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            iconName: 'user-profile',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'security', text: 'Security' },
              {
                id: 'signout',
                text: 'Sign out',
              },
            ],
          },
        ]}
        search={
          <Input
            ariaLabel="Search"
            clearAriaLabel="Clear"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
      />

      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
          />
        }
        content={
          <SpaceBetween size="l">
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <Input value="" type="search" placeholder="Placeholder" ariaLabel="Search" />
              </div>
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={5}
              />
            </div>

            <ColumnLayout columns={2} variant="default">
              <Container header={<Box variant="h3">y-axis label</Box>}>
                <SpaceBetween size="s">
                  <AreaChart
                    series={areaChartData}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                    yDomain={[0, 7]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                    ariaLabel="Area chart"
                    height={300}
                    xTitle="X-axis label"
                    yTitle=""
                    hideFilter
                    hideLegend={false}
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
                </SpaceBetween>
              </Container>

              <Container header={<Box variant="h3">y-axis label</Box>}>
                <SpaceBetween size="s">
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: barChartData,
                      },
                    ]}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 300]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                    ariaLabel="Bar chart"
                    height={300}
                    xTitle="X-axis label"
                    yTitle=""
                    hideFilter
                    hideLegend={false}
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
                </SpaceBetween>
              </Container>
            </ColumnLayout>

            <Table
              columnDefinitions={[
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
              items={tableItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: (data, row) => `select ${row.id}`,
              }}
              variant="full-page"
              stickyHeader
            />
          </SpaceBetween>
        }
      />
    </>
  );
}
