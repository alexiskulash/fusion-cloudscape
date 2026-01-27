// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import '../../styles/base.scss';

// Sample data for the charts - simulating realistic metrics over time
const areaChartData = [
  {
    title: 'North America Traffic',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 12500 },
      { x: new Date('2024-02-01'), y: 14200 },
      { x: new Date('2024-03-01'), y: 15800 },
      { x: new Date('2024-04-01'), y: 18300 },
      { x: new Date('2024-05-01'), y: 21500 },
      { x: new Date('2024-06-01'), y: 24100 },
      { x: new Date('2024-07-01'), y: 26700 },
      { x: new Date('2024-08-01'), y: 25300 },
      { x: new Date('2024-09-01'), y: 28900 },
      { x: new Date('2024-10-01'), y: 31200 },
      { x: new Date('2024-11-01'), y: 29800 },
      { x: new Date('2024-12-01'), y: 33500 },
    ],
  },
  {
    title: 'Europe Traffic',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 8900 },
      { x: new Date('2024-02-01'), y: 10200 },
      { x: new Date('2024-03-01'), y: 9500 },
      { x: new Date('2024-04-01'), y: 11800 },
      { x: new Date('2024-05-01'), y: 14200 },
      { x: new Date('2024-06-01'), y: 16500 },
      { x: new Date('2024-07-01'), y: 15900 },
      { x: new Date('2024-08-01'), y: 17400 },
      { x: new Date('2024-09-01'), y: 19200 },
      { x: new Date('2024-10-01'), y: 20800 },
      { x: new Date('2024-11-01'), y: 22100 },
      { x: new Date('2024-12-01'), y: 21500 },
    ],
  },
  {
    title: 'Asia Pacific Traffic',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 6200 },
      { x: new Date('2024-02-01'), y: 7800 },
      { x: new Date('2024-03-01'), y: 8900 },
      { x: new Date('2024-04-01'), y: 10500 },
      { x: new Date('2024-05-01'), y: 12800 },
      { x: new Date('2024-06-01'), y: 14200 },
      { x: new Date('2024-07-01'), y: 16900 },
      { x: new Date('2024-08-01'), y: 18500 },
      { x: new Date('2024-09-01'), y: 20100 },
      { x: new Date('2024-10-01'), y: 22700 },
      { x: new Date('2024-11-01'), y: 24300 },
      { x: new Date('2024-12-01'), y: 26800 },
    ],
  },
];

const barChartData = [
  { x: 'Q1 2024', y: 18300 },
  { x: 'Q2 2024', y: 25700 },
  { x: 'Q3 2024', y: 21300 },
  { x: 'Q4 2024', y: 29400 },
  { x: 'Q1 2025', y: 32100 },
  { x: 'Q2 2025 (Projected)', y: 35800 },
];

// Sample table data - simulating resource metrics
const generateTableData = () => {
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-northeast-1'];
  const statuses = ['Active', 'Idle', 'Maintenance', 'Active', 'Active', 'Idle'];
  const instanceTypes = ['t3.large', 't3.xlarge', 'm5.large', 'm5.xlarge', 'c5.large', 'c5.xlarge'];

  const data = [];
  for (let i = 0; i < 12; i++) {
    const region = regions[i % regions.length];
    const cpuUsage = Math.floor(Math.random() * 60) + 20;
    const memoryUsage = Math.floor(Math.random() * 70) + 15;
    const networkIO = (Math.random() * 500 + 100).toFixed(2);

    data.push({
      id: `resource-${i + 1}`,
      column1: `srv-${region}-${String(i + 1).padStart(3, '0')}`,
      column2: region,
      column3: instanceTypes[i % instanceTypes.length],
      column4: statuses[i % statuses.length],
      column5: `${cpuUsage}%`,
      column6: `${memoryUsage}%`,
      column7: `${networkIO} Mbps`,
    });
  }
  return data;
};

export default function AdminDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const tableData = generateTableData();

  const columnDefinitions = [
    {
      id: 'column1',
      header: 'Resource ID',
      cell: (item: any) => item.column1,
      sortingField: 'column1',
      width: 180,
    },
    {
      id: 'column2',
      header: 'Region',
      cell: (item: any) => item.column2,
      sortingField: 'column2',
      width: 140,
    },
    {
      id: 'column3',
      header: 'Instance Type',
      cell: (item: any) => item.column3,
      sortingField: 'column3',
      width: 130,
    },
    {
      id: 'column4',
      header: 'Status',
      cell: (item: any) => item.column4,
      sortingField: 'column4',
      width: 110,
    },
    {
      id: 'column5',
      header: 'CPU Usage',
      cell: (item: any) => item.column5,
      sortingField: 'column5',
      width: 110,
    },
    {
      id: 'column6',
      header: 'Memory Usage',
      cell: (item: any) => item.column6,
      sortingField: 'column6',
      width: 130,
    },
    {
      id: 'column7',
      header: 'Network I/O',
      cell: (item: any) => item.column7,
      sortingField: 'column7',
      width: 120,
    },
  ];

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      navigationHide
      toolsHide
      content={
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
            Administration Dashboard
          </Header>

          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
            ]}
          >
            <Container>
              <AreaChart
                series={areaChartData}
                xDomain={[new Date('2024-01-01'), new Date('2024-12-01')]}
                yDomain={[0, 35000]}
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xAxisAriaRoleDescription: 'x axis',
                  yAxisAriaRoleDescription: 'y axis',
                }}
                ariaLabel="Area chart example"
                height={300}
                xScaleType="time"
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
                  },
                ]}
                xDomain={barChartData.map(d => d.x)}
                yDomain={[0, 40000]}
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  xAxisAriaRoleDescription: 'x axis',
                  yAxisAriaRoleDescription: 'y axis',
                }}
                ariaLabel="Bar chart example"
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
            columnDefinitions={columnDefinitions}
            items={tableData}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            ariaLabels={{
              selectionGroupLabel: 'Items selection',
              allItemsSelectionLabel: () => 'select all',
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
              },
            }}
            header={
              <Header
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Placeholder"
                      filteringAriaLabel="Filter table items"
                      onChange={({ detail }) => setFilterText(detail.filteringText)}
                    />
                  </SpaceBetween>
                }
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
                  pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                }}
              />
            }
            preferences={<Button iconName="settings" variant="icon" ariaLabel="Preferences" />}
          />
        </SpaceBetween>
      }
    />
  );
}
