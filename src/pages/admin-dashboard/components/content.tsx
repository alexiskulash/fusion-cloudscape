// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

// Sample data for Area Chart
const areaChartSeries: AreaChartProps<Date>['series'] = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 72 },
      { x: new Date('2024-01-02'), y: 73 },
      { x: new Date('2024-01-03'), y: 74 },
      { x: new Date('2024-01-04'), y: 75 },
      { x: new Date('2024-01-05'), y: 76 },
      { x: new Date('2024-01-06'), y: 77 },
      { x: new Date('2024-01-07'), y: 78 },
      { x: new Date('2024-01-08'), y: 79 },
      { x: new Date('2024-01-09'), y: 80 },
      { x: new Date('2024-01-10'), y: 81 },
      { x: new Date('2024-01-11'), y: 82 },
      { x: new Date('2024-01-12'), y: 83 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 62 },
      { x: new Date('2024-01-02'), y: 64 },
      { x: new Date('2024-01-03'), y: 66 },
      { x: new Date('2024-01-04'), y: 68 },
      { x: new Date('2024-01-05'), y: 70 },
      { x: new Date('2024-01-06'), y: 72 },
      { x: new Date('2024-01-07'), y: 74 },
      { x: new Date('2024-01-08'), y: 76 },
      { x: new Date('2024-01-09'), y: 78 },
      { x: new Date('2024-01-10'), y: 80 },
      { x: new Date('2024-01-11'), y: 82 },
      { x: new Date('2024-01-12'), y: 84 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
];

// Sample data for Bar Chart
const barChartSeries: BarChartProps<string>['series'] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'A', y: 45 },
      { x: 'B', y: 52 },
      { x: 'C', y: 48 },
      { x: 'D', y: 38 },
      { x: 'E', y: 50 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 40,
  },
];

// Sample data for Table
const tableItems = [
  {
    id: '1',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '2',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '3',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '4',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '5',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '6',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '7',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '8',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '9',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '10',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '11',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '12',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
];

const columnDefinitions = [
  {
    id: 'column1',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column1,
    sortingField: 'column1',
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column2,
    sortingField: 'column2',
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column3,
    sortingField: 'column3',
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column4,
    sortingField: 'column4',
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column5,
    sortingField: 'column5',
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column6,
    sortingField: 'column6',
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: (item: (typeof tableItems)[0]) => item.column7,
    sortingField: 'column7',
  },
];

export function Content() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof tableItems>([]);

  const filteredItems = tableItems.filter(item =>
    Object.values(item).some(value => value.toLowerCase().includes(filterText.toLowerCase())),
  );

  return (
    <SpaceBetween size="l">
      {/* Filter and Pagination Section */}
      <Container>
        <SpaceBetween size="m">
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } },
            ]}
          >
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              filteringAriaLabel="Filter data"
              onChange={({ detail }) => setFilterText(detail.filteringText)}
            />
            <Box float="right">
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
            </Box>
          </Grid>
        </SpaceBetween>
      </Container>

      {/* Charts Section */}
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
        ]}
      >
        <Container>
          <AreaChart
            series={areaChartSeries}
            xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
            yDomain={[60, 90]}
            xTitle="X-axis label"
            yTitle="y-axis label"
            hideFilter
            statusType="finished"
            detailPopoverSize="medium"
            height={300}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              yTickFormatter: (value: number) => `y${value}`,
            }}
          />
        </Container>
        <Container>
          <BarChart
            series={barChartSeries}
            xTitle="X-axis label"
            yTitle="y-axis label"
            hideFilter
            statusType="finished"
            height={300}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
            }}
          />
        </Container>
      </Grid>

      {/* Table Section */}
      <Container>
        <Table
          columnDefinitions={columnDefinitions}
          items={filteredItems}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          ariaLabels={{
            selectionGroupLabel: 'Items selection',
            allItemsSelectionLabel: ({ selectedItems }) =>
              `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
            itemSelectionLabel: ({ selectedItems }, item) => {
              const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
              return `${item.column1} is ${isItemSelected ? '' : 'not '}selected`;
            },
          }}
          trackBy="id"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
          variant="container"
        />
      </Container>
    </SpaceBetween>
  );
}
