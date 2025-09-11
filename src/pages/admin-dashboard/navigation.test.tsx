// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AdminDashboardNavigation } from './navigation';

// Mock SideNavigation component
vi.mock('@cloudscape-design/components/side-navigation', () => ({
  default: ({ activeHref, header, items }: any) => (
    <nav data-testid="side-navigation">
      <div data-testid="nav-header">
        <a href={header.href}>{header.text}</a>
      </div>
      <div data-testid="active-href">{activeHref}</div>
      <ul data-testid="nav-items">
        {items.map((item: any, index: number) => (
          <li key={index} data-testid="nav-item">
            {item.type === 'divider' ? (
              <hr data-testid="nav-divider" />
            ) : item.type === 'expandable-link-group' ? (
              <details data-testid="nav-expandable-group">
                <summary data-testid="nav-group-text">{item.text}</summary>
                <ul data-testid="nav-group-items">
                  {item.items?.map((subItem: any, subIndex: number) => (
                    <li key={subIndex} data-testid="nav-sub-item">
                      <a href={subItem.href}>{subItem.text}</a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <a href={item.href} data-testid="nav-link" data-external={item.external}>
                {item.text}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  ),
}));

describe('AdminDashboardNavigation', () => {
  it('renders the navigation component', () => {
    render(<AdminDashboardNavigation />);

    expect(screen.getByTestId('side-navigation')).toBeDefined();
  });

  it('sets the correct active href', () => {
    render(<AdminDashboardNavigation />);

    const activeHref = screen.getByTestId('active-href');
    expect(activeHref).toHaveTextContent('#/admin-dashboard');
  });

  it('renders the header with service name', () => {
    render(<AdminDashboardNavigation />);

    const header = screen.getByTestId('nav-header');
    expect(header).toHaveTextContent('Service name');

    const headerLink = header.querySelector('a');
    expect(headerLink).toHaveAttribute('href', '#/');
  });

  it('renders main navigation items', () => {
    render(<AdminDashboardNavigation />);

    const navLinks = screen.getAllByTestId('nav-link');
    const linkTexts = navLinks.map(link => link.textContent);

    expect(linkTexts).toContain('Overview');
    expect(linkTexts).toContain('Analytics');
    expect(linkTexts).toContain('Users');
    expect(linkTexts).toContain('Settings');
    expect(linkTexts).toContain('Support');
    expect(linkTexts).toContain('Documentation');
  });

  it('renders navigation dividers', () => {
    render(<AdminDashboardNavigation />);

    const dividers = screen.getAllByTestId('nav-divider');
    expect(dividers).toHaveLength(2); // Two dividers in the navigation
  });

  it('renders expandable navigation groups', () => {
    render(<AdminDashboardNavigation />);

    const expandableGroups = screen.getAllByTestId('nav-expandable-group');
    expect(expandableGroups).toHaveLength(2); // Reports and Administration groups

    const groupTexts = screen.getAllByTestId('nav-group-text');
    const groupNames = groupTexts.map(text => text.textContent);

    expect(groupNames).toContain('Reports');
    expect(groupNames).toContain('Administration');
  });

  it('renders Reports submenu items', () => {
    render(<AdminDashboardNavigation />);

    const subItems = screen.getAllByTestId('nav-sub-item');
    const subItemTexts = subItems.map(item => item.textContent);

    expect(subItemTexts).toContain('Performance');
    expect(subItemTexts).toContain('Usage');
    expect(subItemTexts).toContain('Revenue');
  });

  it('renders Administration submenu items', () => {
    render(<AdminDashboardNavigation />);

    const subItems = screen.getAllByTestId('nav-sub-item');
    const subItemTexts = subItems.map(item => item.textContent);

    expect(subItemTexts).toContain('User Management');
    expect(subItemTexts).toContain('Permissions');
    expect(subItemTexts).toContain('System Config');
  });

  it('has correct href attributes for main items', () => {
    render(<AdminDashboardNavigation />);

    const navLinks = screen.getAllByTestId('nav-link');

    // Find specific links and check their hrefs
    const overviewLink = navLinks.find(link => link.textContent === 'Overview');
    expect(overviewLink).toHaveAttribute('href', '#/admin-dashboard');

    const analyticsLink = navLinks.find(link => link.textContent === 'Analytics');
    expect(analyticsLink).toHaveAttribute('href', '#/admin-dashboard/analytics');

    const usersLink = navLinks.find(link => link.textContent === 'Users');
    expect(usersLink).toHaveAttribute('href', '#/admin-dashboard/users');

    const settingsLink = navLinks.find(link => link.textContent === 'Settings');
    expect(settingsLink).toHaveAttribute('href', '#/admin-dashboard/settings');
  });

  it('has correct href attributes for Reports submenu', () => {
    render(<AdminDashboardNavigation />);

    const subItems = screen.getAllByTestId('nav-sub-item');

    const performanceLink = subItems.find(item => item.textContent === 'Performance')?.querySelector('a');
    expect(performanceLink).toHaveAttribute('href', '#/admin-dashboard/reports/performance');

    const usageLink = subItems.find(item => item.textContent === 'Usage')?.querySelector('a');
    expect(usageLink).toHaveAttribute('href', '#/admin-dashboard/reports/usage');

    const revenueLink = subItems.find(item => item.textContent === 'Revenue')?.querySelector('a');
    expect(revenueLink).toHaveAttribute('href', '#/admin-dashboard/reports/revenue');
  });

  it('has correct href attributes for Administration submenu', () => {
    render(<AdminDashboardNavigation />);

    const subItems = screen.getAllByTestId('nav-sub-item');

    const userMgmtLink = subItems.find(item => item.textContent === 'User Management')?.querySelector('a');
    expect(userMgmtLink).toHaveAttribute('href', '#/admin-dashboard/admin/users');

    const permissionsLink = subItems.find(item => item.textContent === 'Permissions')?.querySelector('a');
    expect(permissionsLink).toHaveAttribute('href', '#/admin-dashboard/admin/permissions');

    const configLink = subItems.find(item => item.textContent === 'System Config')?.querySelector('a');
    expect(configLink).toHaveAttribute('href', '#/admin-dashboard/admin/config');
  });

  it('marks documentation link as external', () => {
    render(<AdminDashboardNavigation />);

    const navLinks = screen.getAllByTestId('nav-link');
    const docLink = navLinks.find(link => link.textContent === 'Documentation');

    expect(docLink).toHaveAttribute('data-external', 'true');
    expect(docLink).toHaveAttribute('href', '#/admin-dashboard/docs');
  });

  it('renders support link', () => {
    render(<AdminDashboardNavigation />);

    const navLinks = screen.getAllByTestId('nav-link');
    const supportLink = navLinks.find(link => link.textContent === 'Support');

    expect(supportLink).toHaveAttribute('href', '#/admin-dashboard/support');
  });

  it('has the correct structure with proper nesting', () => {
    render(<AdminDashboardNavigation />);

    // Check that we have the expected number of navigation items
    const navItems = screen.getAllByTestId('nav-item');
    expect(navItems).toHaveLength(10); // 6 regular items + 2 expandable groups + 2 dividers

    // Check that expandable groups have sub-items
    const expandableGroups = screen.getAllByTestId('nav-expandable-group');
    expandableGroups.forEach(group => {
      const groupItems = group.querySelector('[data-testid="nav-group-items"]');
      expect(groupItems).toBeInTheDocument();
    });
  });
});
