// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import { AreaChartProps, BarChartProps } from '@cloudscape-design/components';

// Sample data for the area chart
const areaChartData: AreaChartProps.Series<number>[] = [
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
      { x: 'x8', y: 5.4 },
      { x: 'x9', y: 5.3 },
      { x: 'x10', y: 5.1 },
      { x: 'x11', y: 4.8 },
      { x: 'x12', y: 4.5 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 2.5 },
      { x: 'x2', y: 3 },
      { x: 'x3', y: 3.2 },
      { x: 'x4', y: 3.8 },
      { x: 'x5', y: 4.2 },
      { x: 'x6', y: 4.8 },
      { x: 'x7', y: 5.2 },
      { x: 'x8', y: 5.5 },
      { x: 'x9', y: 5.6 },
      { x: 'x10', y: 5.3 },
      { x: 'x11', y: 4.9 },
      { x: 'x12', y: 4.2 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
  },
];

// Sample data for the bar chart
const barChartData: BarChartProps.Series<number>[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 4.5 },
      { x: 'x2', y: 6 },
      { x: 'x3', y: 5.5 },
      { x: 'x4', y: 3.5 },
      { x: 'x5', y: 5.2 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
  },
];

// Sample data for the table
const tableItems = Array.from({ length: 12 }, (_, i) => ({
  id: `item-${i + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: {
            src: '',
            alt: 'Logo',
          },
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
                    externalIconAriaLabel: ' (opens in new tab)',
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

            <Container>
              <SpaceBetween size="m">
                <ColumnLayout columns={2} variant="text-grid">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter items"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                  <Box float="right">
                    <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                      <Pagination
                        currentPageIndex={currentPageIndex}
                        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                        pagesCount={5}
                        ariaLabels={{
                          nextPageLabel: 'Next page',
                          previousPageLabel: 'Previous page',
                          pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                        }}
                      />
                      <Button iconName="settings" variant="icon" />
                    </SpaceBetween>
                  </Box>
                </ColumnLayout>
              </SpaceBetween>
            </Container>

            <ColumnLayout columns={2} variant="default">
              <Container fitHeight>
                <AreaChart
                  series={areaChartData}
                  yDomain={[0, 6]}
                  height={300}
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Area chart showing performance data"
                  ariaDescription="Area chart displaying Site 1 and Site 2 performance over time with a performance goal threshold"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  xScaleType="categorical"
                  yScaleType="linear"
                  hideFilter
                  statusType="finished"
                />
              </Container>

              <Container fitHeight>
                <BarChart
                  series={barChartData}
                  yDomain={[0, 6]}
                  height={300}
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Bar chart showing site performance"
                  ariaDescription="Bar chart displaying Site 1 performance with a performance goal threshold"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  xScaleType="categorical"
                  yScaleType="linear"
                  hideFilter
                  statusType="finished"
                />
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
              loadingText="Loading resources"
              selectionType="multi"
              trackBy="id"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No resources</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No resources to display.
                  </Box>
                </Box>
              }
              variant="full-page"
              stickyHeader
            />
          </SpaceBetween>
        }
      />
    </>
  );
}
