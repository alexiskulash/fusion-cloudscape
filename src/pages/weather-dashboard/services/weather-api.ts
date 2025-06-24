// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { WeatherLocation, WeatherResponse, AirQualityResponse } from '../types';

const BASE_URL = 'https://api.open-meteo.com/v1';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1';

/**
 * Fetches current weather and forecast data from Open-Meteo API
 */
export async function fetchWeatherData(location: WeatherLocation): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'is_day',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'visibility',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(','),
    timezone: 'auto',
    forecast_days: '7',
  });

  try {
    const response = await fetch(`${BASE_URL}/forecast?${params}`);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetches air quality data from Open-Meteo Air Quality API
 */
export async function fetchAirQualityData(location: WeatherLocation): Promise<AirQualityResponse> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    hourly: ['pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'ozone', 'us_aqi', 'european_aqi'].join(','),
    timezone: 'auto',
    forecast_days: '3',
  });

  try {
    const response = await fetch(`${AIR_QUALITY_URL}/air-quality?${params}`);
    if (!response.ok) {
      throw new Error(`Air Quality API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw new Error(`Failed to fetch air quality data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get user's geolocation using browser API
 */
export function getCurrentLocation(): Promise<WeatherLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        let errorMessage = 'Unable to retrieve location';
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

/**
 * Geocoding service to get location name from coordinates
 */
export async function getLocationName(location: WeatherLocation): Promise<{ city?: string; country?: string }> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${location.latitude}&longitude=${location.longitude}&count=1&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    const result = data.results?.[0];

    return {
      city: result?.name || result?.admin1,
      country: result?.country,
    };
  } catch (error) {
    console.error('Error getting location name:', error);
    return {};
  }
}

/**
 * Popular cities for quick selection
 */
export const popularCities: (WeatherLocation & { city: string; country: string })[] = [
  { latitude: 40.7128, longitude: -74.006, city: 'New York', country: 'USA' },
  { latitude: 51.5074, longitude: -0.1278, city: 'London', country: 'UK' },
  { latitude: 48.8566, longitude: 2.3522, city: 'Paris', country: 'France' },
  { latitude: 35.6762, longitude: 139.6503, city: 'Tokyo', country: 'Japan' },
  { latitude: -33.8688, longitude: 151.2093, city: 'Sydney', country: 'Australia' },
  { latitude: 37.7749, longitude: -122.4194, city: 'San Francisco', country: 'USA' },
  { latitude: 52.52, longitude: 13.405, city: 'Berlin', country: 'Germany' },
  { latitude: 55.7558, longitude: 37.6176, city: 'Moscow', country: 'Russia' },
  { latitude: 19.076, longitude: 72.8777, city: 'Mumbai', country: 'India' },
  { latitude: -23.5505, longitude: -46.6333, city: 'São Paulo', country: 'Brazil' },
];
