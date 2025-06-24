// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { weatherCodeMappings } from './types';

/**
 * Format temperature with unit
 */
export function formatTemperature(temp: number, unit: string = '°C'): string {
  return `${Math.round(temp)}${unit}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Format wind speed
 */
export function formatWindSpeed(speed: number, unit: string = 'km/h'): string {
  return `${Math.round(speed)} ${unit}`;
}

/**
 * Format precipitation
 */
export function formatPrecipitation(precip: number, unit: string = 'mm'): string {
  return `${precip.toFixed(1)} ${unit}`;
}

/**
 * Get weather description and icon from weather code
 */
export function getWeatherInfo(code: number): { description: string; icon: string } {
  return weatherCodeMappings[code] || { description: 'Unknown', icon: 'help' };
}

/**
 * Get wind direction from degrees
 */
export function getWindDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Get air quality index description
 */
export function getAirQualityDescription(aqi: number): { description: string; color: string } {
  if (aqi <= 50) return { description: 'Good', color: 'green' };
  if (aqi <= 100) return { description: 'Moderate', color: 'yellow' };
  if (aqi <= 150) return { description: 'Unhealthy for Sensitive Groups', color: 'orange' };
  if (aqi <= 200) return { description: 'Unhealthy', color: 'red' };
  if (aqi <= 300) return { description: 'Very Unhealthy', color: 'purple' };
  return { description: 'Hazardous', color: 'maroon' };
}

/**
 * Get UV index description
 */
export function getUvIndexDescription(uvIndex: number): { description: string; color: string } {
  if (uvIndex <= 2) return { description: 'Low', color: 'green' };
  if (uvIndex <= 5) return { description: 'Moderate', color: 'yellow' };
  if (uvIndex <= 7) return { description: 'High', color: 'orange' };
  if (uvIndex <= 10) return { description: 'Very High', color: 'red' };
  return { description: 'Extreme', color: 'purple' };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
}

/**
 * Format time for display
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get time of day greeting
 */
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Check if it's currently day or night
 */
export function isDayTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
}

/**
 * Generate chart data for temperature trend
 */
export function generateTemperatureChartData(
  timestamps: string[],
  temperatures: number[],
  label: string = 'Temperature',
) {
  return [
    {
      title: label,
      type: 'line' as const,
      data: timestamps.slice(0, 24).map((time, index) => ({
        x: new Date(time),
        y: temperatures[index] || 0,
      })),
      valueFormatter: (value: number) => formatTemperature(value),
    },
  ];
}

/**
 * Generate chart data for precipitation
 */
export function generatePrecipitationChartData(
  timestamps: string[],
  precipitation: number[],
  label: string = 'Precipitation',
) {
  return [
    {
      title: label,
      type: 'line' as const,
      data: timestamps.slice(0, 24).map((time, index) => ({
        x: new Date(time),
        y: precipitation[index] || 0,
      })),
      valueFormatter: (value: number) => formatPrecipitation(value),
    },
  ];
}

/**
 * Generate chart data for wind speed
 */
export function generateWindChartData(timestamps: string[], windSpeeds: number[], label: string = 'Wind Speed') {
  return [
    {
      title: label,
      type: 'line' as const,
      data: timestamps.slice(0, 24).map((time, index) => ({
        x: new Date(time),
        y: windSpeeds[index] || 0,
      })),
      valueFormatter: (value: number) => formatWindSpeed(value),
    },
  ];
}

/**
 * Get current hour index for hourly data
 */
export function getCurrentHourIndex(): number {
  return new Date().getHours();
}

/**
 * Get next 24 hours of data starting from current hour
 */
export function getNext24Hours<T>(hourlyData: T[]): T[] {
  const currentHour = getCurrentHourIndex();
  return hourlyData.slice(currentHour, currentHour + 24);
}
