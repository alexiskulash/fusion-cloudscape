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
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import Input from '@cloudscape-design/components/input';

import styles from './admin-dashboard.module.css';

const areaChartSeries: any[] = [
  {
    type: 'area',
    title: 'Site 1',
    data: [
      { x: 'x1', y: 2.7 },
      { x: 'x2', y: 2.7 },
      { x: 'x3', y: 2.9 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 3.0 },
      { x: 'x6', y: 3.1 },
      { x: 'x7', y: 3.0 },
      { x: 'x8', y: 2.9 },
      { x: 'x9', y: 3.0 },
      { x: 'x10', y: 3.1 },
      { x: 'x11', y: 2.8 },
      { x: 'x12', y: 2.7 },
    ],
    color: '#688AE8',
  },
  {
    type: 'area',
    title: 'Site 2',
    data: [
      { x: 'x1', y: 3.2 },
      { x: 'x2', y: 3.8 },
      { x: 'x3', y: 4.0 },
      { x: 'x4', y: 3.7 },
      { x: 'x5', y: 4.2 },
      { x: 'x6', y: 3.9 },
      { x: 'x7', y: 4.1 },
      { x: 'x8', y: 3.8 },
      { x: 'x9', y: 3.7 },
      { x: 'x10', y: 4.0 },
      { x: 'x11', y: 4.2 },
      { x: 'x12', y: 3.5 },
    ],
    color: '#C33D69',
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 3.0,
    color: '#5F6B7A',
  },
];

const barChartSeries: any[] = [
  {
    type: 'bar',
    title: 'Site 1',
    data: [
      { x: 'x1', y: 4.0 },
      { x: 'x2', y: 5.5 },
      { x: 'x3', y: 4.8 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 4.7 },
    ],
    color: '#688AE8',
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 3.5,
    color: '#5F6B7A',
  },
];

const tableItems = Array.from({ length: 13 }, (_, i) => ({
  id: String(i + 1),
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const columnDefinitions = [
  { id: 'col1', header: 'Column header', cell: (item: any) => item.col1, sortingField: 'col1' },
  { id: 'col2', header: 'Column header', cell: (item: any) => item.col2, sortingField: 'col2' },
  { id: 'col3', header: 'Column header', cell: (item: any) => item.col3, sortingField: 'col3' },
  { id: 'col4', header: 'Column header', cell: (item: any) => item.col4, sortingField: 'col4' },
  { id: 'col5', header: 'Column header', cell: (item: any) => item.col5, sortingField: 'col5' },
  { id: 'col6', header: 'Column header', cell: (item: any) => item.col6, sortingField: 'col6' },
  { id: 'col7', header: 'Column header', cell: (item: any) => item.col7, sortingField: 'col7' },
];

export default function AdminDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <div className={styles['dashboard-wrapper']}>
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
              value=""
              onChange={() => {}}
              placeholder="Search"
              ariaLabel="Search"
            />
          }
          utilities={[
            {
              type: 'button',
              text: 'Link',
              href: '#',
              external: true,
              externalIconAriaLabel: 'Opens in new tab',
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
                { id: 'signout', text: 'Sign out' },
              ],
            },
          ]}
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

              <div className={styles['filter-pagination-row']}>
                <div className={styles['filter-wrapper']}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter items"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                </div>
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
              </div>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, m: 6 } },
                  { colspan: { default: 12, m: 6 } },
                ]}
              >
                <Box className={styles['chart-container']}>
                  <AreaChart
                    series={areaChartSeries}
                    xScaleType="categorical"
                    xTitle="X-axis label"
                    yTitle="y-axis label"
                    height={300}
                    hideFilter
                    ariaLabel="Area chart showing Site 1 and Site 2 data"
                    i18nStrings={{
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      xTickFormatter: v => String(v),
                      yTickFormatter: v => String(v),
                    }}
                  />
                </Box>

                <Box className={styles['chart-container']}>
                  <BarChart
                    series={barChartSeries}
                    xScaleType="categorical"
                    xTitle="X-axis label"
                    yTitle="y-axis label"
                    height={300}
                    hideFilter
                    ariaLabel="Bar chart showing Site 1 data"
                    i18nStrings={{
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                    }}
                  />
                </Box>
              </Grid>

              <Table
                items={tableItems}
                columnDefinitions={columnDefinitions}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    `${item.id} is ${selectedItems.includes(item) ? '' : 'not '}selected`,
                  tableLabel: 'Administration dashboard table',
                }}
                variant="container"
                sortingDisabled={false}
              />
            </SpaceBetween>
          }
        />
      </div>
    </I18nProvider>
  );
}
