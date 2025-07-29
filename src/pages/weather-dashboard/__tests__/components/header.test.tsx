// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherDashboardHeader, WeatherDashboardMainInfo } from '../../components/header';

describe('Weather Dashboard Header Components', () => {
  describe('WeatherDashboardHeader', () => {
    it('should render the header with title and description', () => {
      render(<WeatherDashboardHeader />);

      expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Real-time weather data and forecasts powered by Open-Meteo API')).toBeInTheDocument();
    });

    it('should render actions when provided', () => {
      const mockActions = <button data-testid="refresh-button">Refresh</button>;
      render(<WeatherDashboardHeader actions={mockActions} />);

      expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    it('should not render actions section when not provided', () => {
      render(<WeatherDashboardHeader />);

      expect(screen.queryByTestId('refresh-button')).not.toBeInTheDocument();
    });
  });

  describe('WeatherDashboardMainInfo', () => {
    it('should render all information sections', () => {
      render(<WeatherDashboardMainInfo />);

      // Check main headings
      expect(screen.getByText('About this dashboard')).toBeInTheDocument();
      expect(screen.getByText('Data source')).toBeInTheDocument();
      expect(screen.getByText('Default location')).toBeInTheDocument();
    });

    it('should render about section content', () => {
      render(<WeatherDashboardMainInfo />);

      expect(screen.getByText(/This weather dashboard provides comprehensive weather information/)).toBeInTheDocument();
      expect(screen.getByText(/including current conditions, hourly forecasts, and daily forecasts/)).toBeInTheDocument();
    });

    it('should render data source information', () => {
      render(<WeatherDashboardMainInfo />);

      expect(screen.getByText(/All weather data is provided by Open-Meteo/)).toBeInTheDocument();
      expect(screen.getByText(/an open-source weather API/)).toBeInTheDocument();
    });

    it('should render default location information', () => {
      render(<WeatherDashboardMainInfo />);

      expect(screen.getByText(/The dashboard displays weather data for Berlin, Germany/)).toBeInTheDocument();
      expect(screen.getByText(/52.52°N, 13.41°E/)).toBeInTheDocument();
    });

    it('should have proper structure with SpaceBetween and Box components', () => {
      const { container } = render(<WeatherDashboardMainInfo />);

      // Should contain the expected number of sections
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });
  });
});
