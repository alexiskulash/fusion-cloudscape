// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  time: string;
}

export interface HourlyForecast {
  time: string[];
  temperature: number[];
  humidity: number[];
  precipitation: number[];
  windSpeed: number[];
  weatherCode: number[];
}

export interface DailyForecast {
  time: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  weatherCode: number[];
  precipitation: number[];
  windSpeed: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  location: WeatherLocation;
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
}

// Weather code mappings based on WMO Weather interpretation codes
export const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Light freezing drizzle', icon: '🌨️' },
  57: { description: 'Dense freezing drizzle', icon: '🌨️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Light freezing rain', icon: '🌨️' },
  67: { description: 'Heavy freezing rain', icon: '🌨️' },
  71: { description: 'Slight snow fall', icon: '❄️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌦️' },
  82: { description: 'Violent rain showers', icon: '🌧️' },
  85: { description: 'Slight snow showers', icon: '❄️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export const POPULAR_CITIES: WeatherLocation[] = [
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.006 },
  { name: 'London, UK', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 },
  { name: 'Berlin, Germany', latitude: 52.52, longitude: 13.405 },
  { name: 'San Francisco, USA', latitude: 37.7749, longitude: -122.4194 },
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { name: 'Dubai, UAE', latitude: 25.2048, longitude: 55.2708 },
  { name: 'São Paulo, Brazil', latitude: -23.5505, longitude: -46.6333 },
];
