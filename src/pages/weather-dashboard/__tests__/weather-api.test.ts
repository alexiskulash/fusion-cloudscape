// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchDailyForecast,
  getWeatherDescription,
  getWeatherIcon,
  getWindDirection,
  DEFAULT_LOCATION,
  WeatherLocation,
} from '../services/weather-api';

// Mock fetch for testing
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Weather API Service', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchCurrentWeather', () => {
    it('should fetch current weather data with default location', async () => {
      const mockResponse = {
        current: {
          temperature_2m: 20,
          relative_humidity_2m: 65,
          weather_code: 1,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCurrentWeather();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('api.open-meteo.com/v1/forecast'),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch current weather data with custom location', async () => {
      const customLocation: WeatherLocation = {
        latitude: 40.7128,
        longitude: -74.006,
        name: 'New York',
      };

      const mockResponse = {
        current: {
          temperature_2m: 15,
          relative_humidity_2m: 70,
          weather_code: 3,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCurrentWeather(customLocation);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`latitude=${customLocation.latitude}`),
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`longitude=${customLocation.longitude}`),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(fetchCurrentWeather()).rejects.toThrow(
        'Failed to fetch weather data: Internal Server Error',
      );
    });
  });

  describe('fetchHourlyForecast', () => {
    it('should fetch hourly forecast data', async () => {
      const mockResponse = {
        hourly: {
          time: ['2023-01-01T00:00', '2023-01-01T01:00'],
          temperature_2m: [20, 19],
          precipitation_probability: [0, 10],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchHourlyForecast();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('hourly='),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include correct forecast parameters in request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchHourlyForecast();

      const url = mockFetch.mock.calls[0][0];
      expect(url).toContain('temperature_2m');
      expect(url).toContain('precipitation_probability');
      expect(url).toContain('weather_code');
      expect(url).toContain('forecast_days=3');
    });
  });

  describe('fetchDailyForecast', () => {
    it('should fetch daily forecast data', async () => {
      const mockResponse = {
        daily: {
          time: ['2023-01-01', '2023-01-02'],
          temperature_2m_max: [25, 23],
          temperature_2m_min: [15, 13],
          weather_code: [1, 3],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDailyForecast();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('daily='),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include 7-day forecast parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchDailyForecast();

      const url = mockFetch.mock.calls[0][0];
      expect(url).toContain('forecast_days=7');
    });
  });

  describe('getWeatherDescription', () => {
    it('should return correct descriptions for known weather codes', () => {
      expect(getWeatherDescription(0)).toBe('Clear sky');
      expect(getWeatherDescription(1)).toBe('Mainly clear');
      expect(getWeatherDescription(2)).toBe('Partly cloudy');
      expect(getWeatherDescription(3)).toBe('Overcast');
      expect(getWeatherDescription(61)).toBe('Slight rain');
      expect(getWeatherDescription(95)).toBe('Thunderstorm');
    });

    it('should return "Unknown" for unknown weather codes', () => {
      expect(getWeatherDescription(999)).toBe('Unknown');
      expect(getWeatherDescription(-1)).toBe('Unknown');
    });
  });

  describe('getWeatherIcon', () => {
    it('should return correct icons for clear weather', () => {
      expect(getWeatherIcon(0, true)).toBe('sun');
      expect(getWeatherIcon(0, false)).toBe('moon');
    });

    it('should return correct icons for cloudy weather', () => {
      expect(getWeatherIcon(1, true)).toBe('sun-cloud');
      expect(getWeatherIcon(2, false)).toBe('moon-cloud');
    });

    it('should return correct icons for precipitation', () => {
      expect(getWeatherIcon(61, true)).toBe('rain');
      expect(getWeatherIcon(71, true)).toBe('snow');
      expect(getWeatherIcon(95, true)).toBe('thunderstorm');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct compass directions', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(270)).toBe('W');
    });

    it('should handle intermediate directions', () => {
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(315)).toBe('NW');
    });

    it('should handle edge cases and wrapping', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(22.5)).toBe('NNE');
    });
  });

  describe('DEFAULT_LOCATION', () => {
    it('should have correct Berlin coordinates', () => {
      expect(DEFAULT_LOCATION.latitude).toBe(52.52);
      expect(DEFAULT_LOCATION.longitude).toBe(13.41);
      expect(DEFAULT_LOCATION.name).toBe('Berlin, Germany');
    });
  });
});
