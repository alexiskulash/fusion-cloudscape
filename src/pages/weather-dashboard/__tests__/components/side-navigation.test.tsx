// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherDashboardSideNavigation } from '../../components/side-navigation';

// Mock the SideNavigation component to test props
jest.mock('@cloudscape-design/components/side-navigation', () => {
  return function MockSideNavigation({ activeHref, header, items }: any) {
    return (
      <nav data-testid="side-navigation">
        <div data-testid="header">{header.text}</div>
        <div data-testid="active-href">{activeHref}</div>
        <div data-testid="items-count">{items.length}</div>
        {items.map((item: any, index: number) => (
          <div key={index} data-testid={`item-${index}`}>
            <span data-testid={`item-${index}-type`}>{item.type}</span>
            <span data-testid={`item-${index}-text`}>{item.text}</span>
            {item.href && <span data-testid={`item-${index}-href`}>{item.href}</span>}
            {item.items && (
              <div data-testid={`item-${index}-children`}>
                {item.items.map((child: any, childIndex: number) => (
                  <div key={childIndex} data-testid={`item-${index}-child-${childIndex}`}>
                    <span data-testid={`item-${index}-child-${childIndex}-type`}>{child.type}</span>
                    <span data-testid={`item-${index}-child-${childIndex}-text`}>{child.text}</span>
                    <span data-testid={`item-${index}-child-${childIndex}-href`}>{child.href}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  };
});

describe('WeatherDashboardSideNavigation', () => {
  it('should render the side navigation component', () => {
    render(<WeatherDashboardSideNavigation />);
    expect(screen.getByTestId('side-navigation')).toBeInTheDocument();
  });

  it('should have correct header configuration', () => {
    render(<WeatherDashboardSideNavigation />);
    expect(screen.getByTestId('header')).toHaveTextContent('Demo Hub');
  });

  it('should have correct active href', () => {
    render(<WeatherDashboardSideNavigation />);
    expect(screen.getByTestId('active-href')).toHaveTextContent('#/weather-dashboard');
  });

  it('should have the correct number of navigation items', () => {
    render(<WeatherDashboardSideNavigation />);
    expect(screen.getByTestId('items-count')).toHaveTextContent('4');
  });

  it('should render Weather Dashboard section with nested items', () => {
    render(<WeatherDashboardSideNavigation />);
    
    // Check Weather Dashboard section
    expect(screen.getByTestId('item-0-type')).toHaveTextContent('section');
    expect(screen.getByTestId('item-0-text')).toHaveTextContent('Weather Dashboard');
    
    // Check nested Current Weather link
    expect(screen.getByTestId('item-0-child-0-type')).toHaveTextContent('link');
    expect(screen.getByTestId('item-0-child-0-text')).toHaveTextContent('Current Weather');
    expect(screen.getByTestId('item-0-child-0-href')).toHaveTextContent('#/weather-dashboard');
  });

  it('should render divider item', () => {
    render(<WeatherDashboardSideNavigation />);
    expect(screen.getByTestId('item-1-type')).toHaveTextContent('divider');
  });

  it('should render Other Dashboards section with nested items', () => {
    render(<WeatherDashboardSideNavigation />);
    
    // Check Other Dashboards section
    expect(screen.getByTestId('item-2-type')).toHaveTextContent('section');
    expect(screen.getByTestId('item-2-text')).toHaveTextContent('Other Dashboards');
    
    // Check Service Dashboard link
    expect(screen.getByTestId('item-2-child-0-type')).toHaveTextContent('link');
    expect(screen.getByTestId('item-2-child-0-text')).toHaveTextContent('Service Dashboard');
    expect(screen.getByTestId('item-2-child-0-href')).toHaveTextContent('#/dashboard');
    
    // Check Configurable Dashboard link
    expect(screen.getByTestId('item-2-child-1-type')).toHaveTextContent('link');
    expect(screen.getByTestId('item-2-child-1-text')).toHaveTextContent('Configurable Dashboard');
    expect(screen.getByTestId('item-2-child-1-href')).toHaveTextContent('#/configurable-dashboard');
  });

  it('should render All Demos link', () => {
    render(<WeatherDashboardSideNavigation />);
    
    // Check All Demos link (after second divider)
    expect(screen.getByTestId('item-3-type')).toHaveTextContent('link');
    expect(screen.getByTestId('item-3-text')).toHaveTextContent('All Demos');
    expect(screen.getByTestId('item-3-href')).toHaveTextContent('#/');
  });

  it('should have proper navigation structure', () => {
    render(<WeatherDashboardSideNavigation />);
    
    // Verify that sections have child items
    expect(screen.getByTestId('item-0-children')).toBeInTheDocument();
    expect(screen.getByTestId('item-2-children')).toBeInTheDocument();
    
    // Verify dividers don't have children
    expect(screen.queryByTestId('item-1-children')).not.toBeInTheDocument();
  });
});
