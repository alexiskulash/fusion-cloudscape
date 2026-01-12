// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Administration Dashboard - Main Application Component
 *
 * This component provides a comprehensive admin dashboard interface featuring:
 * - Top navigation with global search, notifications, and user profile
 * - Breadcrumb navigation for context
 * - Page header with refresh action
 * - Responsive chart visualizations (Area and Bar charts)
 * - Sortable, filterable data table with pagination
 *
 * The layout uses Cloudscape Design System components for consistency
 * and follows AWS console design patterns.
 */

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

import '../../styles/admin-dashboard.scss';

export function App() {
  // State for global search input in top navigation
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      {/*
        Top Navigation Bar
        Provides global navigation, branding, search, and user utilities.
        Uses a dark theme consistent with AWS console patterns.
      */}
      <TopNavigation
        identity={{
          href: '/',
          title: 'Service name',
          logo: {
            // Base64-encoded SVG logo (43x31px) displaying "Logo" text
            // This is a placeholder - replace with actual service logo in production
            // The SVG contains a bordered rectangle with white text reading "Logo"
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCA0MyAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIHJ4PSIyIiBmaWxsPSJub25lIiBzdHJva2U9IiNEMUQ1REIiLz48dGV4dCB4PSI2IiB5PSIyMiIgZmlsbD0iI0ZCRkJGQiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Mb2dvPC90ZXh0Pjwvc3ZnPg==',
            alt: 'Service Logo',
          },
        }}
        utilities={[
          // Notifications button with badge indicator
          // The badge prop shows a blue dot when there are unread notifications
          // disableUtilityCollapse ensures it stays visible on smaller screens
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
          },
          // Settings button - links to application settings
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          // User profile dropdown menu
          // Provides access to user account settings and support resources
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
                // Nested submenu for support-related links
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
        // Internationalization strings for screen readers and accessibility
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
        }}
        // Global search input field
        // Allows users to search across the entire application
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

      {/*
        Main Application Layout
        - navigationHide: Hides the side navigation panel
        - toolsHide: Hides the tools/help panel on the right
        - This creates a full-width layout suitable for dashboard content
      */}
      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          // Breadcrumb navigation showing current location hierarchy
          // Service (root) > Administrative Dashboard (current page)
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
            {/*
              Page Header
              - Primary heading (h1) for the dashboard
              - Includes description text and refresh action button
              - The external icon indicates data refresh functionality
            */}
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

            {/*
              Main Dashboard Content Container
              Contains two primary sections stacked vertically:
              1. DashboardCharts - Displays Area and Bar charts side-by-side
              2. DashboardTable - Shows sortable, filterable data table
            */}
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
