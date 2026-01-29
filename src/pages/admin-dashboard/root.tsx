// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';

import { CustomAppLayout } from '../commons/common-components';
import { Notifications } from '../non-console/notifications';
import { isVisualRefresh } from '../../common/apply-mode';
import logo from '../non-console/logo.svg';

const navItems: SideNavigationProps.Item[] = [
  {
    type: 'link',
    text: 'Service',
    href: '#/service',
  },
];

const breadcrumbs = [
  {
    text: 'Service',
    href: '#/service',
  },
  {
    text: 'Administrative Dashboard',
    href: '#',
  },
];

const i18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
  { id: 'profile', text: 'Profile' },
  { id: 'preferences', text: 'Preferences' },
  { id: 'security', text: 'Security' },
  {
    id: 'support-group',
    text: 'Support',
    items: [
      {
        id: 'documentation',
        text: 'Documentation',
        href: '#',
        external: true,
        externalIconAriaLabel: ' (opens in new tab)',
      },
      { id: 'feedback', text: 'Feedback', href: '#', external: true, externalIconAriaLabel: ' (opens in new tab)' },
      { id: 'support', text: 'Customer support' },
    ],
  },
  { id: 'signout', text: 'Sign out' },
];

// Sample data for area chart
const areaChartData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 2 },
      { x: 'x2', y: 3 },
      { x: 'x3', y: 4 },
      { x: 'x4', y: 4.5 },
      { x: 'x5', y: 4.8 },
      { x: 'x6', y: 5 },
      { x: 'x7', y: 5.2 },
      { x: 'x8', y: 5.3 },
      { x: 'x9', y: 5.5 },
      { x: 'x10', y: 5.6 },
      { x: 'x11', y: 5.7 },
      { x: 'x12', y: 5.5 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 3.5 },
      { x: 'x3', y: 4 },
      { x: 'x4', y: 4.2 },
      { x: 'x5', y: 4.5 },
      { x: 'x6', y: 4.8 },
      { x: 'x7', y: 5 },
      { x: 'x8', y: 5.5 },
      { x: 'x9', y: 6 },
      { x: 'x10', y: 6.2 },
      { x: 'x11', y: 6.3 },
      { x: 'x12', y: 5 },
    ],
    valueFormatter: (value: number) => `y${value}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
    valueFormatter: (value: number) => `y${value}`,
  },
];

// Sample data for bar chart
const barChartData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 4.5 },
      { x: 'x2', y: 6 },
      { x: 'x3', y: 5.5 },
      { x: 'x4', y: 3.5 },
      { x: 'x5', y: 5.5 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 3.5,
    valueFormatter: (value: number) => `y${value}`,
  },
];

// Sample table data
const tableItems = Array.from({ length: 12 }, (_, i) => ({
  id: `item-${i + 1}`,
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const tableColumnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => '',
    width: 50,
  },
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

const Content = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <Box padding={{ top: isVisualRefresh ? 's' : 'n' }}>
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

        <Container>
          <SpaceBetween size="m">
            <div className="search-pagination-container">
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 8 } }, { colspan: { default: 12, xs: 4 } }]}>
                <Input
                  type="search"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  ariaLabel="Search"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </div>
              </Grid>
            </div>
          </SpaceBetween>
        </Container>

        <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
          <Container>
            <AreaChart
              series={areaChartData as any}
              xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
              yDomain={[0, 7]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                detailPopoverDismissAriaLabel: 'Dismiss',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'area chart',
                xTickFormatter: (value: any) => value,
                yTickFormatter: (value: number) => `y${value}`,
              }}
              ariaLabel="Area chart"
              height={300}
              hideFilter
              hideLegend={false}
              xScaleType="categorical"
              xTitle="X-axis label"
              yTitle="y-axis label"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No data available</b>
                </Box>
              }
              noMatch={
                <Box textAlign="center" color="inherit">
                  <b>No matching data</b>
                </Box>
              }
            />
          </Container>

          <Container>
            <BarChart
              series={barChartData as any}
              xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
              yDomain={[0, 7]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                detailPopoverDismissAriaLabel: 'Dismiss',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'bar chart',
                xTickFormatter: (value: any) => value,
                yTickFormatter: (value: number) => `y${value}`,
              }}
              ariaLabel="Bar chart"
              height={300}
              hideFilter
              hideLegend={false}
              xScaleType="categorical"
              xTitle="X-axis label"
              yTitle="y-axis label"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No data available</b>
                </Box>
              }
              noMatch={
                <Box textAlign="center" color="inherit">
                  <b>No matching data</b>
                </Box>
              }
            />
          </Container>
        </Grid>

        <Table
          columnDefinitions={tableColumnDefinitions}
          items={tableItems}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          ariaLabels={{
            selectionGroupLabel: 'Items selection',
            allItemsSelectionLabel: () => 'select all',
            itemSelectionLabel: ({ selectedItems }, item) => {
              const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
              return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
            },
          }}
          variant="container"
        />
      </SpaceBetween>
    </Box>
  );
};

interface DemoHeaderPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: DemoHeaderPortalProps) => {
  const domNode = document.querySelector('#h')!;
  return createPortal(children, domNode);
};

export function App() {
  const [topNavSearchValue, setTopNavSearchValue] = useState('');

  return (
    <>
      <DemoHeaderPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: 'Service name',
            logo: { src: logo, alt: 'Service name logo' },
          }}
          search={
            <Input
              ariaLabel="Search"
              clearAriaLabel="Clear"
              value={topNavSearchValue}
              type="search"
              placeholder="Search"
              onChange={({ detail }) => setTopNavSearchValue(detail.value)}
            />
          }
          utilities={[
            {
              type: 'button',
              text: 'Link',
              href: '#',
              external: true,
              externalIconAriaLabel: ' (opens in new tab)',
            },
            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications',
              badge: true,
              disableUtilityCollapse: true,
            },
            { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
            {
              type: 'menu-dropdown',
              text: 'Customer name',
              iconName: 'user-profile',
              items: profileActions,
            },
          ]}
        />
      </DemoHeaderPortal>
      <CustomAppLayout
        stickyNotifications
        toolsHide
        navigation={<SideNavigation activeHref="#/service" items={navItems} />}
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
        content={<Content />}
        notifications={<Notifications />}
      />
    </>
  );
}
