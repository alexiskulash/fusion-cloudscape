// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function AdminDashboardNavigation() {
  return (
    <SideNavigation
      activeHref="#/admin-dashboard"
      header={{ text: 'Service name', href: '#/' }}
      items={[
        { type: 'link', text: 'Overview', href: '#/admin-dashboard' },
        { type: 'link', text: 'Analytics', href: '#/admin-dashboard/analytics' },
        { type: 'link', text: 'Users', href: '#/admin-dashboard/users' },
        { type: 'link', text: 'Settings', href: '#/admin-dashboard/settings' },
        { type: 'divider' },
        {
          type: 'expandable-link-group',
          text: 'Reports',
          href: '#/admin-dashboard/reports',
          items: [
            { type: 'link', text: 'Performance', href: '#/admin-dashboard/reports/performance' },
            { type: 'link', text: 'Usage', href: '#/admin-dashboard/reports/usage' },
            { type: 'link', text: 'Revenue', href: '#/admin-dashboard/reports/revenue' },
          ],
        },
        {
          type: 'expandable-link-group',
          text: 'Administration',
          href: '#/admin-dashboard/admin',
          items: [
            { type: 'link', text: 'User Management', href: '#/admin-dashboard/admin/users' },
            { type: 'link', text: 'Permissions', href: '#/admin-dashboard/admin/permissions' },
            { type: 'link', text: 'System Config', href: '#/admin-dashboard/admin/config' },
          ],
        },
        { type: 'divider' },
        { type: 'link', text: 'Support', href: '#/admin-dashboard/support' },
        { type: 'link', text: 'Documentation', href: '#/admin-dashboard/docs', external: true },
      ]}
    />
  );
}
