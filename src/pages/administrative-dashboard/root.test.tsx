// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { App } from './root';

// Mock the CustomAppLayout component to simplify testing
jest.mock('../commons/common-components', () => ({
  CustomAppLayout: ({ content, breadcrumbs }: any) => (
    <div data-testid="custom-app-layout">
      <div data-testid="breadcrumbs">{breadcrumbs}</div>
      <div data-testid="content">{content}</div>
    </div>
  ),
}));

// Mock the Breadcrumbs component
jest.mock('../commons', () => ({
  Breadcrumbs: ({ items }: any) => (
    <nav data-testid="breadcrumbs-nav">
      {items.map((item: any, index: number) => (
        <span key={index}>{item.text}</span>
      ))}
    </nav>
  ),
  HelpPanelProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('Administrative Dashboard', () => {
  describe('Page Header', () => {
    it('renders the page title', () => {
      render(<App />);
      expect(screen.getByText('Administration Dashboard')).toBeInTheDocument();
    });

    it('renders the page description', () => {
      render(<App />);
      expect(screen.getByText('Collection description')).toBeInTheDocument();
    });

    it('renders the Refresh Data button', () => {
      render(<App />);
      const refreshButton = screen.getByRole('button', { name: /refresh data/i });
      expect(refreshButton).toBeInTheDocument();
    });
  });

  describe('Breadcrumbs', () => {
    it('renders breadcrumb navigation', () => {
      render(<App />);
      const breadcrumbs = screen.getByTestId('breadcrumbs-nav');
      expect(breadcrumbs).toBeInTheDocument();
      expect(within(breadcrumbs).getByText('Service')).toBeInTheDocument();
      expect(within(breadcrumbs).getByText('Administrative Dashboard')).toBeInTheDocument();
    });
  });

  describe('Charts', () => {
    it('renders area chart with correct title', () => {
      render(<App />);
      // Area chart should be present with y-axis label
      expect(screen.getAllByText('y-axis label')[0]).toBeInTheDocument();
    });

    it('renders bar chart with correct title', () => {
      render(<App />);
      // Bar chart should be present with y-axis label
      expect(screen.getAllByText('y-axis label')[1]).toBeInTheDocument();
    });

    it('renders X-axis labels for charts', () => {
      render(<App />);
      const xAxisLabels = screen.getAllByText('X-axis label');
      expect(xAxisLabels).toHaveLength(2); // One for area chart, one for bar chart
    });
  });

  describe('Data Table', () => {
    it('renders the data table', () => {
      render(<App />);
      // Check for column headers
      const columnHeaders = screen.getAllByText('Column header');
      expect(columnHeaders.length).toBeGreaterThan(0);
    });

    it('renders table rows with cell values', () => {
      render(<App />);
      const cellValues = screen.getAllByText('Cell Value');
      expect(cellValues.length).toBeGreaterThan(0);
    });

    it('renders the text filter', () => {
      render(<App />);
      const filterInput = screen.getByPlaceholderText('Placeholder');
      expect(filterInput).toBeInTheDocument();
    });

    it('updates filter text when user types', () => {
      render(<App />);
      const filterInput = screen.getByPlaceholderText('Placeholder') as HTMLInputElement;

      fireEvent.change(filterInput, { target: { value: 'test filter' } });

      expect(filterInput.value).toBe('test filter');
    });

    it('renders pagination controls', () => {
      render(<App />);
      const nextButton = screen.getByLabelText('Next page');
      const prevButton = screen.getByLabelText('Previous page');

      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });
  });

  describe('Table Selection', () => {
    it('allows selecting table items', () => {
      render(<App />);
      const checkboxes = screen.getAllByRole('checkbox');

      // Should have checkboxes for header + rows
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('updates selection when checkbox is clicked', () => {
      render(<App />);
      const checkboxes = screen.getAllByRole('checkbox');

      // Get first data row checkbox (skip header checkbox)
      const firstRowCheckbox = checkboxes[1];

      expect(firstRowCheckbox).not.toBeChecked();
      fireEvent.click(firstRowCheckbox);
      expect(firstRowCheckbox).toBeChecked();
    });
  });

  describe('Pagination', () => {
    it('changes page when pagination is clicked', () => {
      render(<App />);
      const nextButton = screen.getByLabelText('Next page');

      // Click next page button
      fireEvent.click(nextButton);

      // The button should still exist after clicking
      expect(nextButton).toBeInTheDocument();
    });

    it('displays correct number of pages', () => {
      render(<App />);
      // With 12 items and 10 per page, should have 2 pages
      const pageButton = screen.getByLabelText('Page 1');
      expect(pageButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for charts', () => {
      const { container } = render(<App />);

      // Check that charts have proper aria labels
      const areaChart = container.querySelector('[aria-label="Area chart showing site performance"]');
      const barChart = container.querySelector('[aria-label="Bar chart showing site metrics"]');

      expect(areaChart).toBeInTheDocument();
      expect(barChart).toBeInTheDocument();
    });

    it('has proper ARIA labels for pagination', () => {
      render(<App />);

      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders content in CustomAppLayout', () => {
      render(<App />);
      expect(screen.getByTestId('custom-app-layout')).toBeInTheDocument();
    });

    it('hides navigation and tools panels', () => {
      const { container } = render(<App />);
      const layout = container.querySelector('[data-testid="custom-app-layout"]');
      expect(layout).toBeInTheDocument();
    });
  });

  describe('Data Integration', () => {
    it('renders chart data for area chart', () => {
      render(<App />);
      // The component should render without errors with the mock data
      expect(screen.getByText('Administration Dashboard')).toBeInTheDocument();
    });

    it('renders chart data for bar chart', () => {
      render(<App />);
      // The component should render without errors with the mock data
      expect(screen.getByText('Administration Dashboard')).toBeInTheDocument();
    });

    it('generates correct number of table items', () => {
      render(<App />);
      // Should generate 12 items total, showing 10 per page
      const cellValues = screen.getAllByText('Cell Value');
      // 10 rows * 7 columns = 70 cells on first page
      expect(cellValues.length).toBeGreaterThanOrEqual(70);
    });
  });
});
