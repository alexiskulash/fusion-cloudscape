// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import AppLayout from '@cloudscape-design/components/app-layout';
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

import '@cloudscape-design/global-styles/index.css';
import './styles.scss';

// Sample data for the area chart
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
      { x: 'x10', y: 5.2 },
      { x: 'x11', y: 5.5 },
      { x: 'x12', y: 5 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 2 },
      { x: 'x2', y: 2.5 },
      { x: 'x3', y: 3 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 3.5 },
      { x: 'x6', y: 4 },
      { x: 'x7', y: 4.2 },
      { x: 'x8', y: 3.8 },
      { x: 'x9', y: 3.5 },
      { x: 'x10', y: 4 },
      { x: 'x11', y: 4.5 },
      { x: 'x12', y: 4 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
];

// Sample data for the bar chart
const barChartData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 4.2 },
      { x: 'x3', y: 3.5 },
      { x: 'x4', y: 2 },
      { x: 'x5', y: 3.4 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
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
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: {
            src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" fill="%23D1D5DB"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23FBFBFB" font-family="Open Sans" font-size="14"%3ELogo%3C/text%3E%3C/svg%3E',
            alt: 'Service logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#',
            external: true,
            externalIconAriaLabel: '(opens in new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false,
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
            description: 'Customer name',
            iconName: 'user-profile',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'security', text: 'Security' },
              {
                id: 'support-group',
                text: 'Support',
                items: [
                  {
                    id: 'documentation',
                    text: 'Documentation',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: '(opens in new tab)',
                  },
                  { id: 'support', text: 'Support' },
                ],
              },
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
      />
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
              Administration Dashboard
            </Header>

            <Container>
              <SpaceBetween size="m">
                <div className="filter-pagination-wrapper">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter data"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                </div>

                <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                  <Container>
                    <AreaChart
                      series={areaChartData}
                      xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                      yDomain={[0, 6]}
                      i18nStrings={{
                        filterLabel: 'Filter displayed data',
                        filterPlaceholder: 'Filter data',
                        filterSelectedAriaLabel: 'selected',
                        legendAriaLabel: 'Legend',
                        chartAriaRoleDescription: 'area chart',
                        xAxisAriaRoleDescription: 'x axis',
                        yAxisAriaRoleDescription: 'y axis',
                      }}
                      ariaLabel="Area chart showing performance data"
                      height={300}
                      xScaleType="categorical"
                      xTitle="X-axis label"
                      yTitle="y-axis label"
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
                      series={barChartData}
                      xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                      yDomain={[0, 6]}
                      i18nStrings={{
                        filterLabel: 'Filter displayed data',
                        filterPlaceholder: 'Filter data',
                        filterSelectedAriaLabel: 'selected',
                        legendAriaLabel: 'Legend',
                        chartAriaRoleDescription: 'bar chart',
                        xAxisAriaRoleDescription: 'x axis',
                        yAxisAriaRoleDescription: 'y axis',
                      }}
                      ariaLabel="Bar chart showing performance data"
                      height={300}
                      xScaleType="categorical"
                      xTitle="X-axis label"
                      yTitle="y-axis label"
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

                <Table
                  columnDefinitions={columnDefinitions}
                  items={tableItems}
                  loadingText="Loading resources"
                  selectionType="multi"
                  trackBy="id"
                  selectedItems={selectedItems}
                  onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems as any)}
                  empty={
                    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
                      <SpaceBetween size="m">
                        <b>No resources</b>
                      </SpaceBetween>
                    </Box>
                  }
                  sortingDisabled={false}
                />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        }
      />
    </>
  );
}
