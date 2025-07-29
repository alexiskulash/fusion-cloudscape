// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useEffect, useState } from 'react';

import {
  DEFAULT_LOCATION,
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchHourlyForecast,
  WeatherLocation,
  WeatherResponse,
} from '../services/weather-api';

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
