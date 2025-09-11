// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminDashboard from './root';

// Mock the main component
vi.mock('./index', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-dashboard-app">Admin Dashboard App</div>,
}));

describe('AdminDashboard Root Component', () => {
  it('renders the admin dashboard app component', () => {
    render(<AdminDashboard />);

    expect(screen.getByTestId('admin-dashboard-app')).toBeInTheDocument();
    expect(screen.getByText('Admin Dashboard App')).toBeInTheDocument();
  });

  it('is a valid React component', () => {
    const component = AdminDashboard;
    expect(typeof component).toBe('function');
  });

  it('returns the App component without any additional wrappers', () => {
    const { container } = render(<AdminDashboard />);

    // Should have one direct child which is the mocked App component
    expect(container.firstChild).toEqual(screen.getByTestId('admin-dashboard-app'));
  });
});
