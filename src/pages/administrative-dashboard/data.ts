// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Data structures for Administrative Dashboard
 * Exported separately for unit testing
 */

// Sample data for area chart
export const areaChartSeries = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 3.5 },
      { x: 3, y: 3.2 },
      { x: 4, y: 3.8 },
      { x: 5, y: 4.2 },
      { x: 6, y: 4.5 },
      { x: 7, y: 4.3 },
      { x: 8, y: 3.9 },
      { x: 9, y: 4.1 },
      { x: 10, y: 3.7 },
      { x: 11, y: 4.0 },
      { x: 12, y: 5.0 },
    ],
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: [
      { x: 1, y: 2 },
      { x: 2, y: 2.3 },
      { x: 3, y: 2.1 },
      { x: 4, y: 2.5 },
      { x: 5, y: 2.8 },
      { x: 6, y: 1.2 },
      { x: 7, y: 1.5 },
      { x: 8, y: 1.3 },
      { x: 9, y: 1.8 },
      { x: 10, y: 2.2 },
      { x: 11, y: 2.5 },
      { x: 12, y: 2.7 },
    ],
    valueFormatter: (value: number) => value.toFixed(1),
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 3.5,
    valueFormatter: (value: number) => value.toFixed(1),
  },
];

// Sample data for bar chart
export const barChartSeries = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: [
      { x: 1, y: 183 },
      { x: 2, y: 257 },
      { x: 3, y: 213 },
      { x: 4, y: 122 },
      { x: 5, y: 210 },
    ],
  },
  {
    type: 'threshold' as const,
    title: 'Performance goal',
    y: 200,
  },
];

// Sample table data
export const tableItems = Array.from({ length: 12 }, (_, index) => ({
  id: `item-${index + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

// Table column definitions
export const columnDefinitions = [
  {
    id: 'column1',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column1,
    sortingField: 'column1',
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column2,
    sortingField: 'column2',
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column3,
    sortingField: 'column3',
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column4,
    sortingField: 'column4',
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column5,
    sortingField: 'column5',
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column6,
    sortingField: 'column6',
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: (item: typeof tableItems[0]) => item.column7,
    sortingField: 'column7',
  },
];
