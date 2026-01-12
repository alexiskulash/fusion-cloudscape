// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useMemo } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import Input from '@cloudscape-design/components/input';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';

import { DashboardCharts } from './components/charts';
import { DashboardTable } from './components/table';

export function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <TopNavigation
        identity={{
          href: '/',
          title: 'Service name',
          logo: {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCA0MyAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIHJ4PSIyIiBmaWxsPSJub25lIiBzdHJva2U9IiNEMUQ1REIiLz48dGV4dCB4PSI2IiB5PSIyMiIgZmlsbD0iI0ZCRkJGQiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Mb2dvPC90ZXh0Pjwvc3ZnPg==',
            alt: 'Service Logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
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
                    href: '#',
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
        }}
        search={
          <Input
            type="search"
            placeholder="Search"
            ariaLabel="Search"
            value={searchValue}
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
      />

      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '/' },
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
              <SpaceBetween size="l">
                <DashboardCharts />
                <DashboardTable />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        }
      />
    </>
  );
}
