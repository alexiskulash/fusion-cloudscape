// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { CustomAppLayout } from '../commons/common-components';
import { commonChartProps } from '../dashboard/widgets/chart-commons';

import '../../styles/base.scss';

// Sample data for Area Chart
const areaChartSeries: AreaChartProps<number>['series'] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.5 },
      { x: 3, y: 2.8 },
      { x: 4, y: 3.2 },
      { x: 5, y: 3.5 },
      { x: 6, y: 4 },
      { x: 7, y: 4.5 },
      { x: 8, y: 4.2 },
      { x: 9, y: 3.8 },
      { x: 10, y: 3.5 },
      { x: 11, y: 3.2 },
      { x: 12, y: 2.8 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 3.5 },
      { x: 3, y: 3.8 },
      { x: 4, y: 4.2 },
      { x: 5, y: 4.5 },
      { x: 6, y: 5 },
      { x: 7, y: 4.8 },
      { x: 8, y: 4.5 },
      { x: 9, y: 4.2 },
      { x: 10, y: 3.8 },
      { x: 11, y: 3.5 },
      { x: 12, y: 3.2 },
    ],
  },
];

// Sample data for Bar Chart
const barChartSeries: BarChartProps<number>['series'] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 1, y: 183 },
      { x: 2, y: 257 },
      { x: 3, y: 213 },
      { x: 4, y: 122 },
      { x: 5, y: 210 },
    ],
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
  for (let i = 1; i <= 13; i++) {
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

const tableData = generateTableData();

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

export function App() {
  const [selectedItems, setSelectedItems] = useState<TableItem[]>([]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No data</b>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  );

  return (
    <CustomAppLayout
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ flex: 1, maxWidth: '400px' }}>
                <TextFilter
                  {...filterProps}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter data"
                  countText={`${filteredItemsCount} matches`}
                />
              </div>
              <Pagination
                {...paginationProps}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
              />
            </div>
          </Container>

          <ColumnLayout columns={2} variant="default">
            <Container>
              <AreaChart
                {...commonChartProps}
                series={areaChartSeries}
                xDomain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                yDomain={[0, 6]}
                xScaleType="categorical"
                xTitle="X-axis label"
                yTitle="y-axis label"
                height={300}
                hideFilter
                i18nStrings={{
                  ...commonChartProps.i18nStrings,
                  chartAriaRoleDescription: 'area chart',
                  xTickFormatter: (value: number) => `x${value}`,
                  yTickFormatter: (value: number) => `y${value}`,
                }}
                ariaLabel="Administration metrics area chart"
              />
            </Container>

            <Container>
              <BarChart
                {...commonChartProps}
                series={barChartSeries}
                xDomain={[1, 2, 3, 4, 5]}
                yDomain={[0, 300]}
                xScaleType="categorical"
                xTitle="X-axis label"
                yTitle="y-axis label"
                height={300}
                hideFilter
                i18nStrings={{
                  ...commonChartProps.i18nStrings,
                  chartAriaRoleDescription: 'bar chart',
                  xTickFormatter: (value: number) => `x${value}`,
                }}
                ariaLabel="Administration metrics bar chart"
              />
            </Container>
          </ColumnLayout>

          <Table
            {...collectionProps}
            columnDefinitions={columnDefinitions}
            items={items}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            variant="container"
            ariaLabels={{
              selectionGroupLabel: 'Items selection',
              allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
              itemSelectionLabel: ({ selectedItems }, item) => item.id,
            }}
          />
        </SpaceBetween>
      }
    />
  );
}
