// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';

import { ExternalLinkGroup, InfoLink, useHelpPanel } from '../../commons';

export function AdminDashboardMainInfo() {
  return (
    <HelpPanel
      header={<h2>Administration Dashboard</h2>}
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Administration Guide' },
            { href: '#', text: 'System Management Documentation' },
            { href: '#', text: 'API Reference' },
            { href: '#', text: 'Best Practices Guide' },
          ]}
        />
      }
    >
      <p>
        The Administration Dashboard provides comprehensive system monitoring and management capabilities. Monitor key 
        performance indicators, manage system resources, and access detailed operational data to ensure optimal 
        system performance and reliability.
      </p>
    </HelpPanel>
  );
}

export function AdminDashboardHeader() {
  const loadHelpPanelContent = useHelpPanel();
  
  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
  };

  return (
    <Header
      variant="h1"
      description="Collection description"
      info={<InfoLink onFollow={() => loadHelpPanelContent(<AdminDashboardMainInfo />)} />}
      actions={
        <Button variant="primary" iconName="refresh" onClick={handleRefreshData}>
          Refresh Data
        </Button>
      }
    >
      Administration Dashboard
    </Header>
  );
}
