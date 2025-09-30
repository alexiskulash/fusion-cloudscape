// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Navigation } from '../../commons';

const adminNavItems = [
  {
    type: 'section',
    text: 'Administrative Dashboard',
    items: [
      { type: 'link', text: 'Overview', href: '#/admin-dashboard' },
      { type: 'link', text: 'System Metrics', href: '#/admin-dashboard/metrics' },
      { type: 'link', text: 'Performance Analytics', href: '#/admin-dashboard/analytics' },
    ],
  },
  {
    type: 'section',
    text: 'System Management',
    items: [
      { type: 'link', text: 'User Management', href: '#/admin-dashboard/users' },
      { type: 'link', text: 'Configuration', href: '#/admin-dashboard/config' },
      { type: 'link', text: 'Security Settings', href: '#/admin-dashboard/security' },
      { type: 'link', text: 'Audit Logs', href: '#/admin-dashboard/logs' },
    ],
  },
] as const;

export function AdminDashboardSideNavigation() {
  return <Navigation activeHref="#/admin-dashboard" items={adminNavItems} />;
}
