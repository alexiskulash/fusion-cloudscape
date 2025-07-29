// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { renderHook, waitFor } from '@testing-library/react';
import { useCurrentWeather, useHourlyForecast, useDailyForecast } from '../../hooks/use-weather-data';
import * as weatherApi from '../../services/weather-api';

// Mock the weather API
jest.mock('../../services/weather-api');

const mockWeatherApi = weatherApi as jest.Mocked<typeof weatherApi>;

describe('Weather Data Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCurrentWeather', () => {
    it('should return loading state initially', () => {
      mockWeatherApi.fetchCurrentWeather.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useCurrentWeather());

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
    });

    it('should return weather data on successful fetch', async () => {
      const mockData = {
        current: {
          temperature_2m: 20,
          relative_humidity_2m: 65,
          weather_code: 1,
          time: '2023-01-01T12:00',
          wind_speed_10m: 10,
          pressure_msl: 1013,
          apparent_temperature: 22,
          is_day: 1,
          precipitation: 0,
          rain: 0,
          showers: 0,
          snowfall: 0,
          cloud_cover: 25,
          surface_pressure: 1012,
          wind_direction_10m: 180,
          wind_gusts_10m: 15,
        },
        latitude: 52.52,
        longitude: 13.41,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 74,
      };

      mockWeatherApi.fetchCurrentWeather.mockResolvedValue(mockData);

      const { result } = renderHook(() => useCurrentWeather());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    it('should handle API errors gracefully', async () => {
      const errorMessage = 'API Error';
      mockWeatherApi.fetchCurrentWeather.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useCurrentWeather());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(errorMessage);
    });

    it('should handle non-Error objects', async () => {
      mockWeatherApi.fetchCurrentWeather.mockRejectedValue('String error');

      const { result } = renderHook(() => useCurrentWeather());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to fetch weather data');
    });

    it('should refetch data when refetch is called', async () => {
      const initialData = { current: { temperature_2m: 20 } };
      const updatedData = { current: { temperature_2m: 25 } };

      mockWeatherApi.fetchCurrentWeather
        .mockResolvedValueOnce(initialData as any)
        .mockResolvedValueOnce(updatedData as any);

      const { result } = renderHook(() => useCurrentWeather());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(initialData);

      // Call refetch
      result.current.refetch();

      await waitFor(() => {
        expect(result.current.data).toEqual(updatedData);
      });

      expect(mockWeatherApi.fetchCurrentWeather).toHaveBeenCalledTimes(2);
    });

    it('should use custom location when provided', async () => {
      const customLocation = {
        latitude: 40.7128,
        longitude: -74.006,
        name: 'New York',
      };

      mockWeatherApi.fetchCurrentWeather.mockResolvedValue({} as any);

      renderHook(() => useCurrentWeather(customLocation));

      await waitFor(() => {
        expect(mockWeatherApi.fetchCurrentWeather).toHaveBeenCalledWith(customLocation);
      });
    });
  });

  describe('useHourlyForecast', () => {
    it('should return loading state initially', () => {
      mockWeatherApi.fetchHourlyForecast.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useHourlyForecast());

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
    });

    it('should return hourly forecast data on successful fetch', async () => {
      const mockData = {
        hourly: {
          time: ['2023-01-01T00:00', '2023-01-01T01:00'],
          temperature_2m: [20, 19],
          relative_humidity_2m: [65, 70],
          precipitation_probability: [0, 10],
          precipitation: [0, 0.1],
          weather_code: [1, 2],
          wind_speed_10m: [10, 12],
          wind_direction_10m: [180, 190],
        },
        latitude: 52.52,
        longitude: 13.41,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 74,
      };

      mockWeatherApi.fetchHourlyForecast.mockResolvedValue(mockData as any);

      const { result } = renderHook(() => useHourlyForecast());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    it('should handle fetch errors', async () => {
      const errorMessage = 'Hourly forecast error';
      mockWeatherApi.fetchHourlyForecast.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useHourlyForecast());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('useDailyForecast', () => {
    it('should return loading state initially', () => {
      mockWeatherApi.fetchDailyForecast.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useDailyForecast());

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
    });

    it('should return daily forecast data on successful fetch', async () => {
      const mockData = {
        daily: {
          time: ['2023-01-01', '2023-01-02'],
          weather_code: [1, 3],
          temperature_2m_max: [25, 23],
          temperature_2m_min: [15, 13],
          apparent_temperature_max: [27, 25],
          apparent_temperature_min: [13, 11],
          sunrise: ['2023-01-01T07:30', '2023-01-02T07:31'],
          sunset: ['2023-01-01T17:30', '2023-01-02T17:31'],
          daylight_duration: [36000, 36000],
          sunshine_duration: [28800, 25200],
          uv_index_max: [3, 2],
          uv_index_clear_sky_max: [4, 3],
          precipitation_sum: [0, 2.5],
          rain_sum: [0, 2.5],
          showers_sum: [0, 0],
          snowfall_sum: [0, 0],
          precipitation_hours: [0, 3],
          precipitation_probability_max: [0, 80],
          precipitation_probability_min: [0, 20],
          precipitation_probability_mean: [0, 50],
          wind_speed_10m_max: [15, 20],
          wind_gusts_10m_max: [25, 35],
          wind_direction_10m_dominant: [180, 200],
          shortwave_radiation_sum: [5000, 4500],
          et0_fao_evapotranspiration: [2.5, 2.0],
        },
        latitude: 52.52,
        longitude: 13.41,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'GMT',
        timezone_abbreviation: 'GMT',
        elevation: 74,
      };

      mockWeatherApi.fetchDailyForecast.mockResolvedValue(mockData as any);

      const { result } = renderHook(() => useDailyForecast());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    it('should handle fetch errors', async () => {
      const errorMessage = 'Daily forecast error';
      mockWeatherApi.fetchDailyForecast.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDailyForecast());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
    });
  });
});
