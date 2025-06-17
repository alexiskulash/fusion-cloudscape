// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface CurrentWeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  time: string;
}

export interface HourlyForecastData {
  time: string[];
  temperature: number[];
  humidity: number[];
  precipitation: number[];
  weatherCode: number[];
  windSpeed: number[];
}

export interface DailyForecastData {
  time: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  precipitation: number[];
  weatherCode: number[];
  windSpeedMax: number[];
  uvIndexMax: number[];
}

export interface WeatherResponse {
  current: CurrentWeatherData;
  hourly: HourlyForecastData;
  daily: DailyForecastData;
}

// Default locations for the demo
export const defaultLocations: WeatherLocation[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
  { name: 'São Paulo', latitude: -23.5505, longitude: -46.6333 },
];

// Weather code descriptions based on WMO Weather Interpretation Codes
export const weatherDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sunny' },
  1: { description: 'Mainly clear', icon: 'sunny' },
  2: { description: 'Partly cloudy', icon: 'cloudy' },
  3: { description: 'Overcast', icon: 'cloudy' },
  45: { description: 'Fog', icon: 'fog' },
  48: { description: 'Depositing rime fog', icon: 'fog' },
  51: { description: 'Light drizzle', icon: 'rainy' },
  53: { description: 'Moderate drizzle', icon: 'rainy' },
  55: { description: 'Dense drizzle', icon: 'rainy' },
  61: { description: 'Slight rain', icon: 'rainy' },
  63: { description: 'Moderate rain', icon: 'rainy' },
  65: { description: 'Heavy rain', icon: 'rainy' },
  71: { description: 'Slight snow', icon: 'snowy' },
  73: { description: 'Moderate snow', icon: 'snowy' },
  75: { description: 'Heavy snow', icon: 'snowy' },
  95: { description: 'Thunderstorm', icon: 'stormy' },
  96: { description: 'Thunderstorm with hail', icon: 'stormy' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'stormy' },
};

export function getWeatherDescription(code: number) {
  return weatherDescriptions[code] || { description: 'Unknown', icon: 'cloudy' };
}

export async function fetchWeatherData(location: WeatherLocation): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure',
      'visibility',
    ].join(','),
    hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'weather_code', 'wind_speed_10m'].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'weather_code',
      'wind_speed_10m_max',
      'uv_index_max',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timeformat: 'iso8601',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      pressure: data.current.surface_pressure,
      visibility: data.current.visibility,
      time: data.current.time,
    },
    hourly: {
      time: data.hourly.time.slice(0, 24), // Next 24 hours
      temperature: data.hourly.temperature_2m.slice(0, 24),
      humidity: data.hourly.relative_humidity_2m.slice(0, 24),
      precipitation: data.hourly.precipitation.slice(0, 24),
      weatherCode: data.hourly.weather_code.slice(0, 24),
      windSpeed: data.hourly.wind_speed_10m.slice(0, 24),
    },
    daily: {
      time: data.daily.time,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      precipitation: data.daily.precipitation_sum,
      weatherCode: data.daily.weather_code,
      windSpeedMax: data.daily.wind_speed_10m_max,
      uvIndexMax: data.daily.uv_index_max,
    },
  };
}

// Mock data generator for demo purposes
export function generateMockWeatherData(location: WeatherLocation): WeatherResponse {
  const baseTemp = Math.random() * 30 + 5; // 5-35°C
  const currentTime = new Date().toISOString();

  return {
    current: {
      temperature: Math.round(baseTemp + Math.random() * 10 - 5),
      humidity: Math.round(Math.random() * 40 + 40), // 40-80%
      precipitation: Math.random() * 10, // 0-10mm
      weatherCode: [0, 1, 2, 3, 61, 63][Math.floor(Math.random() * 6)],
      windSpeed: Math.round(Math.random() * 25), // 0-25 km/h
      windDirection: Math.round(Math.random() * 360), // 0-360°
      pressure: Math.round(Math.random() * 50 + 990), // 990-1040 hPa
      visibility: Math.round(Math.random() * 20 + 5), // 5-25 km
      time: currentTime,
    },
    hourly: {
      time: Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() + i);
        return date.toISOString();
      }),
      temperature: Array.from({ length: 24 }, () => Math.round(baseTemp + Math.random() * 8 - 4)),
      humidity: Array.from({ length: 24 }, () => Math.round(Math.random() * 40 + 40)),
      precipitation: Array.from({ length: 24 }, () => Math.random() * 5),
      weatherCode: Array.from({ length: 24 }, () => [0, 1, 2, 3, 61][Math.floor(Math.random() * 5)]),
      windSpeed: Array.from({ length: 24 }, () => Math.round(Math.random() * 20)),
    },
    daily: {
      time: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
      }),
      temperatureMax: Array.from({ length: 7 }, () => Math.round(baseTemp + Math.random() * 8)),
      temperatureMin: Array.from({ length: 7 }, () => Math.round(baseTemp - Math.random() * 8)),
      precipitation: Array.from({ length: 7 }, () => Math.random() * 15),
      weatherCode: Array.from({ length: 7 }, () => [0, 1, 2, 3, 61, 63][Math.floor(Math.random() * 6)]),
      windSpeedMax: Array.from({ length: 7 }, () => Math.round(Math.random() * 30)),
      uvIndexMax: Array.from({ length: 7 }, () => Math.round(Math.random() * 10)),
    },
  };
}
