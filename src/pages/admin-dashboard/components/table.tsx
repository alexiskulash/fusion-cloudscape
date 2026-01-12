// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Table, { TableProps } from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useCollection } from '@cloudscape-design/collection-hooks';

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

const generateData = (): DataItem[] => {
  const data: DataItem[] = [];
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

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<DataItem>[] = [
  {
    id: 'col1',
    header: 'Column header',
    cell: item => item.col1,
    sortingField: 'col1',
    isRowHeader: true,
  },
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
  const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
  const allItems = generateData();

  const { items, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(allItems, {
    filtering: {
      empty: (
        <div className="empty-state">
          <SpaceBetween size="m">
            <b>No matches</b>
            <span>We can't find a match.</span>
          </SpaceBetween>
        </div>
      ),
      noMatch: (
        <div className="empty-state">
          <SpaceBetween size="m">
            <b>No matches</b>
            <span>We can't find a match.</span>
          </SpaceBetween>
        </div>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  return (
    <Table
      {...collectionProps}
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xs">
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
      items={items}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      trackBy="id"
      pagination={
        <Pagination
          {...paginationProps}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber}`,
          }}
        />
      }
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: () => 'select all',
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.col1} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
      variant="full-page"
      stickyHeader
      resizableColumns
    />
  );
}
