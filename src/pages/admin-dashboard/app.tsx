// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';

import { DashboardContent } from './content';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: {
            src: '',
            alt: 'Logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: 'https://example.com/',
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
            description: 'Customer name',
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
                  {
                    id: 'feedback',
                    text: 'Feedback',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)',
                  },
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
              { text: 'Service', href: '#' },
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
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              }
            >
              Adminstration Dashboard
            </Header>

            <Container>
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                ]}
              >
                <Input
                  type="search"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  ariaLabel="Search"
                />
                <div className="pagination-wrapper">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Go to page ${pageNumber}`,
                    }}
                  />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </div>
              </Grid>
            </Container>

            <DashboardContent />
          </SpaceBetween>
        }
      />
    </>
  );
}
