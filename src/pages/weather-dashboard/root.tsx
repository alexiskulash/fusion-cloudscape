// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useMemo, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';

import { Breadcrumbs, Navigation, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

import { format } from 'date-fns';

type Unit = 'celsius' | 'fahrenheit';

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone: string;
}

interface GeoResponse {
  results?: GeoResult[];
}

interface ForecastResponse {
  current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
  };
}

const unitOptions = [
  { label: 'Celsius (°C)', value: 'celsius' },
  { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
] as const;

export function App() {
  const [query, setQuery] = useState('Seattle');
  const [selectedPlace, setSelectedPlace] = useState<GeoResult | null>(null);
  const [unit, setUnit] = useState<Unit>('celsius');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const searchAndLoad = useCallback(async () => {
    setError(null);
    setLoading(true);
    setForecast(null);
    try {
      const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
      geoUrl.searchParams.set('name', query);
      geoUrl.searchParams.set('count', '1');
      geoUrl.searchParams.set('language', 'en');
      geoUrl.searchParams.set('format', 'json');
      const geoRes = await fetch(geoUrl.toString());
      if (!geoRes.ok) throw new Error(`Geocoding failed (${geoRes.status})`);
      const geoData: GeoResponse = await geoRes.json();
      const place = geoData.results && geoData.results[0];
      if (!place) {
        setSelectedPlace(null);
        throw new Error('No matching location found');
      }
      setSelectedPlace(place);

      const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
      forecastUrl.searchParams.set('latitude', String(place.latitude));
      forecastUrl.searchParams.set('longitude', String(place.longitude));
      forecastUrl.searchParams.set('current_weather', 'true');
      forecastUrl.searchParams.set('hourly', 'temperature_2m');
      forecastUrl.searchParams.set('forecast_days', '1');
      forecastUrl.searchParams.set('temperature_unit', unit);

      const wxRes = await fetch(forecastUrl.toString());
      if (!wxRes.ok) throw new Error(`Weather fetch failed (${wxRes.status})`);
      const wxData: ForecastResponse = await wxRes.json();
      setForecast(wxData);
    } catch (e: any) {
      setError(e?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, [query, unit]);

  const rows = useMemo(() => {
    if (!forecast?.hourly) return [] as { time: string; temperature: string }[];
    return forecast.hourly.time.map((t, i) => ({
      time: t,
      temperature: `${forecast.hourly!.temperature_2m[i]} ${unitSymbol}`,
    }));
  }, [forecast, unitSymbol]);

  return (
    <CustomAppLayout
      contentType="form"
      content={
        <form onSubmit={e => e.preventDefault()}>
          <Form
            header={<Header variant="h1">Weather Dashboard</Header>}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" href="#/">Back</Button>
                <Button variant="primary" loading={loading} onClick={searchAndLoad}>
                  Fetch weather
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              <Container header={<Header variant="h2">Location & Units</Header>}>
                <Grid gridDefinition={[{ colspan: { default: 12, m: 8 } }, { colspan: { default: 12, m: 4 } }]}>
                  <FormField label="City or place" stretch={true}>
                    <Input
                      value={query}
                      placeholder="Enter a city, e.g., Seattle"
                      onChange={({ detail }) => setQuery(detail.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') searchAndLoad();
                      }}
                    />
                  </FormField>
                  <FormField label="Temperature unit">
                    <Select
                      selectedOption={unitOptions.find(o => o.value === unit) as any}
                      onChange={({ detail }) => setUnit((detail.selectedOption.value as Unit) ?? 'celsius')}
                      options={unitOptions as any}
                      selectedAriaLabel="Selected unit"
                    />
                  </FormField>
                </Grid>
              </Container>

              <Container
                header={<Header variant="h2">Current conditions</Header>}
                footer={
                  <Box variant="p">
                    Source: <Link external href="https://open-meteo.com/">Open-Meteo</Link>
                  </Box>
                }
              >
                {error && (
                  <Box color="inherit" margin={{ bottom: 's' }}>
                    <StatusIndicator type="error">{error}</StatusIndicator>
                  </Box>
                )}
                {!error && !forecast && (
                  <StatusIndicator type="pending">Enter a city and fetch weather</StatusIndicator>
                )}
                {!error && forecast?.current_weather && selectedPlace && (
                  <SpaceBetween size="s">
                    <Box variant="h3">
                      {selectedPlace.name}
                      {selectedPlace.admin1 ? `, ${selectedPlace.admin1}` : ''} — {selectedPlace.country}
                    </Box>
                    <Box>
                      <b>Temperature:</b> {forecast.current_weather.temperature} {unitSymbol}
                    </Box>
                    <Box>
                      <b>Wind:</b> {forecast.current_weather.windspeed} km/h at {forecast.current_weather.winddirection}°
                    </Box>
                    <Box>
                      <b>Observed:</b> {format(new Date(forecast.current_weather.time), 'PPpp')} ({selectedPlace.timezone})
                    </Box>
                  </SpaceBetween>
                )}
              </Container>

              <Container header={<Header variant="h2">Hourly temperature (next 24h)</Header>}>
                <Table
                  variant="embedded"
                  columnDefinitions={[
                    {
                      id: 'time',
                      header: 'Time',
                      cell: (item: { time: string }) => format(new Date(item.time), 'PPpp'),
                    },
                    { id: 'temp', header: `Temperature (${unitSymbol})`, cell: (item: { temperature: string }) => item.temperature },
                  ]}
                  items={rows}
                  loading={loading}
                  loadingText="Loading weather data"
                  empty={<Box variant="p">No data available</Box>}
                />
              </Container>
            </SpaceBetween>
          </Form>
        </form>
      }
      breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/' }]} />}
      navigation={<Navigation activeHref="#/dashboard" />}
      toolsHide={true}
      notifications={<Notifications />}
    />
  );
}
