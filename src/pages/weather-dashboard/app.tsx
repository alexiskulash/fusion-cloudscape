// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Input from '@cloudscape-design/components/input';
import Cards from '@cloudscape-design/components/cards';
import Toggle from '@cloudscape-design/components/toggle';
import Badge from '@cloudscape-design/components/badge';
import Link from '@cloudscape-design/components/link';

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone?: string;
}

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum?: number[];
}

type TemperatureUnit = 'celsius' | 'fahrenheit';

export function App() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<GeoResult[]>([]);
  const [selected, setSelected] = useState<GeoResult | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const [loadingWeather, setLoadingWeather] = useState(false);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyWeather | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const searchLocations = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const resp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?q=${encodeURIComponent(query.trim())}&limit=5`,
      );
      const data = await resp.json();
      setResults(
        (data?.results || []).map((r: any) => ({
          id: r.id,
          name: r.name,
          latitude: r.latitude,
          longitude: r.longitude,
          country: r.country,
          admin1: r.admin1,
          timezone: r.timezone,
        })) as GeoResult[],
      );
    } catch (e) {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, [query]);

  const fetchWeather = useCallback(async (loc: GeoResult, unitParam: TemperatureUnit) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoadingWeather(true);
    try {
      const params = new URLSearchParams({
        latitude: String(loc.latitude),
        longitude: String(loc.longitude),
        current_weather: 'true',
        daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'].join(','),
        timezone: 'auto',
        temperature_unit: unitParam,
        windspeed_unit: unitParam === 'fahrenheit' ? 'mph' : 'kmh',
      });
      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
      const resp = await fetch(url, { signal: controller.signal });
      const data = await resp.json();
      const cw: CurrentWeather | null = data?.current_weather
        ? {
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed,
            winddirection: data.current_weather.winddirection,
            weathercode: data.current_weather.weathercode,
            time: data.current_weather.time,
          }
        : null;
      const dw: DailyWeather | null = data?.daily
        ? {
            time: data.daily.time,
            temperature_2m_max: data.daily.temperature_2m_max,
            temperature_2m_min: data.daily.temperature_2m_min,
            precipitation_sum: data.daily.precipitation_sum,
          }
        : null;
      setCurrent(cw);
      setDaily(dw);
    } catch (e) {
      if ((e as any)?.name !== 'AbortError') {
        setCurrent(null);
        setDaily(null);
      }
    } finally {
      setLoadingWeather(false);
    }
  }, []);

  useEffect(() => {
    if (selected) {
      fetchWeather(selected, unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, unit]);

  const currentLocationTitle = useMemo(() => {
    if (!selected) return 'No location selected';
    const parts = [selected.name, selected.admin1, selected.country].filter(Boolean);
    return parts.join(', ');
  }, [selected]);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="s">
                  <Toggle
                    checked={unit === 'fahrenheit'}
                    onChange={({ detail }) => setUnit(detail.checked ? 'fahrenheit' : 'celsius')}
                  >
                    Use Fahrenheit
                  </Toggle>
                </SpaceBetween>
              }
            >
              Weather Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Container header={<Header variant="h2">Search for a location</Header>}>
              <Grid gridDefinition={[{ colspan: { default: 12, s: 9 } }, { colspan: { default: 12, s: 3 } }]}>
                <Input
                  placeholder="Enter city or place"
                  value={query}
                  onChange={({ detail }) => setQuery(detail.value)}
                  ariaLabel="Search city"
                />
                <Button variant="primary" loading={searching} onClick={searchLocations}>
                  Search
                </Button>
              </Grid>
              {results.length > 0 && (
                <Box margin={{ top: 'm' }}>
                  <Cards
                    cardDefinition={{
                      header: (item: GeoResult) => (
                        <Box variant="h3">
                          {item.name} <Badge>{item.country}</Badge>
                        </Box>
                      ),
                      sections: [
                        {
                          id: 'meta',
                          content: (item: GeoResult) => (
                            <Box variant="p">
                              {item.admin1 ? `${item.admin1}, ` : ''}
                              {item.timezone ? `${item.timezone}` : ''}
                            </Box>
                          ),
                        },
                        {
                          id: 'actions',
                          content: (item: GeoResult) => (
                            <Button
                              variant="primary"
                              onClick={() => {
                                setSelected(item);
                                setResults([]);
                              }}
                            >
                              Use location
                            </Button>
                          ),
                        },
                      ],
                    }}
                    cardsPerRow={[
                      { cards: 1, minWidth: 0 },
                      { cards: 2, minWidth: 600 },
                      { cards: 3, minWidth: 900 },
                      { cards: 4, minWidth: 1200 },
                    ]}
                    items={results}
                    trackBy={(i: GeoResult) => String(i.id)}
                    header={<Header counter={`(${results.length})`}>Search results</Header>}
                  />
                </Box>
              )}
            </Container>

            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    selected ? (
                      <span>
                        Data from Open‑Meteo{' '}
                        <Link href="https://open-meteo.com/" external>
                          open-meteo.com
                        </Link>
                      </span>
                    ) : undefined
                  }
                >
                  {currentLocationTitle}
                </Header>
              }
            >
              {!selected && (
                <Box variant="p">Search for a location to view current conditions and a 7‑day forecast.</Box>
              )}

              {selected && (
                <SpaceBetween size="l">
                  <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
                    <Container header={<Header variant="h3">Current conditions</Header>}>
                      {loadingWeather && <Box variant="p">Loading current weather…</Box>}
                      {!loadingWeather && current && (
                        <SpaceBetween size="s">
                          <Box variant="p">Time: {new Date(current.time).toLocaleString()}</Box>
                          <Box variant="p">
                            Temperature: {current.temperature}
                            {unitSymbol}
                          </Box>
                          <Box variant="p">
                            Wind: {current.windspeed} {unit === 'celsius' ? 'km/h' : 'mph'}
                          </Box>
                          <Box variant="p">Wind direction: {Math.round(current.winddirection)}°</Box>
                        </SpaceBetween>
                      )}
                    </Container>

                    <Container header={<Header variant="h3">7‑day outlook</Header>}>
                      {loadingWeather && <Box variant="p">Loading forecast…</Box>}
                      {!loadingWeather && daily && (
                        <Grid
                          gridDefinition={[
                            { colspan: { default: 12, s: 6, m: 4 } },
                            { colspan: { default: 12, s: 6, m: 4 } },
                            { colspan: { default: 12, s: 6, m: 4 } },
                          ]}
                        >
                          {daily.time.map((t, idx) => (
                            <Container
                              key={t}
                              header={<Header variant="h4">{new Date(t).toLocaleDateString()}</Header>}
                            >
                              <SpaceBetween size="xs">
                                <Box variant="p">
                                  High: {daily.temperature_2m_max[idx]}
                                  {unitSymbol}
                                </Box>
                                <Box variant="p">
                                  Low: {daily.temperature_2m_min[idx]}
                                  {unitSymbol}
                                </Box>
                                {typeof daily.precipitation_sum?.[idx] === 'number' && (
                                  <Box variant="p">Precipitation: {daily.precipitation_sum?.[idx]} mm</Box>
                                )}
                              </SpaceBetween>
                            </Container>
                          ))}
                        </Grid>
                      )}
                    </Container>
                  </Grid>
                </SpaceBetween>
              )}
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
