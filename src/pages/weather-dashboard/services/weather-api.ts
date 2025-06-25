// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { WeatherApiResponse, WeatherData, WeatherLocation } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export class WeatherApiService {
  static async fetchWeatherData(location: WeatherLocation): Promise<WeatherData> {
    const params = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      current: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'wind_direction_10m', 'weather_code'].join(
        ',',
      ),
      hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'wind_speed_10m', 'weather_code'].join(','),
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'weather_code',
        'precipitation_sum',
        'wind_speed_10m_max',
      ].join(','),
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh',
      precipitation_unit: 'mm',
      timezone: 'auto',
      forecast_days: '7',
    });

    const url = `${BASE_URL}?${params.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
      }

      const data: WeatherApiResponse = await response.json();

      return this.transformApiResponse(data, location);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      }
      throw new Error('Failed to fetch weather data: Unknown error');
    }
  }

  private static transformApiResponse(apiData: WeatherApiResponse, location: WeatherLocation): WeatherData {
    return {
      current: {
        temperature: apiData.current.temperature_2m,
        humidity: apiData.current.relative_humidity_2m,
        windSpeed: apiData.current.wind_speed_10m,
        windDirection: apiData.current.wind_direction_10m,
        weatherCode: apiData.current.weather_code,
        time: apiData.current.time,
      },
      hourly: {
        time: apiData.hourly.time.slice(0, 24), // Next 24 hours
        temperature: apiData.hourly.temperature_2m.slice(0, 24),
        humidity: apiData.hourly.relative_humidity_2m.slice(0, 24),
        precipitation: apiData.hourly.precipitation.slice(0, 24),
        windSpeed: apiData.hourly.wind_speed_10m.slice(0, 24),
        weatherCode: apiData.hourly.weather_code.slice(0, 24),
      },
      daily: {
        time: apiData.daily.time,
        temperatureMax: apiData.daily.temperature_2m_max,
        temperatureMin: apiData.daily.temperature_2m_min,
        weatherCode: apiData.daily.weather_code,
        precipitation: apiData.daily.precipitation_sum,
        windSpeed: apiData.daily.wind_speed_10m_max,
      },
      location: {
        ...location,
        timezone: apiData.timezone,
      },
    };
  }

  static async getUserLocation(): Promise<WeatherLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            name: 'Current Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          let errorMessage = 'Failed to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      );
    });
  }
}
