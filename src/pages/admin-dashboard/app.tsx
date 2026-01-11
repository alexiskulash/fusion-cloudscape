// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import AppLayout from '@cloudscape-design/components/app-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Input from '@cloudscape-design/components/input';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Pagination from '@cloudscape-design/components/pagination';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import TextFilter from '@cloudscape-design/components/text-filter';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  // Sample data for area chart
  const areaChartData = [
    {
      title: 'Site 1',
      type: 'area',
      data: [
        { x: 'x1', y: 3 },
        { x: 'x2', y: 3.5 },
        { x: 'x3', y: 4 },
        { x: 'x4', y: 4.2 },
        { x: 'x5', y: 4.5 },
        { x: 'x6', y: 5 },
        { x: 'x7', y: 5.2 },
        { x: 'x8', y: 5 },
        { x: 'x9', y: 4.8 },
        { x: 'x10', y: 4.5 },
        { x: 'x11', y: 4.2 },
        { x: 'x12', y: 4 },
      ],
    },
    {
      title: 'Site 2',
      type: 'area',
      data: [
        { x: 'x1', y: 2 },
        { x: 'x2', y: 2.5 },
        { x: 'x3', y: 3 },
        { x: 'x4', y: 3.5 },
        { x: 'x5', y: 3.8 },
        { x: 'x6', y: 4.2 },
        { x: 'x7', y: 4.5 },
        { x: 'x8', y: 4.8 },
        { x: 'x9', y: 4.5 },
        { x: 'x10', y: 4 },
        { x: 'x11', y: 3.5 },
        { x: 'x12', y: 3 },
      ],
    },
  ];

  // Sample data for bar chart
  const barChartData = [
    {
      title: 'Site 1',
      type: 'bar',
      data: [
        { x: 'x1', y: 183 },
        { x: 'x2', y: 257 },
        { x: 'x3', y: 213 },
        { x: 'x4', y: 122 },
        { x: 'x5', y: 210 },
      ],
    },
  ];

  // Sample table data
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  return (
    <div>
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
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            iconName: 'user-profile',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'signout', text: 'Sign out' },
            ],
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
        search={
          <Input
            type="search"
            value={searchValue}
            onChange={({ detail }) => setSearchValue(detail.value)}
            placeholder="Search"
            ariaLabel="Search"
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
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              }
            >
              Adminstration Dashboard
            </Header>

            <SpaceBetween direction="horizontal" size="l">
              <TextFilter
                filteringPlaceholder="Placeholder"
                filteringText={searchValue}
                onChange={({ detail }) => setSearchValue(detail.filteringText)}
              />
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={5}
              />
            </SpaceBetween>

            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 6 } },
                { colspan: { default: 12, s: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={areaChartData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 6]}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  height={300}
                  statusType="finished"
                  legendTitle="Legend"
                  i18nStrings={{
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  ariaLabel="Area chart"
                />
              </Container>

              <Container>
                <BarChart
                  series={barChartData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 300]}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  height={300}
                  statusType="finished"
                  legendTitle="Legend"
                  i18nStrings={{
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Bar chart"
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'column1',
                  header: 'Column header',
                  cell: (item) => item.column1,
                  sortingField: 'column1',
                },
                {
                  id: 'column2',
                  header: 'Column header',
                  cell: (item) => item.column2,
                  sortingField: 'column2',
                },
                {
                  id: 'column3',
                  header: 'Column header',
                  cell: (item) => item.column3,
                  sortingField: 'column3',
                },
                {
                  id: 'column4',
                  header: 'Column header',
                  cell: (item) => item.column4,
                  sortingField: 'column4',
                },
                {
                  id: 'column5',
                  header: 'Column header',
                  cell: (item) => item.column5,
                  sortingField: 'column5',
                },
                {
                  id: 'column6',
                  header: 'Column header',
                  cell: (item) => item.column6,
                  sortingField: 'column6',
                },
                {
                  id: 'column7',
                  header: 'Column header',
                  cell: (item) => item.column7,
                  sortingField: 'column7',
                },
              ]}
              items={tableItems}
              loadingText="Loading resources"
              selectionType="multi"
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No resources</b>
                  </Box>
                  <Button>Create resource</Button>
                </Box>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={2}
                />
              }
            />
          </SpaceBetween>
        }
      />
    </div>
  );
}
