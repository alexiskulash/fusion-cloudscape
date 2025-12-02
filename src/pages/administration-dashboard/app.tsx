// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import { ChartSection } from './chart-section';
import { DataTable } from './data-table';

export function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');

  return (
    <>
      <TopNavigation
        identity={{
          href: '#/',
          title: 'Service name',
          logo: {
            src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Crect width="16" height="16" fill="%23232F3E"/%3E%3C/svg%3E',
            alt: 'Service Logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#/',
            external: true,
            externalIconAriaLabel: ' (opens in a new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
            items: [
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
                    href: '#/',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)',
                  },
                  { id: 'support', text: 'Support' },
                ],
              },
              { id: 'signout', text: 'Sign out' },
            ],
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
      />

      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/administration-dashboard' },
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
              Administration Dashboard
            </Header>

            <Container>
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xxs: 12, xs: 8 } },
                  { colspan: { default: 12, xxs: 12, xs: 4 } },
                ]}
              >
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter data"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
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
                    <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                  </SpaceBetween>
                </Box>
              </Grid>
            </Container>

            <ChartSection />

            <DataTable />
          </SpaceBetween>
        }
      />
    </>
  );
}
