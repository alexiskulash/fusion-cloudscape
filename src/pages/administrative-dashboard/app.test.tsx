// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Unit tests for Administrative Dashboard component
 * Note: This project primarily uses e2e tests. See test/e2e/administrative-dashboard.test.ts
 * for browser-based integration tests.
 */

import { areaChartSeries, barChartSeries, columnDefinitions, tableItems } from './data';

describe('Administrative Dashboard Data Structures', () => {
  describe('Area Chart Series', () => {
    it('should have correct number of series', () => {
      expect(areaChartSeries).toHaveLength(3);
    });

    it('should have Site 1 area series', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1');
      expect(site1).toBeDefined();
      expect(site1?.type).toBe('area');
    });

    it('should have Site 2 area series', () => {
      const site2 = areaChartSeries.find(s => s.title === 'Site 2');
      expect(site2).toBeDefined();
      expect(site2?.type).toBe('area');
    });

    it('should have performance goal threshold', () => {
      const threshold = areaChartSeries.find(s => s.type === 'threshold');
      expect(threshold).toBeDefined();
      expect(threshold?.title).toBe('Performance goal');
    });

    it('should have 12 data points per area series', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1' && s.type === 'area');
      const site2 = areaChartSeries.find(s => s.title === 'Site 2' && s.type === 'area');
      
      if (site1 && 'data' in site1) {
        expect(site1.data).toHaveLength(12);
      }
      if (site2 && 'data' in site2) {
        expect(site2.data).toHaveLength(12);
      }
    });

    it('should have valid data points with x and y values', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1' && s.type === 'area');
      
      if (site1 && 'data' in site1) {
        site1.data.forEach(point => {
          expect(point).toHaveProperty('x');
          expect(point).toHaveProperty('y');
          expect(typeof point.x).toBe('number');
          expect(typeof point.y).toBe('number');
        });
      }
    });

    it('should have value formatters', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1');
      expect(site1).toHaveProperty('valueFormatter');
      expect(typeof site1?.valueFormatter).toBe('function');
    });
  });

  describe('Bar Chart Series', () => {
    it('should have correct number of series', () => {
      expect(barChartSeries).toHaveLength(2);
    });

    it('should have Site 1 bar series', () => {
      const site1 = barChartSeries.find(s => s.title === 'Site 1');
      expect(site1).toBeDefined();
      expect(site1?.type).toBe('bar');
    });

    it('should have performance goal threshold', () => {
      const threshold = barChartSeries.find(s => s.type === 'threshold');
      expect(threshold).toBeDefined();
      expect(threshold?.title).toBe('Performance goal');
    });

    it('should have 5 data points in bar series', () => {
      const site1 = barChartSeries.find(s => s.title === 'Site 1' && s.type === 'bar');
      
      if (site1 && 'data' in site1) {
        expect(site1.data).toHaveLength(5);
      }
    });

    it('should have valid bar chart data points', () => {
      const site1 = barChartSeries.find(s => s.title === 'Site 1' && s.type === 'bar');
      
      if (site1 && 'data' in site1) {
        site1.data.forEach(point => {
          expect(point).toHaveProperty('x');
          expect(point).toHaveProperty('y');
          expect(typeof point.x).toBe('number');
          expect(typeof point.y).toBe('number');
          expect(point.y).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  describe('Table Data', () => {
    it('should have 12 table items', () => {
      expect(tableItems).toHaveLength(12);
    });

    it('should have unique ids for each item', () => {
      const ids = tableItems.map(item => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(tableItems.length);
    });

    it('should have all required columns', () => {
      const firstItem = tableItems[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('column1');
      expect(firstItem).toHaveProperty('column2');
      expect(firstItem).toHaveProperty('column3');
      expect(firstItem).toHaveProperty('column4');
      expect(firstItem).toHaveProperty('column5');
      expect(firstItem).toHaveProperty('column6');
      expect(firstItem).toHaveProperty('column7');
    });

    it('should have Cell Value as default content', () => {
      tableItems.forEach(item => {
        expect(item.column1).toBe('Cell Value');
        expect(item.column2).toBe('Cell Value');
        expect(item.column3).toBe('Cell Value');
      });
    });
  });

  describe('Column Definitions', () => {
    it('should have 7 columns', () => {
      expect(columnDefinitions).toHaveLength(7);
    });

    it('should have unique column ids', () => {
      const ids = columnDefinitions.map(col => col.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(columnDefinitions.length);
    });

    it('should have headers for all columns', () => {
      columnDefinitions.forEach(col => {
        expect(col).toHaveProperty('header');
        expect(col.header).toBe('Column header');
      });
    });

    it('should have cell renderers for all columns', () => {
      columnDefinitions.forEach(col => {
        expect(col).toHaveProperty('cell');
        expect(typeof col.cell).toBe('function');
      });
    });

    it('should have sorting fields for all columns', () => {
      columnDefinitions.forEach(col => {
        expect(col).toHaveProperty('sortingField');
        expect(typeof col.sortingField).toBe('string');
      });
    });

    it('should render cell content correctly', () => {
      const testItem = tableItems[0];
      const col1 = columnDefinitions[0];
      
      const cellContent = col1.cell(testItem);
      expect(cellContent).toBe('Cell Value');
    });
  });

  describe('Data Validation', () => {
    it('should have valid area chart domain', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1' && s.type === 'area');
      
      if (site1 && 'data' in site1) {
        const xValues = site1.data.map(d => d.x);
        expect(Math.min(...xValues)).toBe(1);
        expect(Math.max(...xValues)).toBe(12);
      }
    });

    it('should have valid bar chart domain', () => {
      const site1 = barChartSeries.find(s => s.title === 'Site 1' && s.type === 'bar');
      
      if (site1 && 'data' in site1) {
        const xValues = site1.data.map(d => d.x);
        expect(Math.min(...xValues)).toBe(1);
        expect(Math.max(...xValues)).toBe(5);
      }
    });

    it('should have numeric y values in charts', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1' && s.type === 'area');
      
      if (site1 && 'data' in site1) {
        site1.data.forEach(point => {
          expect(typeof point.y).toBe('number');
          expect(Number.isFinite(point.y)).toBe(true);
        });
      }
    });
  });

  describe('Value Formatters', () => {
    it('should format area chart values to 1 decimal place', () => {
      const site1 = areaChartSeries.find(s => s.title === 'Site 1' && s.type === 'area');
      
      if (site1 && site1.valueFormatter) {
        expect(site1.valueFormatter(3.14159)).toBe('3.1');
        expect(site1.valueFormatter(2.5)).toBe('2.5');
      }
    });

    it('should format threshold values', () => {
      const threshold = areaChartSeries.find(s => s.type === 'threshold');
      
      if (threshold && threshold.valueFormatter) {
        expect(threshold.valueFormatter(3.5)).toBe('3.5');
      }
    });
  });
});
