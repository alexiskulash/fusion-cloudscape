// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
  region?: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay: boolean;
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
  precipitation: number[];
  windSpeedMax: number[];
  weatherCode: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  location: WeatherLocation;
}

const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'cloud-sun' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Fog', icon: 'cloud' },
  48: { description: 'Depositing rime fog', icon: 'cloud' },
  51: { description: 'Light drizzle', icon: 'cloud-rain' },
  53: { description: 'Moderate drizzle', icon: 'cloud-rain' },
  55: { description: 'Dense drizzle', icon: 'cloud-rain' },
  61: { description: 'Slight rain', icon: 'cloud-rain' },
  63: { description: 'Moderate rain', icon: 'cloud-rain' },
  65: { description: 'Heavy rain', icon: 'cloud-rain' },
  71: { description: 'Slight snow', icon: 'snowflake' },
  73: { description: 'Moderate snow', icon: 'snowflake' },
  75: { description: 'Heavy snow', icon: 'snowflake' },
  77: { description: 'Snow grains', icon: 'snowflake' },
  80: { description: 'Slight rain showers', icon: 'cloud-rain' },
  81: { description: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { description: 'Violent rain showers', icon: 'cloud-rain' },
  85: { description: 'Slight snow showers', icon: 'snowflake' },
  86: { description: 'Heavy snow showers', icon: 'snowflake' },
  95: { description: 'Thunderstorm', icon: 'bolt' },
  96: { description: 'Thunderstorm with hail', icon: 'bolt' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'bolt' },
};

export class WeatherService {
  private static readonly BASE_URL = 'https://api.open-meteo.com/v1';
  private static readonly GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

  static async searchLocations(query: string): Promise<WeatherLocation[]> {
    try {
      const response = await fetch(
        `${this.GEOCODING_URL}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.map((location: any) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        country: location.country,
        region: location.admin1,
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations. Please try again.');
    }
  }

  static async getWeatherData(location: WeatherLocation): Promise<WeatherResponse> {
    try {
      const params = new URLSearchParams({
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'wind_speed_10m',
          'wind_direction_10m',
          'weather_code',
          'is_day',
        ].join(','),
        hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'wind_speed_10m', 'weather_code'].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'wind_speed_10m_max',
          'weather_code',
        ].join(','),
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        precipitation_unit: 'mm',
        timezone: 'auto',
        forecast_days: '7',
      });

      const response = await fetch(`${this.BASE_URL}/forecast?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        current: {
          time: data.current.time,
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          windDirection: data.current.wind_direction_10m,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        },
        hourly: {
          time: data.hourly.time,
          temperature: data.hourly.temperature_2m,
          humidity: data.hourly.relative_humidity_2m,
          precipitation: data.hourly.precipitation,
          windSpeed: data.hourly.wind_speed_10m,
          weatherCode: data.hourly.weather_code,
        },
        daily: {
          time: data.daily.time,
          temperatureMax: data.daily.temperature_2m_max,
          temperatureMin: data.daily.temperature_2m_min,
          precipitation: data.daily.precipitation_sum,
          windSpeedMax: data.daily.wind_speed_10m_max,
          weatherCode: data.daily.weather_code,
        },
        location,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }

  static getWeatherDescription(weatherCode: number): string {
    return WEATHER_CODES[weatherCode]?.description || 'Unknown';
  }

  static getWeatherIcon(weatherCode: number): string {
    return WEATHER_CODES[weatherCode]?.icon || 'circle-question';
  }

  static getDefaultLocations(): WeatherLocation[] {
    return [
      { latitude: 40.7128, longitude: -74.006, name: 'New York', country: 'United States' },
      { latitude: 51.5074, longitude: -0.1278, name: 'London', country: 'United Kingdom' },
      { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo', country: 'Japan' },
      { latitude: -33.8688, longitude: 151.2093, name: 'Sydney', country: 'Australia' },
      { latitude: 48.8566, longitude: 2.3522, name: 'Paris', country: 'France' },
    ];
  }
}
