// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';

export function WeatherHeader() {
  return (
    <Header
      variant="h1"
      description="Real-time weather monitoring dashboard with current conditions and forecasts"
      actions={
        <Button 
          variant="primary" 
          iconName="refresh"
          onClick={() => window.location.reload()}
        >
          Refresh data
        </Button>
      }
    >
      Weather Dashboard
    </Header>
  );
}
