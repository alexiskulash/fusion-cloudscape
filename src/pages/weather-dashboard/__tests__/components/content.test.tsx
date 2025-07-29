// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Content } from '../../components/content';

// Mock the weather widgets to avoid API calls in tests
jest.mock('../../widgets', () => ({
  currentWeatherWidget: {
    data: {
      icon: 'status-info',
      title: 'Current Weather',
      description: 'Real-time weather conditions',
      header: () => <div data-testid="current-weather-header">Current Weather Header</div>,
      content: () => <div data-testid="current-weather-content">Current Weather Content</div>,
    },
  },
  weatherConditionsWidget: {
    data: {
      icon: 'status-warning',
      title: 'Weather Conditions',
      description: 'Current atmospheric conditions',
      header: () => <div data-testid="weather-conditions-header">Weather Conditions Header</div>,
      content: () => <div data-testid="weather-conditions-content">Weather Conditions Content</div>,
    },
  },
  windInfoWidget: {
    data: {
      icon: 'status-pending',
      title: 'Wind Information',
      description: 'Current wind speed and direction',
      header: () => <div data-testid="wind-info-header">Wind Info Header</div>,
      content: () => <div data-testid="wind-info-content">Wind Info Content</div>,
    },
  },
  humidityPressureWidget: {
    data: {
      icon: 'status-info',
      title: 'Humidity & Pressure',
      description: 'Atmospheric conditions',
      header: () => <div data-testid="humidity-pressure-header">Humidity Pressure Header</div>,
      content: () => <div data-testid="humidity-pressure-content">Humidity Pressure Content</div>,
    },
  },
  uvIndexWidget: {
    data: {
      icon: 'status-warning',
      title: 'UV Index',
      description: "Today's UV index forecast",
      header: () => <div data-testid="uv-index-header">UV Index Header</div>,
      content: () => <div data-testid="uv-index-content">UV Index Content</div>,
    },
  },
  precipitationWidget: {
    data: {
      icon: 'status-warning',
      title: 'Precipitation',
      description: 'Current precipitation amounts',
      header: () => <div data-testid="precipitation-header">Precipitation Header</div>,
      content: () => <div data-testid="precipitation-content">Precipitation Content</div>,
    },
  },
  dailyForecastWidget: {
    data: {
      icon: 'calendar',
      title: 'Daily Forecast',
      description: '7-day weather forecast',
      header: () => <div data-testid="daily-forecast-header">Daily Forecast Header</div>,
      content: () => <div data-testid="daily-forecast-content">Daily Forecast Content</div>,
    },
  },
  hourlyForecastWidget: {
    data: {
      icon: 'clock',
      title: 'Hourly Forecast',
      description: 'Next 24 hours weather forecast',
      header: () => <div data-testid="hourly-forecast-header">Hourly Forecast Header</div>,
      content: () => <div data-testid="hourly-forecast-content">Hourly Forecast Content</div>,
    },
  },
}));

// Mock the BaseStaticWidget component
jest.mock('../../widgets/base-static-widget', () => ({
  BaseStaticWidget: ({ config }: { config: any }) => (
    <div data-testid={`widget-${config.title.toLowerCase().replace(/\s+/g, '-')}`}>
      <config.header />
      <config.content />
    </div>
  ),
}));

describe('Content Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<Content />);
    expect(screen.getByTestId('widget-current-weather')).toBeInTheDocument();
  });

  it('should render all 8 weather widgets', () => {
    render(<Content />);

    // Verify all widgets are rendered
    expect(screen.getByTestId('widget-current-weather')).toBeInTheDocument();
    expect(screen.getByTestId('widget-weather-conditions')).toBeInTheDocument();
    expect(screen.getByTestId('widget-wind-information')).toBeInTheDocument();
    expect(screen.getByTestId('widget-humidity-&-pressure')).toBeInTheDocument();
    expect(screen.getByTestId('widget-uv-index')).toBeInTheDocument();
    expect(screen.getByTestId('widget-precipitation')).toBeInTheDocument();
    expect(screen.getByTestId('widget-daily-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('widget-hourly-forecast')).toBeInTheDocument();
  });

  it('should render widgets in the correct order', () => {
    render(<Content />);

    const widgets = screen.getAllByTestId(/^widget-/);
    const expectedOrder = [
      'widget-current-weather',
      'widget-weather-conditions',
      'widget-wind-information',
      'widget-humidity-&-pressure',
      'widget-uv-index',
      'widget-precipitation',
      'widget-daily-forecast',
      'widget-hourly-forecast',
    ];

    widgets.forEach((widget, index) => {
      expect(widget).toHaveAttribute('data-testid', expectedOrder[index]);
    });
  });

  it('should render widget headers and content', () => {
    render(<Content />);

    // Check that headers are rendered
    expect(screen.getByTestId('current-weather-header')).toHaveTextContent('Current Weather Header');
    expect(screen.getByTestId('weather-conditions-header')).toHaveTextContent('Weather Conditions Header');
    expect(screen.getByTestId('wind-info-header')).toHaveTextContent('Wind Info Header');

    // Check that content is rendered
    expect(screen.getByTestId('current-weather-content')).toHaveTextContent('Current Weather Content');
    expect(screen.getByTestId('weather-conditions-content')).toHaveTextContent('Weather Conditions Content');
    expect(screen.getByTestId('wind-info-content')).toHaveTextContent('Wind Info Content');
  });

  it('should render forecast widgets', () => {
    render(<Content />);

    expect(screen.getByTestId('daily-forecast-header')).toHaveTextContent('Daily Forecast Header');
    expect(screen.getByTestId('daily-forecast-content')).toHaveTextContent('Daily Forecast Content');
    expect(screen.getByTestId('hourly-forecast-header')).toHaveTextContent('Hourly Forecast Header');
    expect(screen.getByTestId('hourly-forecast-content')).toHaveTextContent('Hourly Forecast Content');
  });

  it('should render atmospheric condition widgets', () => {
    render(<Content />);

    expect(screen.getByTestId('humidity-pressure-header')).toHaveTextContent('Humidity Pressure Header');
    expect(screen.getByTestId('humidity-pressure-content')).toHaveTextContent('Humidity Pressure Content');
    expect(screen.getByTestId('uv-index-header')).toHaveTextContent('UV Index Header');
    expect(screen.getByTestId('uv-index-content')).toHaveTextContent('UV Index Content');
    expect(screen.getByTestId('precipitation-header')).toHaveTextContent('Precipitation Header');
    expect(screen.getByTestId('precipitation-content')).toHaveTextContent('Precipitation Content');
  });

  it('should have correct number of widgets', () => {
    render(<Content />);
    const widgets = screen.getAllByTestId(/^widget-/);
    expect(widgets).toHaveLength(8);
  });
});
