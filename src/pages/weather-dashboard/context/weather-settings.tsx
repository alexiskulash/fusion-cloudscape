// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useContext, useState, ReactNode } from 'react';

import { WeatherLocation, defaultLocations } from '../services/weather-api';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

interface WeatherSettings {
  selectedLocation: WeatherLocation;
  temperatureUnit: TemperatureUnit;
  setSelectedLocation: (location: WeatherLocation) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
}

const WeatherSettingsContext = createContext<WeatherSettings | undefined>(undefined);

interface WeatherSettingsProviderProps {
  children: ReactNode;
}

export function WeatherSettingsProvider({ children }: WeatherSettingsProviderProps) {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(defaultLocations[0]);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const value: WeatherSettings = {
    selectedLocation,
    temperatureUnit,
    setSelectedLocation,
    setTemperatureUnit,
  };

  return <WeatherSettingsContext.Provider value={value}>{children}</WeatherSettingsContext.Provider>;
}

export function useWeatherSettings() {
  const context = useContext(WeatherSettingsContext);
  if (context === undefined) {
    throw new Error('useWeatherSettings must be used within a WeatherSettingsProvider');
  }
  return context;
}

// Temperature conversion utilities
export function convertTemperature(temp: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
  if (fromUnit === toUnit) return temp;

  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32);
  }

  if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return Math.round(((temp - 32) * 5) / 9);
  }

  return temp;
}

export function getTemperatureSymbol(unit: TemperatureUnit): string {
  return unit === 'celsius' ? '°C' : '°F';
}
