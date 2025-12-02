// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface TableItem {
  id: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

const generateTableData = (): TableItem[] => {
  const data: TableItem[] = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      id: `row-${i}`,
      column1: 'Cell Value',
      column2: 'Cell Value',
      column3: 'Cell Value',
      column4: 'Cell Value',
      column5: 'Cell Value',
      column6: 'Cell Value',
      column7: 'Cell Value',
    });
  }
  return data;
};

export function DataTable() {
  const [selectedItems, setSelectedItems] = useState<TableItem[]>([]);
  const items = generateTableData();

  return (
    <div className="admin-dashboard-table">
      <Table
      columnDefinitions={[
        {
          id: 'column1',
          header: 'Column header',
          cell: item => item.column1,
          sortingField: 'column1',
        },
        {
          id: 'column2',
          header: 'Column header',
          cell: item => item.column2,
          sortingField: 'column2',
        },
        {
          id: 'column3',
          header: 'Column header',
          cell: item => item.column3,
          sortingField: 'column3',
        },
        {
          id: 'column4',
          header: 'Column header',
          cell: item => item.column4,
          sortingField: 'column4',
        },
        {
          id: 'column5',
          header: 'Column header',
          cell: item => item.column5,
          sortingField: 'column5',
        },
        {
          id: 'column6',
          header: 'Column header',
          cell: item => item.column6,
          sortingField: 'column6',
        },
        {
          id: 'column7',
          header: 'Column header',
          cell: item => item.column7,
          sortingField: 'column7',
        },
      ]}
      items={items}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) => `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.id} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
      variant="full-page"
      stickyHeader
      />
    </div>
  );
}
