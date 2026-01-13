// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart, { BarChartProps } from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import Icon from '@cloudscape-design/components/icon';
import { CustomAppLayout } from '../commons/common-components';
import { Breadcrumbs, HelpPanelProvider } from '../commons';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Mock data for area chart
const areaChartSeries: AreaChartProps.Series<Date>[] = [
  {
    type: 'area',
    title: 'Site 1',
    data: [
      { x: new Date(2024, 0, 1), y: 28 },
      { x: new Date(2024, 0, 2), y: 31 },
      { x: new Date(2024, 0, 3), y: 35 },
      { x: new Date(2024, 0, 4), y: 33 },
      { x: new Date(2024, 0, 5), y: 38 },
      { x: new Date(2024, 0, 6), y: 42 },
      { x: new Date(2024, 0, 7), y: 40 },
      { x: new Date(2024, 0, 8), y: 45 },
      { x: new Date(2024, 0, 9), y: 48 },
      { x: new Date(2024, 0, 10), y: 44 },
      { x: new Date(2024, 0, 11), y: 47 },
      { x: new Date(2024, 0, 12), y: 50 },
    ],
    valueFormatter: value => `${value}`,
  },
  {
    type: 'area',
    title: 'Site 2',
    data: [
      { x: new Date(2024, 0, 1), y: 20 },
      { x: new Date(2024, 0, 2), y: 22 },
      { x: new Date(2024, 0, 3), y: 25 },
      { x: new Date(2024, 0, 4), y: 23 },
      { x: new Date(2024, 0, 5), y: 27 },
      { x: new Date(2024, 0, 6), y: 30 },
      { x: new Date(2024, 0, 7), y: 28 },
      { x: new Date(2024, 0, 8), y: 32 },
      { x: new Date(2024, 0, 9), y: 35 },
      { x: new Date(2024, 0, 10), y: 33 },
      { x: new Date(2024, 0, 11), y: 37 },
      { x: new Date(2024, 0, 12), y: 40 },
    ],
    valueFormatter: value => `${value}`,
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 35,
  },
];

// Mock data for bar chart
const barChartSeries: BarChartProps.Series<string>[] = [
  {
    type: 'bar',
    title: 'Site 1',
    data: [
      { x: 'x1', y: 45 },
      { x: 'x2', y: 65 },
      { x: 'x3', y: 55 },
      { x: 'x4', y: 30 },
      { x: 'x5', y: 52 },
    ],
    valueFormatter: value => `${value}`,
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 50,
  },
];

// Mock data for table
interface TableItem {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

const generateTableItems = (): TableItem[] => {
  const items: TableItem[] = [];
  for (let i = 1; i <= 12; i++) {
    items.push({
      id: `item-${i}`,
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }
  return items;
};

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<TableItem[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const allItems = generateTableItems();
  const itemsPerPage = 10;
  const paginatedItems = allItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const columnDefinitions = [
    {
      id: 'col1',
      header: 'Column header',
      cell: (item: TableItem) => item.col1,
      sortingField: 'col1',
    },
    {
      id: 'col2',
      header: 'Column header',
      cell: (item: TableItem) => item.col2,
      sortingField: 'col2',
    },
    {
      id: 'col3',
      header: 'Column header',
      cell: (item: TableItem) => item.col3,
      sortingField: 'col3',
    },
    {
      id: 'col4',
      header: 'Column header',
      cell: (item: TableItem) => item.col4,
      sortingField: 'col4',
    },
    {
      id: 'col5',
      header: 'Column header',
      cell: (item: TableItem) => item.col5,
      sortingField: 'col5',
    },
    {
      id: 'col6',
      header: 'Column header',
      cell: (item: TableItem) => item.col6,
      sortingField: 'col6',
    },
    {
      id: 'col7',
      header: 'Column header',
      cell: (item: TableItem) => item.col7,
      sortingField: 'col7',
    },
  ];

  return (
    <HelpPanelProvider value={() => setToolsOpen(true)}>
      <CustomAppLayout
        ref={appLayout}
        contentType="table"
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
              Administration Dashboard
            </Header>

            <ColumnLayout columns={2}>
              <Container>
                <AreaChart
                  series={areaChartSeries}
                  xScaleType="time"
                  yTitle="y-axis label"
                  xTitle="X-axis label"
                  ariaLabel="Area chart showing site performance"
                  height={300}
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
                  series={barChartSeries}
                  xScaleType="categorical"
                  yTitle="y-axis label"
                  xTitle="X-axis label"
                  ariaLabel="Bar chart showing site metrics"
                  height={300}
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
            </ColumnLayout>

            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedItems}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => item.id,
              }}
              filter={
                <TextFilter
                  filteringPlaceholder="Placeholder"
                  filteringText={filteringText}
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(allItems.length / itemsPerPage)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No resources</b>
                  <Box variant="p" color="inherit">
                    No resources to display.
                  </Box>
                </Box>
              }
            />
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '/' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
          />
        }
        navigationHide={true}
        toolsHide={true}
      />
    </HelpPanelProvider>
  );
}
