// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useRef } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { Breadcrumbs, HelpPanelProvider } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { AdminDashboardNavigation } from './navigation';

// Dummy data for charts
const areaChartRaw = [
  { date: 'Jan', site1: 45, site2: 52 },
  { date: 'Feb', site1: 48, site2: 49 },
  { date: 'Mar', site1: 52, site2: 45 },
  { date: 'Apr', site1: 61, site2: 42 },
  { date: 'May', site1: 55, site2: 48 },
  { date: 'Jun', site1: 67, site2: 52 },
  { date: 'Jul', site1: 61, site2: 45 },
  { date: 'Aug', site1: 64, site2: 49 },
  { date: 'Sep', site1: 62, site2: 52 },
  { date: 'Oct', site1: 68, site2: 48 },
  { date: 'Nov', site1: 66, site2: 51 },
  { date: 'Dec', site1: 72, site2: 54 },
];

const barChartRaw = [
  { category: 'x1', value: 45 },
  { category: 'x2', value: 67 },
  { category: 'x3', value: 58 },
  { category: 'x4', value: 39 },
  { category: 'x5', value: 62 },
];

// Dummy data for table
const tableData = [
  { id: '1', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '2', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '3', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '4', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '5', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '6', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '7', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '8', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '9', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '10', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '11', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
  { id: '12', columnHeader1: 'Cell Value', columnHeader2: 'Cell Value', columnHeader3: 'Cell Value', columnHeader4: 'Cell Value', columnHeader5: 'Cell Value', columnHeader6: 'Cell Value', columnHeader7: 'Cell Value' },
];

const columnDefinitions = [
  { id: 'selection', header: '', cell: () => '', width: 50, minWidth: 50 },
  { id: 'columnHeader1', header: 'Column header', cell: (item: any) => item.columnHeader1, sortingField: 'columnHeader1' },
  { id: 'columnHeader2', header: 'Column header', cell: (item: any) => item.columnHeader2, sortingField: 'columnHeader2' },
  { id: 'columnHeader3', header: 'Column header', cell: (item: any) => item.columnHeader3, sortingField: 'columnHeader3' },
  { id: 'columnHeader4', header: 'Column header', cell: (item: any) => item.columnHeader4, sortingField: 'columnHeader4' },
  { id: 'columnHeader5', header: 'Column header', cell: (item: any) => item.columnHeader5, sortingField: 'columnHeader5' },
  { id: 'columnHeader6', header: 'Column header', cell: (item: any) => item.columnHeader6, sortingField: 'columnHeader6' },
  { id: 'columnHeader7', header: 'Column header', cell: (item: any) => item.columnHeader7, sortingField: 'columnHeader7' },
];

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const itemsPerPage = 10;
  const filteredItems = tableData.filter(item =>
    Object.values(item).some(value => value.toString().toLowerCase().includes(filterText.toLowerCase())),
  );
  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const areaSeries = [
    { title: 'Site 1', type: 'area', data: areaChartRaw.map(d => ({ x: d.date, y: d.site1 })) },
    { title: 'Site 2', type: 'area', data: areaChartRaw.map(d => ({ x: d.date, y: d.site2 })) },
  ];
  const barSeries = [{ title: 'Site 1', type: 'bar', data: barChartRaw.map(d => ({ x: d.category, y: d.value })) }];

  return (
    <HelpPanelProvider value={() => {}}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="l">
            <Header
              variant="h1"
              description="Collection description"
              actions={
                <Button variant="primary" iconName="refresh">
                  Refresh Data
                </Button>
              }
            >
              Administration Dashboard
            </Header>

            <Container>
              <SpaceBetween size="m">
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 6, m: 8, l: 8, xl: 8 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 4, xl: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter items"
                    countText={`${filteredItems.length} matches`}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                  <Box textAlign="right">
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Pagination
                        currentPageIndex={currentPageIndex}
                        pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                        ariaLabels={{
                          nextPageLabel: 'Next page',
                          previousPageLabel: 'Previous page',
                          pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                        }}
                      />
                      <Box color="text-body-secondary">|</Box>
                      <Button variant="icon" iconName="settings" />
                    </SpaceBetween>
                  </Box>
                </Grid>
              </SpaceBetween>
            </Container>

            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container header={<Header variant="h2">Performance Overview</Header>}>
                <AreaChart
                  series={areaSeries}
                  xDomain={areaChartRaw.map(d => d.date)}
                  xScaleType="categorical"
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  hideFilter
                  hideLegend
                  height={300}
                />
                <Box margin={{ top: 'xs' }}>
                  <SpaceBetween direction="horizontal" size="m">
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Box width="12px" height="12px" style={{ backgroundColor: '#3184f0' }} />
                      <Box variant="small">Site 1</Box>
                    </SpaceBetween>
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Box width="12px" height="12px" style={{ backgroundColor: '#ff6b9d' }} />
                      <Box variant="small">Site 2</Box>
                    </SpaceBetween>
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Box width="2px" height="12px" style={{ backgroundColor: '#666', borderStyle: 'dashed' }} />
                      <Box variant="small">Performance goal</Box>
                    </SpaceBetween>
                  </SpaceBetween>
                </Box>
              </Container>

              <Container header={<Header variant="h2">Category Performance</Header>}>
                <BarChart
                  series={barSeries}
                  xDomain={barChartRaw.map(d => d.category)}
                  xTitle="X-axis label"
                  yTitle="y-axis label"
                  hideFilter
                  hideLegend
                  height={300}
                />
                <Box margin={{ top: 'xs' }}>
                  <SpaceBetween direction="horizontal" size="m">
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Box width="12px" height="12px" style={{ backgroundColor: '#3184f0' }} />
                      <Box variant="small">Site 1</Box>
                    </SpaceBetween>
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Box width="2px" height="12px" style={{ backgroundColor: '#666', borderStyle: 'dashed' }} />
                      <Box variant="small">Performance goal</Box>
                    </SpaceBetween>
                  </SpaceBetween>
                </Box>
              </Container>
            </Grid>

            <Container>
              <Table
                columnDefinitions={columnDefinitions}
                items={paginatedItems}
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.columnHeader1} is ${isItemSelected ? '' : 'not '}selected`;
                  },
                }}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No resources</b>
                    <Box variant="p" color="inherit">No resources to display.</Box>
                  </Box>
                }
                filter={
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Search items"
                    countText={`${filteredItems.length} matches`}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                }
                header={
                  <Header
                    counter={
                      selectedItems.length ? `(${selectedItems.length}/${filteredItems.length})` : `(${filteredItems.length})`
                    }
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button>View details</Button>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </SpaceBetween>
                    }
                  >
                    Data Table
                  </Header>
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
              />
            </Container>
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/admin-dashboard' },
            ]}
          />
        }
        navigation={<AdminDashboardNavigation />}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      />
    </HelpPanelProvider>
  );
}

export default function AdministrationDashboardDemo() {
  return <App />;
}
