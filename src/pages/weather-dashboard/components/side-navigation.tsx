// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function WeatherDashboardSideNavigation() {
  return (
    <SideNavigation
      activeHref="#/weather-dashboard"
      header={{ href: '#/', text: 'Demo Hub' }}
      items={[
        { type: 'section', text: 'Weather Dashboard' },
        {
          type: 'link',
          text: 'Current Weather',
          href: '#/weather-dashboard',
        },
        { type: 'divider' },
        { type: 'section', text: 'Other Dashboards' },
        {
          type: 'link',
          text: 'Service Dashboard',
          href: '#/dashboard',
        },
        {
          type: 'link',
          text: 'Configurable Dashboard',
          href: '#/configurable-dashboard',
        },
        { type: 'divider' },
        { type: 'section', text: 'Demo Hub' },
        {
          type: 'link',
          text: 'All Demos',
          href: '#/',
        },
      ]}
    />
  );
}
