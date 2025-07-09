// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';

import { WeatherLocation, WeatherService } from '../services/weather-api';

interface LocationSelectorProps {
  selectedLocation: WeatherLocation | null;
  onLocationSelect: (location: WeatherLocation) => void;
}

export function LocationSelector({ selectedLocation, onLocationSelect }: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDefaults, setShowDefaults] = useState(true);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowDefaults(false);
    try {
      const results = await WeatherService.searchLocations(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const showDefaultLocations = () => {
    setShowDefaults(true);
    setSearchResults([]);
    setSearchQuery('');
  };

  const defaultLocations = WeatherService.getDefaultLocations();
  const locationsToShow = showDefaults ? defaultLocations : searchResults;

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Search for a city or select from popular locations"
          actions={
            showDefaults ? null : (
              <Button variant="normal" onClick={showDefaultLocations}>
                Show Popular Cities
              </Button>
            )
          }
        >
          Location Selection
        </Header>
      }
    >
      <SpaceBetween size="l">
        <SpaceBetween size="s" direction="horizontal">
          <Input
            value={searchQuery}
            onChange={({ detail }) => setSearchQuery(detail.value)}
            placeholder="Search for a city (e.g., London, New York)"
            onKeyDown={handleKeyPress}
            type="search"
          />
          <Button variant="primary" onClick={handleSearch} loading={isSearching} iconName="search">
            Search
          </Button>
        </SpaceBetween>

        {selectedLocation && (
          <Box>
            <Badge color="green">
              Selected: {selectedLocation.name}
              {selectedLocation.country && `, ${selectedLocation.country}`}
            </Badge>
          </Box>
        )}

        <Cards
          ariaLabels={{
            itemSelectionLabel: (e, item) => `Select ${item.name}`,
            selectionGroupLabel: 'Location selection',
          }}
          cardDefinition={{
            header: item => (
              <SpaceBetween size="xs" direction="horizontal">
                <Icon name="location" />
                <strong>{item.name}</strong>
              </SpaceBetween>
            ),
            sections: [
              {
                id: 'location-details',
                content: item => (
                  <SpaceBetween size="xs">
                    {item.country && <div>Country: {item.country}</div>}
                    {item.region && <div>Region: {item.region}</div>}
                    <div>
                      Coordinates: {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                    </div>
                  </SpaceBetween>
                ),
              },
              {
                id: 'actions',
                content: item => (
                  <Button
                    variant={selectedLocation?.name === item.name ? 'primary' : 'normal'}
                    onClick={() => onLocationSelect(item)}
                    disabled={selectedLocation?.name === item.name}
                  >
                    {selectedLocation?.name === item.name ? 'Selected' : 'Select Location'}
                  </Button>
                ),
              },
            ],
          }}
          cardsPerRow={[
            { cards: 1, minWidth: 0 },
            { cards: 2, minWidth: 600 },
            { cards: 3, minWidth: 900 },
          ]}
          items={locationsToShow}
          loadingText="Searching locations..."
          trackBy="name"
          visibleSections={['location-details', 'actions']}
          empty={
            <Box textAlign="center" color="inherit" margin={{ top: 'l', bottom: 'l' }}>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                <Icon name="search" size="large" />
              </Box>
              <Box variant="h3" padding={{ bottom: 'xs' }}>
                {showDefaults ? 'Popular locations' : 'No locations found'}
              </Box>
              <Box variant="p">
                {showDefaults
                  ? 'Select a popular city or search for your location'
                  : 'Try searching with a different city name'}
              </Box>
            </Box>
          }
          header={
            <Header
              counter={locationsToShow.length > 0 ? `(${locationsToShow.length})` : undefined}
              description={showDefaults ? 'Popular cities worldwide' : 'Search results'}
            >
              {showDefaults ? 'Popular Locations' : 'Search Results'}
            </Header>
          }
        />
      </SpaceBetween>
    </Container>
  );
}
