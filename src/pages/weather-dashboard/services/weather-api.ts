// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    precipitation: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    precipitation: string;
  };
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
  name: string;
}

// Default locations to demonstrate different weather conditions
export const defaultLocations: LocationCoords[] = [
  { latitude: 52.52, longitude: 13.41, name: 'Berlin' },
  { latitude: 40.7128, longitude: -74.006, name: 'New York' },
  { latitude: 35.6762, longitude: 139.6503, name: 'Tokyo' },
  { latitude: -33.8688, longitude: 151.2093, name: 'Sydney' },
];

export const fetchWeatherData = async (coords: LocationCoords): Promise<WeatherData> => {
  const { latitude, longitude } = coords;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API request failed: ${response.statusText}`);
  }

  return await response.json();
};

export const getWeatherCodeDescription = (code: number): string => {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return weatherCodes[code] || 'Unknown';
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  return `${Math.round(speed)} km/h`;
};

export const formatHumidity = (humidity: number): string => {
  return `${Math.round(humidity)}%`;
};
