// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const navigationItems: SideNavigationProps['items'] = [
  { type: 'link', text: 'Current Weather', href: '#current' },
  { type: 'link', text: 'Hourly Forecast', href: '#hourly' },
  { type: 'link', text: 'Daily Forecast', href: '#daily' },
  { type: 'link', text: 'Charts', href: '#charts' },
  { type: 'divider' },
  { type: 'link', text: 'Location Settings', href: '#location' },
  { type: 'link', text: 'Data Source', href: '#data-source', external: true },
];

export function WeatherSideNavigation() {
  return (
    <SideNavigation
      activeHref="#current"
      header={{
        href: '#/',
        text: 'Weather Dashboard',
      }}
      items={navigationItems}
    />
  );
}
