// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Custom React Hooks for Weather Data Management
 *
 * This module provides specialized hooks for fetching and managing weather data
 * from the Open-Meteo API with proper React state management, error handling,
 * and loading states.
 *
 * Features:
 * - Automatic data fetching on component mount
 * - Loading states for UI feedback
 * - Comprehensive error handling with user-friendly messages
 * - Manual refetch capability for data refresh
 * - Location-based data fetching with customizable coordinates
 * - Proper cleanup and dependency management
 *
 * Each hook follows the same pattern:
 * 1. Initialize loading state
 * 2. Fetch data from API
 * 3. Handle success/error states
 * 4. Provide refetch functionality
 */

import { useEffect, useState } from 'react';

import {
  DEFAULT_LOCATION,
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchHourlyForecast,
  WeatherLocation,
  WeatherResponse,
} from '../services/weather-api';

/**
 * Standard return interface for all weather data hooks
 * Provides consistent API across different weather data types
 */
interface UseWeatherDataResult {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCurrentWeather(location: WeatherLocation = DEFAULT_LOCATION): UseWeatherDataResult {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCurrentWeather(location);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.latitude, location.longitude]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export function useHourlyForecast(location: WeatherLocation = DEFAULT_LOCATION): UseWeatherDataResult {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchHourlyForecast(location);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hourly forecast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.latitude, location.longitude]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export function useDailyForecast(location: WeatherLocation = DEFAULT_LOCATION): UseWeatherDataResult {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDailyForecast(location);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch daily forecast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.latitude, location.longitude]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
