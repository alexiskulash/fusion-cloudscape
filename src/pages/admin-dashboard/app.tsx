// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Alert from '@cloudscape-design/components/alert';

// Generate sample data for charts
const generateAreaChartData = () => {
  const xLabels = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
  return [
    {
      title: 'Site 1',
      type: 'area',
      data: xLabels.map((x, i) => ({ x, y: 50 + Math.random() * 40 })),
      valueFormatter: (value: number) => value.toFixed(0),
    },
    {
      title: 'Site 2',
      type: 'area',
      data: xLabels.map((x, i) => ({ x, y: 30 + Math.random() * 50 })),
      valueFormatter: (value: number) => value.toFixed(0),
    },
    {
      title: 'Performance goal',
      type: 'threshold',
      y: 60,
      valueFormatter: (value: number) => value.toFixed(0),
    },
  ];
};

const generateBarChartData = () => {
  return [
    { x: 'x1', y: 45 },
    { x: 'x2', y: 65 },
    { x: 'x3', y: 55 },
    { x: 'x4', y: 30 },
    { x: 'x5', y: 52 },
  ];
};

// Generate sample table data
const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 13; i++) {
    data.push({
      id: `row-${i}`,
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

export function App() {
  const [areaChartData] = useState(generateAreaChartData());
  const [barChartData] = useState(generateBarChartData());
  const [tableData] = useState(generateTableData());
  const [showBanner, setShowBanner] = useState(true);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No data</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No data to display.
            </Box>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              We cannot find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/admin-dashboard' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
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
            <Container
              header={
                <Grid gridDefinition={[{ colspan: { default: 12, s: 8 } }, { colspan: { default: 12, s: 4 } }]}>
                  <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter data"
                  />
                  <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                      <Pagination
                        {...paginationProps}
                        ariaLabels={{
                          nextPageLabel: 'Next page',
                          previousPageLabel: 'Previous page',
                          pageLabel: (pageNumber) => `Page ${pageNumber}`,
                        }}
                      />
                      <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                    </SpaceBetween>
                  </Box>
                </Grid>
              }
            >
              <div />
            </Container>

            {showBanner && (
              <Alert type="info" statusIconAriaLabel="Info" dismissible onDismiss={() => setShowBanner(false)}>
                Demo environment: Metrics update every minute. Values may be delayed.
              </Alert>
            )}

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={areaChartData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => value.toString(),
                  }}
                  ariaLabel="Area chart"
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
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: barChartData,
                      valueFormatter: (value: number) => value.toFixed(0),
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => value.toString(),
                  }}
                  ariaLabel="Bar chart"
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
              {...collectionProps}
              columnDefinitions={COLUMN_DEFINITIONS}
              items={items}
              selectionType="multi"
              variant="container"
              stickyHeader
              resizableColumns
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) => item.id,
              }}
              pagination={<Pagination {...paginationProps} />}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
