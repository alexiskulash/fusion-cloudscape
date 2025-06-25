// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { WeatherContent } from './components/weather-content';
import { WeatherHeader, WeatherMainInfo } from './components/weather-header';
import { WeatherSideNavigation } from './components/weather-side-navigation';

/**
 * Main Weather Dashboard Application Component
 *
 * This component serves as the main entry point for the weather dashboard application.
 * It sets up the overall layout structure using Cloudscape's AppLayout pattern and manages
 * the state for the help panel/tools sidebar functionality.
 */
export function App() {
  // State to control whether the tools panel (right sidebar) is open or closed
  const [toolsOpen, setToolsOpen] = useState(false);

  // State to control the content displayed in the tools panel
  // Initialized with WeatherMainInfo component showing dashboard information
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <WeatherMainInfo />);

  // Reference to the AppLayout component for programmatic control (e.g., focus management)
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  /**
   * Handler function for changing the tools panel content
   *
   * This function is passed to child components via HelpPanelProvider context,
   * allowing them to update the tools panel with relevant help content.
   *
   * @param content - The React node content to display in the tools panel
   */
  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true); // Automatically open the tools panel when content changes
    setToolsContent(content); // Update the tools panel content
    appLayout.current?.focusToolsClose(); // Focus the close button for accessibility
  };

  return (
    // Provide context for tools panel content management to all child components
    <HelpPanelProvider value={handleToolsContentChange}>
      {/* Main application layout using Cloudscape's CustomAppLayout wrapper */}
      <CustomAppLayout
        ref={appLayout}
        // Main content area containing the dashboard header and weather widgets
        content={
          <SpaceBetween size="m">
            {/* Dashboard header with title, description, and refresh action */}
            <WeatherHeader
              actions={
                // Primary action button to refresh weather data by reloading the page
                <Button variant="primary" iconName="refresh" onClick={() => window.location.reload()}>
                  Refresh Data
                </Button>
              }
            />
            {/* Main weather dashboard content with all widgets and functionality */}
            <WeatherContent />
          </SpaceBetween>
        }
        // Navigation breadcrumbs showing current page location
        breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/' }]} />}
        // Left sidebar navigation menu for weather dashboard sections
        navigation={<WeatherSideNavigation />}
        // Right sidebar tools panel content (help, info, tutorials)
        tools={toolsContent}
        // Control tools panel open/closed state
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        // Global notifications component for system messages
        notifications={<Notifications />}
      />
    </HelpPanelProvider>
  );
}
