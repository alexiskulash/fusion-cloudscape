// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function WeatherSideNavigation() {
  return (
    <SideNavigation
      activeHref="#/"
      header={{ href: '#/', text: 'Weather Service' }}
      items={[
        { type: 'link', text: 'Dashboard', href: '#/weather-dashboard' },
        { type: 'divider' },
        {
          type: 'section',
          text: 'Weather Data',
          items: [
            { type: 'link', text: 'Current Conditions', href: '#/weather-dashboard/current' },
            { type: 'link', text: 'Forecasts', href: '#/weather-dashboard/forecasts' },
            { type: 'link', text: 'Historical Data', href: '#/weather-dashboard/historical' },
          ],
        },
        {
          type: 'section',
          text: 'Locations',
          items: [
            { type: 'link', text: 'Manage Locations', href: '#/weather-dashboard/locations' },
            { type: 'link', text: 'Favorites', href: '#/weather-dashboard/favorites' },
          ],
        },
        { type: 'divider' },
        {
          type: 'section',
          text: 'Settings',
          items: [
            { type: 'link', text: 'Units & Preferences', href: '#/weather-dashboard/settings' },
            { type: 'link', text: 'Alerts', href: '#/weather-dashboard/alerts' },
          ],
        },
      ]}
    />
  );
}
