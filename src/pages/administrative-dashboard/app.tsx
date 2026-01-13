// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

import { CustomAppLayout } from '../commons/common-components';

import '../../styles/administrative-dashboard.scss';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Sample data for Area Chart
const areaChartSeries: AreaChartProps.Series<Date>[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date(2024, 0, 1), y: 2 },
      { x: new Date(2024, 0, 2), y: 3 },
      { x: new Date(2024, 0, 3), y: 4 },
      { x: new Date(2024, 0, 4), y: 4.5 },
      { x: new Date(2024, 0, 5), y: 4.8 },
      { x: new Date(2024, 0, 6), y: 5 },
      { x: new Date(2024, 0, 7), y: 5.2 },
      { x: new Date(2024, 0, 8), y: 5.5 },
      { x: new Date(2024, 0, 9), y: 5.3 },
      { x: new Date(2024, 0, 10), y: 5.6 },
      { x: new Date(2024, 0, 11), y: 5.8 },
      { x: new Date(2024, 0, 12), y: 5.5 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date(2024, 0, 1), y: 3 },
      { x: new Date(2024, 0, 2), y: 3.5 },
      { x: new Date(2024, 0, 3), y: 4 },
      { x: new Date(2024, 0, 4), y: 4.2 },
      { x: new Date(2024, 0, 5), y: 4.5 },
      { x: new Date(2024, 0, 6), y: 4.7 },
      { x: new Date(2024, 0, 7), y: 4.5 },
      { x: new Date(2024, 0, 8), y: 4.3 },
      { x: new Date(2024, 0, 9), y: 4 },
      { x: new Date(2024, 0, 10), y: 4.2 },
      { x: new Date(2024, 0, 11), y: 4.5 },
      { x: new Date(2024, 0, 12), y: 4.1 },
    ],
  },
];

// Sample data for Bar Chart
const barChartSeries: BarChartProps.Series<string>[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 4 },
      { x: 'x2', y: 5.5 },
      { x: 'x3', y: 4.5 },
      { x: 'x4', y: 2.5 },
      { x: 'x5', y: 4.3 },
    ],
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

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<typeof tableItems>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const dateFormatter = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          {/* Header */}
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

          {/* Search and Pagination Controls */}
          <div className="header-controls">
            <SpaceBetween direction="horizontal" size="m">
              <Input
                type="search"
                placeholder="Placeholder"
                value={searchValue}
                onChange={({ detail }) => setSearchValue(detail.value)}
                className="search-input"
              />
              <div className="pagination-wrapper">
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={5}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
                <Button variant="icon" iconName="settings" />
              </div>
            </SpaceBetween>
          </div>

          {/* Charts */}
          <ColumnLayout columns={2} variant="default">
            <Container fitHeight>
              <AreaChart
                series={areaChartSeries}
                xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                yDomain={[0, 6]}
                height={300}
                xScaleType="time"
                xTitle="X-axis label"
                yTitle="y-axis label"
                ariaLabel="Area chart showing site performance"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xTickFormatter: dateFormatter,
                }}
                hideFilter
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
              />
            </Container>

            <Container fitHeight>
              <BarChart
                series={barChartSeries}
                height={300}
                xTitle="X-axis label"
                yTitle="y-axis label"
                yDomain={[0, 6]}
                ariaLabel="Bar chart showing site metrics"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                }}
                hideFilter
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
              />
            </Container>
          </ColumnLayout>

          {/* Table */}
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
            variant="container"
            stickyHeader
            resizableColumns
          />
        </SpaceBetween>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/administrative-dashboard' },
          ]}
        />
      }
      navigationHide
      toolsHide
    />
  );
}
