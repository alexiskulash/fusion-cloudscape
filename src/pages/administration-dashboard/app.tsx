// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { CustomAppLayout } from '../commons/common-components';

// Sample data for area chart
const areaChartData: AreaChartProps.Series<number>[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3.5 },
      { x: 4, y: 4 },
      { x: 5, y: 4.5 },
      { x: 6, y: 4.8 },
      { x: 7, y: 5 },
      { x: 8, y: 5.2 },
      { x: 9, y: 5.5 },
      { x: 10, y: 6 },
      { x: 11, y: 5.8 },
      { x: 12, y: 3 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 1, y: 2.5 },
      { x: 2, y: 3.2 },
      { x: 3, y: 3.8 },
      { x: 4, y: 4.2 },
      { x: 5, y: 4.5 },
      { x: 6, y: 4.7 },
      { x: 7, y: 5 },
      { x: 8, y: 5.3 },
      { x: 9, y: 5.8 },
      { x: 10, y: 6.2 },
      { x: 11, y: 6 },
      { x: 12, y: 5 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
  },
];

// Sample data for bar chart
const barChartSeries: BarChartProps<number>['series'] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 1, y: 4.5 },
      { x: 2, y: 6 },
      { x: 3, y: 5.5 },
      { x: 4, y: 3 },
      { x: 5, y: 5 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
  },
];

// Sample table data
interface TableItem {
  id: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

const generateTableData = (): TableItem[] => {
  const data: TableItem[] = [];
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
  const tableData = generateTableData();

  const { items, collectionProps, paginationProps } = useCollection(tableData, {
    pagination: { pageSize: 10 },
    selection: {},
  });

  const columnDefinitions = [
    {
      id: 'column1',
      header: 'Column header',
      cell: (item: TableItem) => item.column1,
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item: TableItem) => item.column2,
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item: TableItem) => item.column3,
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item: TableItem) => item.column4,
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item: TableItem) => item.column5,
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item: TableItem) => item.column6,
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item: TableItem) => item.column7,
      sortingField: 'column7',
    },
  ];

  return (
    <CustomAppLayout
      navigationHide={true}
      toolsHide={true}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/administration-dashboard' },
          ]}
        />
      }
      content={
        <SpaceBetween size="l">
          {/* Header Section */}
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

          {/* Search and Pagination Controls */}
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8 } },
              { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4 } },
            ]}
          >
            <Input
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
              placeholder="Placeholder"
              type="search"
            />
            <Box float="right">
              <Pagination currentPageIndex={1} pagesCount={5} />
            </Box>
          </Grid>

          {/* Charts Section */}
          <ColumnLayout columns={2} variant="default">
            <Container fitHeight={true}>
              <AreaChart
                series={areaChartData}
                xDomain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                yDomain={[0, 7]}
                xScaleType="categorical"
                yTitle="y-axis label"
                xTitle="X-axis label"
                height={300}
                hideFilter={false}
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xAxisAriaRoleDescription: 'x axis',
                  yAxisAriaRoleDescription: 'y axis',
                  xTickFormatter: (value: number) => `x${value}`,
                  yTickFormatter: (value: number) => `y${value}`,
                }}
                ariaLabel="Area chart showing site performance"
                ariaDescription="Area chart comparing Site 1 and Site 2 performance against a performance goal"
              />
            </Container>

            <Container fitHeight={true}>
              <BarChart
                series={barChartSeries}
                xDomain={[1, 2, 3, 4, 5]}
                yDomain={[0, 7]}
                xScaleType="categorical"
                yTitle="y-axis label"
                xTitle="X-axis label"
                height={300}
                hideFilter={false}
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  xAxisAriaRoleDescription: 'x axis',
                  yAxisAriaRoleDescription: 'y axis',
                  xTickFormatter: (value: number) => `x${value}`,
                  yTickFormatter: (value: number) => `y${value}`,
                }}
                ariaLabel="Bar chart showing site performance"
                ariaDescription="Bar chart showing Site 1 performance against a performance goal"
              />
            </Container>
          </ColumnLayout>

          {/* Table Section */}
          <Table
            {...collectionProps}
            columnDefinitions={columnDefinitions}
            items={items}
            selectionType="multi"
            variant="container"
            stickyHeader={false}
            header={<Header>Table Data</Header>}
            pagination={<Pagination {...paginationProps} />}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No data to display.
                </Box>
              </Box>
            }
          />
        </SpaceBetween>
      }
    />
  );
}
