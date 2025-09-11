// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AdministrationDashboardDemo from './index';

// Mock the navigation component
vi.mock('./navigation', () => ({
  AdminDashboardNavigation: () => <div data-testid="admin-navigation">Navigation</div>,
}));

// Mock the commons components
vi.mock('../commons', () => ({
  Breadcrumbs: ({ items }: { items: any[] }) => (
    <div data-testid="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>{item.text}</span>
      ))}
    </div>
  ),
  HelpPanelProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../commons/common-components', () => ({
  CustomAppLayout: ({ content, breadcrumbs, navigation }: any) => (
    <div data-testid="app-layout">
      {breadcrumbs}
      {navigation}
      {content}
    </div>
  ),
}));

// Mock all Cloudscape components
vi.mock('@cloudscape-design/components/app-layout', () => ({
  default: () => <div data-testid="mock-app-layout">App Layout</div>,
}));

vi.mock('@cloudscape-design/components/button', () => ({
  default: ({ children, iconName, variant, ...props }: any) => (
    <button data-testid="button" data-variant={variant} data-icon={iconName} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@cloudscape-design/components/space-between', () => ({
  default: ({ children, size, direction }: any) => (
    <div data-testid="space-between" data-size={size} data-direction={direction}>
      {children}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/container', () => ({
  default: ({ children, header }: any) => (
    <div data-testid="container">
      {header}
      {children}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/header', () => ({
  default: ({ children, variant, description, actions, counter }: any) => (
    <div data-testid="header" data-variant={variant}>
      <h1>{children}</h1>
      {description && <p>{description}</p>}
      {counter && <span data-testid="counter">{counter}</span>}
      {actions && <div data-testid="actions">{actions}</div>}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/grid', () => ({
  default: ({ children, gridDefinition }: any) => (
    <div data-testid="grid" data-cols={gridDefinition?.length}>
      {children}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/box', () => ({
  default: ({ children, variant, textAlign, width, height, style, margin, color }: any) => (
    <div
      data-testid="box"
      data-variant={variant}
      data-text-align={textAlign}
      data-color={color}
      style={{ width, height, ...style, ...margin }}
    >
      {children}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/area-chart', () => ({
  default: ({ series, xTitle, yTitle }: any) => (
    <div data-testid="area-chart">
      <div data-testid="chart-title">{xTitle} / {yTitle}</div>
      <div data-testid="chart-series-count">{series?.length || 0}</div>
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/bar-chart', () => ({
  default: ({ series, xTitle, yTitle }: any) => (
    <div data-testid="bar-chart">
      <div data-testid="chart-title">{xTitle} / {yTitle}</div>
      <div data-testid="chart-series-count">{series?.length || 0}</div>
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/table', () => ({
  default: ({ items, columnDefinitions, header, pagination, filter, ...props }: any) => (
    <div data-testid="table">
      {header}
      {filter}
      <div data-testid="table-items-count">{items?.length || 0}</div>
      <div data-testid="table-columns-count">{columnDefinitions?.length || 0}</div>
      <div data-testid="table-selection-type">{props.selectionType}</div>
      {pagination}
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/text-filter', () => ({
  default: ({ filteringText, filteringPlaceholder, onChange, countText }: any) => (
    <div data-testid="text-filter">
      <input
        data-testid="filter-input"
        value={filteringText}
        placeholder={filteringPlaceholder}
        onChange={(e) => onChange?.({ detail: { filteringText: e.target.value } })}
      />
      <span data-testid="filter-count">{countText}</span>
    </div>
  ),
}));

vi.mock('@cloudscape-design/components/pagination', () => ({
  default: ({ currentPageIndex, pagesCount, onChange }: any) => (
    <div data-testid="pagination">
      <button
        data-testid="prev-page"
        onClick={() => onChange?.({ detail: { currentPageIndex: currentPageIndex - 1 } })}
        disabled={currentPageIndex <= 1}
      >
        Previous
      </button>
      <span data-testid="page-info">{currentPageIndex} of {pagesCount}</span>
      <button
        data-testid="next-page"
        onClick={() => onChange?.({ detail: { currentPageIndex: currentPageIndex + 1 } })}
        disabled={currentPageIndex >= pagesCount}
      >
        Next
      </button>
    </div>
  ),
}));

describe('AdministrationDashboardDemo', () => {
  it('renders the dashboard with all main components', () => {
    render(<AdministrationDashboardDemo />);
    
    // Check main layout
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('admin-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    
    // Check header
    expect(screen.getByText('Administration Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Collection description')).toBeInTheDocument();
    expect(screen.getByText('Refresh Data')).toBeInTheDocument();
    
    // Check charts
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText('Performance Overview')).toBeInTheDocument();
    expect(screen.getByText('Category Performance')).toBeInTheDocument();
    
    // Check table
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByText('Data Table')).toBeInTheDocument();
  });

  it('displays correct chart data', () => {
    render(<AdministrationDashboardDemo />);
    
    const areaChartSeriesCount = screen.getByTestId('area-chart').querySelector('[data-testid="chart-series-count"]');
    const barChartSeriesCount = screen.getByTestId('bar-chart').querySelector('[data-testid="chart-series-count"]');
    
    expect(areaChartSeriesCount).toHaveTextContent('2'); // Site 1 and Site 2
    expect(barChartSeriesCount).toHaveTextContent('1'); // Site 1 only
  });

  it('displays correct table configuration', () => {
    render(<AdministrationDashboardDemo />);
    
    const table = screen.getByTestId('table');
    expect(table.querySelector('[data-testid="table-items-count"]')).toHaveTextContent('10'); // First page items
    expect(table.querySelector('[data-testid="table-columns-count"]')).toHaveTextContent('8'); // 7 data columns + selection
    expect(table.querySelector('[data-testid="table-selection-type"]')).toHaveTextContent('multi');
  });

  it('handles text filtering correctly', async () => {
    const user = userEvent.setup();
    render(<AdministrationDashboardDemo />);
    
    const filterInput = screen.getAllByTestId('filter-input')[0]; // Get the first filter input
    
    // Initial state should show all items
    expect(screen.getAllByTestId('filter-count')[0]).toHaveTextContent('12 matches');
    
    // Type in filter
    await user.type(filterInput, 'test');
    
    // Since all dummy data has "Cell Value", filtering for "test" should show 0 matches
    await waitFor(() => {
      expect(screen.getAllByTestId('filter-count')[0]).toHaveTextContent('0 matches');
    });
  });

  it('handles pagination correctly', async () => {
    const user = userEvent.setup();
    render(<AdministrationDashboardDemo />);

    const paginations = screen.getAllByTestId('pagination');
    const tablePagination = paginations[1]; // Second pagination is for the table
    const pageInfo = tablePagination.querySelector('[data-testid="page-info"]');
    const nextButton = tablePagination.querySelector('[data-testid="next-page"]') as HTMLButtonElement;
    const prevButton = tablePagination.querySelector('[data-testid="prev-page"]') as HTMLButtonElement;

    // Initial state
    expect(pageInfo).toHaveTextContent('1 of 2'); // 12 items with 10 per page = 2 pages
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Go to next page
    await user.click(nextButton);

    await waitFor(() => {
      expect(pageInfo).toHaveTextContent('2 of 2');
      expect(nextButton).toBeDisabled();
      expect(prevButton).not.toBeDisabled();
    });
  });

  it('renders breadcrumbs correctly', () => {
    render(<AdministrationDashboardDemo />);
    
    const breadcrumbs = screen.getByTestId('breadcrumbs');
    expect(breadcrumbs).toHaveTextContent('Service');
    expect(breadcrumbs).toHaveTextContent('Administrative Dashboard');
  });

  it('renders action buttons in header', () => {
    render(<AdministrationDashboardDemo />);
    
    expect(screen.getByText('Refresh Data')).toBeInTheDocument();
    expect(screen.getByText('View details')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('displays chart legends', () => {
    render(<AdministrationDashboardDemo />);

    // Area chart should have Site 1 and Site 2 legends
    const site1Legends = screen.getAllByText('Site 1');
    expect(site1Legends).toHaveLength(2); // One in area chart, one in bar chart

    const site2Legends = screen.getAllByText('Site 2');
    expect(site2Legends).toHaveLength(1); // Only in area chart

    const performanceGoalLegends = screen.getAllByText('Performance goal');
    expect(performanceGoalLegends).toHaveLength(2); // One in each chart
  });

  it('initializes with correct default state', () => {
    render(<AdministrationDashboardDemo />);

    const filterInputs = screen.getAllByTestId('filter-input');
    filterInputs.forEach(input => {
      expect(input).toHaveValue('');
    });

    const paginations = screen.getAllByTestId('pagination');
    // Check the first pagination (header pagination)
    const headerPageInfo = paginations[0].querySelector('[data-testid="page-info"]');
    expect(headerPageInfo).toHaveTextContent('1 of 2');

    // Check the second pagination (table pagination)
    const tablePageInfo = paginations[1].querySelector('[data-testid="page-info"]');
    expect(tablePageInfo).toHaveTextContent('1 of 2');
  });
});
