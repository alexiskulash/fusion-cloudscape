// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Checkbox from '@cloudscape-design/components/checkbox';

// Sample data for Area Chart
const areaChartSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: new Date(2023, 0, 1), y: 2 },
      { x: new Date(2023, 1, 1), y: 3 },
      { x: new Date(2023, 2, 1), y: 4 },
      { x: new Date(2023, 3, 1), y: 4.5 },
      { x: new Date(2023, 4, 1), y: 5 },
      { x: new Date(2023, 5, 1), y: 5.2 },
      { x: new Date(2023, 6, 1), y: 5.3 },
      { x: new Date(2023, 7, 1), y: 5 },
      { x: new Date(2023, 8, 1), y: 4.8 },
      { x: new Date(2023, 9, 1), y: 5.2 },
      { x: new Date(2023, 10, 1), y: 5.5 },
      { x: new Date(2023, 11, 1), y: 4.5 },
    ],
    valueFormatter: (e: number) => e.toFixed(1),
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: new Date(2023, 0, 1), y: 3 },
      { x: new Date(2023, 1, 1), y: 3.5 },
      { x: new Date(2023, 2, 1), y: 3.8 },
      { x: new Date(2023, 3, 1), y: 4.2 },
      { x: new Date(2023, 4, 1), y: 4.5 },
      { x: new Date(2023, 5, 1), y: 4.8 },
      { x: new Date(2023, 6, 1), y: 5 },
      { x: new Date(2023, 7, 1), y: 5.2 },
      { x: new Date(2023, 8, 1), y: 5.3 },
      { x: new Date(2023, 9, 1), y: 5.1 },
      { x: new Date(2023, 10, 1), y: 4.8 },
      { x: new Date(2023, 11, 1), y: 3.5 },
    ],
    valueFormatter: (e: number) => e.toFixed(1),
  },
];

// Sample data for Bar Chart
const barChartSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 183 },
      { x: 'x2', y: 257 },
      { x: 'x3', y: 213 },
      { x: 'x4', y: 122 },
      { x: 'x5', y: 210 },
    ],
  },
];

// Sample data for Table
const generateTableItems = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      id: `item-${i}`,
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }
  return items;
};

export function DashboardContent() {
  const [selectedItems, setSelectedItems] = useState<Array<any>>([]);
  const tableItems = generateTableItems(12);

  return (
    <SpaceBetween size="l">
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
        ]}
      >
        <div className="chart-container">
          <AreaChart
            series={areaChartSeries}
            xDomain={[new Date(2023, 0, 1), new Date(2023, 11, 31)]}
            yDomain={[0, 6]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'area chart',
              xTickFormatter: (e: Date) =>
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
            ariaLabel="Area chart"
            height={300}
            xScaleType="time"
            xTitle="X-axis label"
            yTitle="y-axis label"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
              </Box>
            }
          />
        </div>

        <div className="chart-container">
          <BarChart
            series={barChartSeries}
            xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
            yDomain={[0, 300]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
              xTickFormatter: (e: string) => e,
              yTickFormatter: undefined,
            }}
            ariaLabel="Bar chart"
            height={300}
            xScaleType="categorical"
            xTitle="X-axis label"
            yTitle="y-axis label"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No data available</b>
                <Box variant="p" color="inherit">
                  There is no data available
                </Box>
              </Box>
            }
            noMatch={
              <Box textAlign="center" color="inherit">
                <b>No matching data</b>
                <Box variant="p" color="inherit">
                  There is no matching data to display
                </Box>
              </Box>
            }
          />
        </div>
      </Grid>

      <Table
        columnDefinitions={[
          {
            id: 'selection',
            header: '',
            cell: (item) => (
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={({ detail }) => {
                  if (detail.checked) {
                    setSelectedItems([...selectedItems, item]);
                  } else {
                    setSelectedItems(selectedItems.filter(i => i !== item));
                  }
                }}
              />
            ),
            width: 60,
          },
          {
            id: 'col1',
            header: 'Column header',
            cell: (item) => item.col1,
            sortingField: 'col1',
          },
          {
            id: 'col2',
            header: 'Column header',
            cell: (item) => item.col2,
            sortingField: 'col2',
          },
          {
            id: 'col3',
            header: 'Column header',
            cell: (item) => item.col3,
            sortingField: 'col3',
          },
          {
            id: 'col4',
            header: 'Column header',
            cell: (item) => item.col4,
            sortingField: 'col4',
          },
          {
            id: 'col5',
            header: 'Column header',
            cell: (item) => item.col5,
            sortingField: 'col5',
          },
          {
            id: 'col6',
            header: 'Column header',
            cell: (item) => item.col6,
            sortingField: 'col6',
          },
          {
            id: 'col7',
            header: 'Column header',
            cell: (item) => item.col7,
            sortingField: 'col7',
          },
        ]}
        items={tableItems}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="id"
        empty={
          <Box textAlign="center" color="inherit">
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              <b>No resources</b>
            </Box>
            <Box variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
        variant="full-page"
      />
    </SpaceBetween>
  );
}
