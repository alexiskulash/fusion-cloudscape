// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Weather Dashboard Application Component
 *
 * This is the main application component for the weather dashboard that orchestrates
 * the overall layout and user interface. It implements the standard Cloudscape
 * application layout pattern with navigation, tools panel, and main content area.
 *
 * Key Features:
 * - Full Cloudscape Design System integration
 * - Responsive layout with collapsible navigation and tools panel
 * - Help panel with contextual weather dashboard information
 * - Global notifications support for system messages
 * - Breadcrumb navigation for clear user orientation
 * - Refresh functionality for manual data updates
 *
 * Layout Structure:
 * - Header: Dashboard title, description, and action buttons
 * - Navigation: Weather dashboard specific navigation menu
 * - Content: Main grid with 8 weather widgets
 * - Tools: Help panel with dashboard information and data sources
 * - Notifications: Global notification area for system messages
 *
 * State Management:
 * - Tools panel open/closed state
 * - Dynamic tools content based on user interactions
 * - AppLayout ref management for focus control
 *
 * The component follows Cloudscape best practices for dashboard applications
 * and provides a professional, accessible user experience.
 */

import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { WeatherDashboardHeader, WeatherDashboardMainInfo } from './components/header';
import { WeatherDashboardSideNavigation } from './components/side-navigation';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

/**
 * Main Weather Dashboard Application Component
 *
 * Renders the complete weather dashboard interface with all necessary
 * layout components, state management, and user interaction handlers.
 */
export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <WeatherDashboardMainInfo />);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <WeatherDashboardHeader actions={<Button variant="primary">Refresh data</Button>} />
            <Content />
          </SpaceBetween>
        }
        breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/weather-dashboard' }]} />}
        navigation={<WeatherDashboardSideNavigation />}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
