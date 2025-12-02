// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';

export function ChartSection() {
  return (
    <ColumnLayout columns={2} variant="text-grid">
      <Container fitHeight>
        <AreaChart
          series={[
            {
              title: 'Site 1',
              type: 'area',
              data: [
                { x: new Date(1601596800000), y: 25 },
                { x: new Date(1604275200000), y: 28 },
                { x: new Date(1606867200000), y: 30 },
                { x: new Date(1609545600000), y: 32 },
                { x: new Date(1612224000000), y: 35 },
                { x: new Date(1614643200000), y: 38 },
                { x: new Date(1617321600000), y: 42 },
                { x: new Date(1619913600000), y: 45 },
                { x: new Date(1622592000000), y: 48 },
                { x: new Date(1625184000000), y: 50 },
                { x: new Date(1627862400000), y: 52 },
                { x: new Date(1630540800000), y: 55 },
              ],
            },
            {
              title: 'Site 2',
              type: 'area',
              data: [
                { x: new Date(1601596800000), y: 15 },
                { x: new Date(1604275200000), y: 18 },
                { x: new Date(1606867200000), y: 22 },
                { x: new Date(1609545600000), y: 25 },
                { x: new Date(1612224000000), y: 28 },
                { x: new Date(1614643200000), y: 30 },
                { x: new Date(1617321600000), y: 32 },
                { x: new Date(1619913600000), y: 35 },
                { x: new Date(1622592000000), y: 38 },
                { x: new Date(1625184000000), y: 40 },
                { x: new Date(1627862400000), y: 42 },
                { x: new Date(1630540800000), y: 45 },
              ],
            },
          ]}
          xScaleType="time"
          yTitle="y-axis label"
          xTitle="X-axis label"
          ariaLabel="Area chart"
          height={300}
          hideFilter
          hideLegend={false}
          statusType="finished"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'area chart',
            xTickFormatter: e =>
              e
                .toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })
                .split(',')
                .join('\n'),
            yTickFormatter: undefined,
          }}
        />
      </Container>

      <Container fitHeight>
        <BarChart
          series={[
            {
              title: 'Site 1',
              type: 'bar',
              data: [
                { x: 'x1', y: 35 },
                { x: 'x2', y: 50 },
                { x: 'x3', y: 42 },
                { x: 'x4', y: 25 },
                { x: 'x5', y: 41 },
              ],
            },
          ]}
          xScaleType="categorical"
          yTitle="y-axis label"
          xTitle="X-axis label"
          ariaLabel="Bar chart"
          height={300}
          hideFilter
          hideLegend={false}
          statusType="finished"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'bar chart',
            xTickFormatter: e => e,
            yTickFormatter: undefined,
          }}
        />
      </Container>
    </ColumnLayout>
  );
}
