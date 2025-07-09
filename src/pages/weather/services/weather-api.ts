// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  timezone?: string;
}

export interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  precipitation: number;
  cloudCover: number;
  visibility: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

export interface HourlyForecast {
  time: string[];
  temperature: number[];
  precipitation: number[];
  windSpeed: number[];
  humidity: number[];
  pressure: number[];
  cloudCover: number[];
  weatherCode: number[];
}

export interface DailyForecast {
  time: string[];
  temperatureMax: number[];
  temperatureMin: number[];
  precipitation: number[];
  windSpeedMax: number[];
  windDirection: number[];
  weatherCode: number[];
  sunrise: string[];
  sunset: string[];
  uvIndexMax: number[];
}

export interface WeatherResponse {
  current?: CurrentWeather;
  hourly?: HourlyForecast;
  daily?: DailyForecast;
  location: WeatherLocation;
}

const API_BASE_URL = 'https://api.open-meteo.com/v1';

// Weather code mappings based on WMO standards
export const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'cloud-sun' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Fog', icon: 'cloud' },
  48: { description: 'Depositing rime fog', icon: 'cloud' },
  51: { description: 'Light drizzle', icon: 'cloud-drizzle' },
  53: { description: 'Moderate drizzle', icon: 'cloud-drizzle' },
  55: { description: 'Dense drizzle', icon: 'cloud-rain' },
  61: { description: 'Slight rain', icon: 'cloud-rain' },
  63: { description: 'Moderate rain', icon: 'cloud-rain' },
  65: { description: 'Heavy rain', icon: 'cloud-rain' },
  71: { description: 'Slight snow', icon: 'cloud-snow' },
  73: { description: 'Moderate snow', icon: 'cloud-snow' },
  75: { description: 'Heavy snow', icon: 'cloud-snow' },
  80: { description: 'Slight rain showers', icon: 'cloud-rain' },
  81: { description: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { description: 'Violent rain showers', icon: 'cloud-rain' },
  95: { description: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { description: 'Thunderstorm with hail', icon: 'cloud-lightning' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' },
};

export function getWeatherDescription(code: number): { description: string; icon: string } {
  return WEATHER_CODES[code] || { description: 'Unknown', icon: 'question' };
}

export async function getCurrentWeather(location: WeatherLocation): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
  });

  const response = await fetch(`${API_BASE_URL}/forecast?${params}`);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();
  const current = data.current;

  return {
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    windDirection: current.wind_direction_10m,
    humidity: current.relative_humidity_2m,
    pressure: current.pressure_msl,
    precipitation: current.precipitation,
    cloudCover: current.cloud_cover,
    visibility: 10000, // Open-Meteo doesn't provide visibility, using default
    uvIndex: 0, // Will need separate UV API call
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
    time: current.time,
  };
}

export async function getHourlyForecast(location: WeatherLocation, days: number = 1): Promise<HourlyForecast> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation_probability',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'pressure_msl',
      'cloud_cover',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'uv_index',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
    forecast_days: days.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/forecast?${params}`);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();
  const hourly = data.hourly;

  return {
    time: hourly.time,
    temperature: hourly.temperature_2m,
    precipitation: hourly.precipitation,
    windSpeed: hourly.wind_speed_10m,
    humidity: hourly.relative_humidity_2m,
    pressure: hourly.pressure_msl,
    cloudCover: hourly.cloud_cover,
    weatherCode: hourly.weather_code,
  };
}

export async function getDailyForecast(location: WeatherLocation, days: number = 7): Promise<DailyForecast> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
    forecast_days: days.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/forecast?${params}`);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();
  const daily = data.daily;

  return {
    time: daily.time,
    temperatureMax: daily.temperature_2m_max,
    temperatureMin: daily.temperature_2m_min,
    precipitation: daily.precipitation_sum,
    windSpeedMax: daily.wind_speed_10m_max,
    windDirection: daily.wind_direction_10m_dominant,
    weatherCode: daily.weather_code,
    sunrise: daily.sunrise,
    sunset: daily.sunset,
    uvIndexMax: daily.uv_index_max,
  };
}

export async function getCompleteWeatherData(location: WeatherLocation): Promise<WeatherResponse> {
  try {
    const [current, hourly, daily] = await Promise.all([
      getCurrentWeather(location),
      getHourlyForecast(location, 2),
      getDailyForecast(location, 7),
    ]);

    return {
      current,
      hourly,
      daily,
      location,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Predefined locations for demo purposes
export const DEFAULT_LOCATIONS: WeatherLocation[] = [
  { latitude: 40.7128, longitude: -74.006, name: 'New York', country: 'US' },
  { latitude: 51.5074, longitude: -0.1278, name: 'London', country: 'UK' },
  { latitude: 48.8566, longitude: 2.3522, name: 'Paris', country: 'FR' },
  { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo', country: 'JP' },
  { latitude: -33.8688, longitude: 151.2093, name: 'Sydney', country: 'AU' },
  { latitude: 52.52, longitude: 13.405, name: 'Berlin', country: 'DE' },
  { latitude: 37.7749, longitude: -122.4194, name: 'San Francisco', country: 'US' },
];
