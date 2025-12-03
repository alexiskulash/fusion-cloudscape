// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

const AREA_CHART_DATA = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 95 }, { x: 2, y: 85 }, { x: 3, y: 90 }, { x: 4, y: 88 },
      { x: 5, y: 92 }, { x: 6, y: 96 }, { x: 7, y: 100 }, { x: 8, y: 98 },
      { x: 9, y: 102 }, { x: 10, y: 95 }, { x: 11, y: 105 }, { x: 12, y: 98 }
    ]
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 62 }, { x: 2, y: 68 }, { x: 3, y: 75 }, { x: 4, y: 78 },
      { x: 5, y: 82 }, { x: 6, y: 85 }, { x: 7, y: 88 }, { x: 8, y: 86 },
      { x: 9, y: 80 }, { x: 10, y: 73 }, { x: 11, y: 65 }, { x: 12, y: 62 }
    ]
  },
  { type: 'threshold' as const, title: 'Performance goal', y: 85 },
];

const BAR_CHART_DATA = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 183 },
      { x: 2, y: 257 },
      { x: 3, y: 213 },
      { x: 4, y: 122 },
      { x: 5, y: 210 },
    ]
  },
  { type: 'threshold' as const, title: 'Performance goal', y: 150 },
];

const TABLE_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: `item-${i + 1}`,
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const COLUMN_DEFINITIONS = [
  {
    id: 'col1',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col1,
    sortingField: 'col1',
  },
  {
    id: 'col2',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col2,
    sortingField: 'col2',
  },
  {
    id: 'col3',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col3,
    sortingField: 'col3',
  },
  {
    id: 'col4',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col4,
    sortingField: 'col4',
  },
  {
    id: 'col5',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col5,
    sortingField: 'col5',
  },
  {
    id: 'col6',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col6,
    sortingField: 'col6',
  },
  {
    id: 'col7',
    header: 'Column header',
    cell: (item: typeof TABLE_ITEMS[0]) => item.col7,
    sortingField: 'col7',
  },
];

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof TABLE_ITEMS>([]);

  return (
    <CustomAppLayout
      content={
        <ContentLayout
          header={
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
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={AREA_CHART_DATA}
                  height={300}
                  xScaleType="linear"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Area chart showing performance data"
                  legendTitle="Legend"
                  hideFilter={false}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => `x${value}`,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                />
              </Container>
              <Container>
                <BarChart
                  series={BAR_CHART_DATA}
                  height={300}
                  xScaleType="linear"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  ariaLabel="Bar chart showing metrics data"
                  legendTitle="Legend"
                  hideFilter={false}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => `x${value}`,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                />
              </Container>
            </Grid>
            <Table
              columnDefinitions={COLUMN_DEFINITIONS}
              items={TABLE_ITEMS}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              header={
                <Header
                  counter={selectedItems.length ? `(${selectedItems.length}/${TABLE_ITEMS.length})` : `(${TABLE_ITEMS.length})`}
                >
                  Data
                </Header>
              }
              filter={
                <TextFilter
                  filteringText={filterText}
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                  filteringPlaceholder="Placeholder"
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: (pageNumber) => `Page ${pageNumber}`,
                  }}
                />
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/administration-dashboard' },
          ]}
        />
      }
      navigationHide
      toolsHide
    />
  );
}
