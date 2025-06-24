// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  is_day: boolean;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  visibility: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Record<string, string>;
  current: CurrentWeather;
  hourly_units: Record<string, string>;
  hourly: HourlyWeather;
  daily_units: Record<string, string>;
  daily: DailyWeather;
}

export interface WeatherAlert {
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: string;
}

export interface AirQualityData {
  time: string[];
  pm10: number[];
  pm2_5: number[];
  carbon_monoxide: number[];
  nitrogen_dioxide: number[];
  ozone: number[];
  us_aqi: number[];
  european_aqi: number[];
}

export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly_units: Record<string, string>;
  hourly: AirQualityData;
}

// Weather code mappings based on WMO codes
export const weatherCodeMappings: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sunny' },
  1: { description: 'Mainly clear', icon: 'partly-sunny' },
  2: { description: 'Partly cloudy', icon: 'partly-cloudy' },
  3: { description: 'Overcast', icon: 'cloudy' },
  45: { description: 'Fog', icon: 'fog' },
  48: { description: 'Depositing rime fog', icon: 'fog' },
  51: { description: 'Light drizzle', icon: 'drizzle' },
  53: { description: 'Moderate drizzle', icon: 'drizzle' },
  55: { description: 'Dense drizzle', icon: 'drizzle' },
  56: { description: 'Light freezing drizzle', icon: 'sleet' },
  57: { description: 'Dense freezing drizzle', icon: 'sleet' },
  61: { description: 'Light rain', icon: 'rain' },
  63: { description: 'Moderate rain', icon: 'rain' },
  65: { description: 'Heavy rain', icon: 'heavy-rain' },
  66: { description: 'Light freezing rain', icon: 'sleet' },
  67: { description: 'Heavy freezing rain', icon: 'sleet' },
  71: { description: 'Light snow fall', icon: 'snow' },
  73: { description: 'Moderate snow fall', icon: 'snow' },
  75: { description: 'Heavy snow fall', icon: 'heavy-snow' },
  77: { description: 'Snow grains', icon: 'snow' },
  80: { description: 'Light rain showers', icon: 'showers' },
  81: { description: 'Moderate rain showers', icon: 'showers' },
  82: { description: 'Violent rain showers', icon: 'heavy-rain' },
  85: { description: 'Light snow showers', icon: 'snow' },
  86: { description: 'Heavy snow showers', icon: 'heavy-snow' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm' },
  96: { description: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm' },
};
