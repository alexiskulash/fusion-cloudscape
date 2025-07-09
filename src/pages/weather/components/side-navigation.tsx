// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function WeatherSideNavigation() {
  return (
    <SideNavigation
      activeHref="#current"
      header={{ href: '#/', text: 'Weather Dashboard' }}
      items={[
        { type: 'link', text: 'Current Weather', href: '#current' },
        { type: 'link', text: 'Hourly Forecast', href: '#hourly' },
        { type: 'link', text: 'Daily Forecast', href: '#daily' },
        { type: 'divider' },
        { type: 'link', text: 'Locations', href: '#locations' },
        { type: 'link', text: 'Settings', href: '#settings' },
      ]}
    />
  );
}
