// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LocationCoords, defaultLocations } from '../services/weather-api';

interface WeatherContextType {
  selectedLocation: LocationCoords;
  setSelectedLocation: (location: LocationCoords) => void;
  availableLocations: LocationCoords[];
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<LocationCoords>(defaultLocations[0]);

  return (
    <WeatherContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        availableLocations: defaultLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
