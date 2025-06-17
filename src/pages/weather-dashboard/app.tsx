// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { WeatherDashboardHeader, WeatherDashboardInfo } from './components/header';
import { WeatherSideNavigation } from './components/side-navigation';
import { WeatherSettingsProvider } from './context/weather-settings';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  // State management for the tools panel (right sidebar) visibility
  const [toolsOpen, setToolsOpen] = useState(false);
  // Content displayed in the tools panel, defaulting to weather dashboard info
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <WeatherDashboardInfo />);
  // Reference to the app layout component for programmatic control
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  /**
   * Handles changes to the tools panel content and automatically opens the panel
   * @param content - React component to display in the tools panel
   */
  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    // Focus the close button for accessibility when tools panel opens
    appLayout.current?.focusToolsClose();
  };

  return (
    {/* Provide weather settings context (location, temperature unit) to all child components */}
    <WeatherSettingsProvider>
      {/* Provide help panel functionality context for interactive help content */}
      <HelpPanelProvider value={handleToolsContentChange}>
        <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <WeatherDashboardHeader
              actions={
                {/* Refresh button that reloads the entire page to fetch fresh weather data */}
                <Button
                  variant="primary"
                  iconName="refresh"
                  onClick={() => window.location.reload()} // Full page reload to refresh all weather widgets
                >
                  Refresh data
                </Button>
              }
            />
            {/* Main dashboard content with all weather widgets */}
            <Content />
          </SpaceBetween>
        }
        breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/weather-dashboard' }]} />}
        navigation={<WeatherSideNavigation />}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
        />
      </HelpPanelProvider>
    </WeatherSettingsProvider>
  );
}