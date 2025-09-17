// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import { WeatherConfiguration } from './configuration';

export function Content() {
  return (
    <SpaceBetween size="l">
      {/* Primary configuration section */}
      <WeatherConfiguration />

      {/* Test container */}
      <Container
        header={
          <Header variant="h2" description="Testing weather dashboard">
            Test section
          </Header>
        }
      >
        Weather dashboard is loading...
      </Container>
    </SpaceBetween>
  );
}
