// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Dashboard Table Component
 *
 * A feature-rich data table with the following capabilities:
 * - Multi-row selection with checkboxes
 * - Text-based filtering/search across all columns
 * - Column sorting (click column headers to sort)
 * - Pagination (10 items per page)
 * - Resizable columns
 * - Sticky header (remains visible when scrolling)
 *
 * Uses Cloudscape's useCollection hook to handle:
 * - Filtering logic
 * - Pagination state
 * - Sorting state
 * - Empty/no-match states
 *
 * This provides a consistent pattern for client-side table operations
 * without manual state management.
 */

import React, { useState } from 'react';

import Table, { TableProps } from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useCollection } from '@cloudscape-design/collection-hooks';

/**
 * Data Item Interface
 *
 * Defines the structure of each row in the table.
 * - id: Unique identifier used for selection tracking
 * - col1-col7: Seven data columns, all containing string values
 *
 * In a real application, these would have meaningful names
 * like 'name', 'status', 'region', etc.
 */
interface DataItem {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

/**
 * Generate Sample Data
 *
 * Creates an array of 13 sample data items for demonstration.
 * Each item has a unique ID and placeholder "Cell Value" text.
 *
 * In production, this would be replaced with:
 * - API calls to fetch real data
 * - Props passed from parent component
 * - Data from a state management system
 *
 * @returns Array of 13 DataItem objects
 */
const generateData = (): DataItem[] => {
  const data: DataItem[] = [];
  // Generate 13 rows to demonstrate pagination (10 on page 1, 3 on page 2)
  for (let i = 1; i <= 13; i++) {
    data.push({
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
  return data;
};

/**
 * Column Definitions
 *
 * Defines how each column should be rendered and behave:
 * - id: Unique identifier for the column
 * - header: Text displayed in the column header
 * - cell: Function that renders the cell content for each row
 * - sortingField: Field name used for sorting (enables sort on this column)
 * - isRowHeader: Marks the first column as the row header for accessibility
 *
 * All columns are sortable via the sortingField property.
 * The first column (col1) is marked as the row header for screen readers.
 */
const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<DataItem>[] = [
  // First column - marked as row header for accessibility
  {
    id: 'col1',
    header: 'Column header',
    cell: item => item.col1,
    sortingField: 'col1',
    isRowHeader: true, // This column acts as the primary identifier for screen readers
  },
  // Columns 2-7: Standard sortable data columns
  {
    id: 'col2',
    header: 'Column header',
    cell: item => item.col2,
    sortingField: 'col2',
  },
  {
    id: 'col3',
    header: 'Column header',
    cell: item => item.col3,
    sortingField: 'col3',
  },
  {
    id: 'col4',
    header: 'Column header',
    cell: item => item.col4,
    sortingField: 'col4',
  },
  {
    id: 'col5',
    header: 'Column header',
    cell: item => item.col5,
    sortingField: 'col5',
  },
  {
    id: 'col6',
    header: 'Column header',
    cell: item => item.col6,
    sortingField: 'col6',
  },
  {
    id: 'col7',
    header: 'Column header',
    cell: item => item.col7,
    sortingField: 'col7',
  },
];

export function DashboardTable() {
  // Track which rows are currently selected by the user
  // Used for bulk actions (though none are implemented in this demo)
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);

  // Generate the full dataset (13 items)
  const allItems = generateData();

  /**
   * Collection Hook
   *
   * useCollection manages all table state and operations:
   * - items: The current page of filtered/sorted items to display
   * - filteredItemsCount: Number of items matching current filter
   * - collectionProps: Props to spread onto Table (sorting state, etc.)
   * - filterProps: Props to spread onto TextFilter (value, onChange, etc.)
   * - paginationProps: Props to spread onto Pagination (page, onChange, etc.)
   *
   * Configuration:
   * - filtering: Handles text search with empty/no-match states
   * - pagination: 10 items per page
   * - sorting: Enables column sorting
   * - selection: Enables row selection (used with selectedItems state)
   */
  const { items, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(allItems, {
    filtering: {
      // Message shown when the initial dataset is empty (no data at all)
      empty: (
        <div className="empty-state">
          <SpaceBetween size="m">
            <b>No matches</b>
            <span>We can't find a match.</span>
          </SpaceBetween>
        </div>
      ),
      // Message shown when filter returns no results (data exists but doesn't match filter)
      noMatch: (
        <div className="empty-state">
          <SpaceBetween size="m">
            <b>No matches</b>
            <span>We can't find a match.</span>
          </SpaceBetween>
        </div>
      ),
    },
    // Pagination configuration: Show 10 items per page
    // With 13 total items, this creates 2 pages (10 + 3)
    pagination: { pageSize: 10 },
    // Enable sorting functionality (click column headers to sort)
    sorting: {},
    // Enable row selection tracking
    selection: {},
  });

  return (
    <Table
      // Spread collection props to wire up sorting state
      {...collectionProps}
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              {/*
                Text Filter Component
                - Spread filterProps to connect to useCollection filtering
                - Shows live count of matching items as user types
                - Searches across all columns in the table
                - Updates automatically as user types (no submit button needed)
              */}
              <TextFilter
                {...filterProps}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter table items"
                countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
              />
            </SpaceBetween>
          }
        >
          Data Table
        </Header>
      }
      columnDefinitions={COLUMN_DEFINITIONS}
      items={items} // Filtered and paginated items from useCollection
      selectionType="multi" // Enable multi-row selection with checkboxes
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      trackBy="id" // Use 'id' field to track items (improves performance)
      pagination={
        /*
          Pagination Component
          - Spread paginationProps to connect to useCollection state
          - Custom aria labels for accessibility/screen readers
          - Shows page numbers and next/previous buttons
          - Automatically updates when items are filtered
        */
        <Pagination
          {...paginationProps}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber}`,
          }}
        />
      }
      /**
       * Accessibility Labels
       *
       * Provides screen reader announcements for:
       * - Selection group context ("Items selection")
       * - Select all checkbox ("select all")
       * - Individual row checkboxes (e.g., "Cell Value is selected")
       *
       * These labels help visually impaired users understand:
       * - What they're selecting
       * - Current selection state
       * - How to interact with checkboxes
       */
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: () => 'select all',
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.col1} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
      variant="full-page" // Full-page variant for dashboard layout
      stickyHeader // Keep header visible when scrolling
      resizableColumns // Allow users to resize column widths by dragging
    />
  );
}
