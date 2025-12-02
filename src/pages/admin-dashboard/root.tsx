// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Grid from '@cloudscape-design/components/grid';

import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import { commonChartProps } from '../dashboard/widgets/chart-commons';

import '../../styles/base.scss';

// Mock data for the table
const generateTableData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      id: `item-${i + 1}`,
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }
  return data;
};

// Area chart data
const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 3.5 },
      { x: 3, y: 4 },
      { x: 4, y: 4.5 },
      { x: 5, y: 5 },
      { x: 6, y: 5.5 },
      { x: 7, y: 5 },
      { x: 8, y: 4.5 },
      { x: 9, y: 3.5 },
      { x: 10, y: 3.5 },
      { x: 11, y: 4 },
      { x: 12, y: 5 },
    ],
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.5 },
      { x: 3, y: 3 },
      { x: 4, y: 3.5 },
      { x: 5, y: 4 },
      { x: 6, y: 3.5 },
      { x: 7, y: 3 },
      { x: 8, y: 2.5 },
      { x: 9, y: 2 },
      { x: 10, y: 1.5 },
      { x: 11, y: 2 },
      { x: 12, y: 2.5 },
    ],
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
  },
];

// Bar chart data
const barChartSeries = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 450 },
      { x: 2, y: 600 },
      { x: 3, y: 520 },
      { x: 4, y: 300 },
      { x: 5, y: 510 },
    ],
  },
];

// Table column definitions
const COLUMN_DEFINITIONS = [
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

interface AdminDashboardContentProps {
  tableData: any[];
}

function AdminDashboardContent({ tableData }: AdminDashboardContentProps) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Item" />,
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: COLUMN_DEFINITIONS[0] } },
      selection: {},
    }
  );

  return (
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

      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
        <Container>
          <AreaChart
            {...commonChartProps}
            series={areaChartSeries}
            height={300}
            xScaleType="linear"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Area chart showing data trends"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>

        <Container>
          <BarChart
            {...commonChartProps}
            series={barChartSeries}
            height={300}
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Bar chart showing performance metrics"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>
      </Grid>

      <Table
        {...collectionProps}
        selectionType="multi"
        header={
          <Header
            counter={selectedItems.length ? `(${selectedItems.length}/${tableData.length})` : `(${tableData.length})`}
          >
            Data
          </Header>
        }
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Placeholder"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        }
        pagination={<Pagination {...paginationProps} />}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}

export default function AdminDashboard() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const tableData = generateTableData();

  return (
    <CustomAppLayout
      ref={appLayout}
      contentType="table"
      content={<AdminDashboardContent tableData={tableData} />}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/admin-dashboard' },
          ]}
        />
      }
      navigation={<Navigation activeHref="#/admin-dashboard" />}
      tools={
        <Box padding="l">
          <SpaceBetween size="l">
            <div>
              <Box variant="h3">Administration Dashboard</Box>
              <Box variant="p">View and manage administrative data with charts and detailed tables.</Box>
            </div>
          </SpaceBetween>
        </Box>
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
