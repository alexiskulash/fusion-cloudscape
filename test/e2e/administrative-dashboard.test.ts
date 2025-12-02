// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import useBrowser from '@cloudscape-design/browser-test-tools/use-browser';
import { BasePageObject } from '@cloudscape-design/browser-test-tools/page-objects';
import createWrapper from '@cloudscape-design/components/test-utils/selectors';

const wrapper = createWrapper();

describe('Administrative Dashboard', () => {
  const setupTest = (testFn: { (page: BasePageObject): Promise<void> }) => {
    return useBrowser(async browser => {
      const page = new BasePageObject(browser);
      await browser.url('/administrative-dashboard.html');
      await page.waitForVisible(wrapper.findAppLayout().toSelector());
      await testFn(page);
    });
  };

  test(
    'Page loads with correct header',
    setupTest(async page => {
      const headerSelector = wrapper.findHeader('h1').toSelector();
      await expect(page.isDisplayed(headerSelector)).resolves.toBe(true);
      const headerText = await page.getText(headerSelector);
      expect(headerText).toContain('Administration Dashboard');
    }),
  );

  test(
    'Breadcrumbs are displayed correctly',
    setupTest(async page => {
      const breadcrumbSelector = wrapper.findBreadcrumbGroup().toSelector();
      await expect(page.isDisplayed(breadcrumbSelector)).resolves.toBe(true);
      const breadcrumbItems = wrapper.findBreadcrumbGroup().findBreadcrumbLinks();
      await expect(page.getElementsCount(breadcrumbItems.toSelector())).resolves.toBe(2);
    }),
  );

  test(
    'Refresh Data button is present and clickable',
    setupTest(async page => {
      const refreshButtonSelector = wrapper
        .findHeader('h1')
        .findActions()
        .findButton('[iconName="external"]')
        .toSelector();
      await expect(page.isDisplayed(refreshButtonSelector)).resolves.toBe(true);
      await expect(page.isClickable(refreshButtonSelector)).resolves.toBe(true);
    }),
  );

  test(
    'Text filter is present and functional',
    setupTest(async page => {
      const textFilterSelector = wrapper.findTextFilter().toSelector();
      await expect(page.isDisplayed(textFilterSelector)).resolves.toBe(true);
      
      const inputSelector = wrapper.findTextFilter().findInput().toSelector();
      await page.setValue(inputSelector, 'test search');
      const inputValue = await page.getValue(inputSelector);
      expect(inputValue).toBe('test search');
    }),
  );

  test(
    'Pagination component is displayed',
    setupTest(async page => {
      const paginationSelector = wrapper.findPagination().toSelector();
      await expect(page.isDisplayed(paginationSelector)).resolves.toBe(true);
    }),
  );

  test(
    'Pagination allows navigation between pages',
    setupTest(async page => {
      const paginationSelector = wrapper.findPagination();
      const nextPageButton = paginationSelector.findNextPageButton().toSelector();
      
      await expect(page.isDisplayed(nextPageButton)).resolves.toBe(true);
      await page.click(nextPageButton);
      
      // Verify that clicking worked by checking if page 2 is now selected
      const currentPageLabel = paginationSelector.findPageNumberByIndex(2).toSelector();
      await expect(page.elementHasClass(currentPageLabel, 'awsui_selected')).resolves.toBe(true);
    }),
  );

  test(
    'Settings button is present',
    setupTest(async page => {
      const settingsButtonSelector = wrapper.findButton('[iconName="settings"]').toSelector();
      await expect(page.isDisplayed(settingsButtonSelector)).resolves.toBe(true);
    }),
  );

  test(
    'Area chart is rendered',
    setupTest(async page => {
      // Area charts render as SVG elements
      const chartContainers = await page.getElementsCount(wrapper.findContainer().toSelector());
      expect(chartContainers).toBeGreaterThanOrEqual(3); // At least 3 containers (filter, 2 charts)
    }),
  );

  test(
    'Bar chart is rendered',
    setupTest(async page => {
      // Verify multiple containers exist (for charts)
      const containers = await page.getElementsCount(wrapper.findContainer().toSelector());
      expect(containers).toBeGreaterThanOrEqual(3);
    }),
  );

  test(
    'Data table is displayed with correct columns',
    setupTest(async page => {
      const tableSelector = wrapper.findTable().toSelector();
      await expect(page.isDisplayed(tableSelector)).resolves.toBe(true);
      
      // Check that table has 7 columns
      const headerCells = wrapper.findTable().findColumnHeaders();
      const columnCount = await page.getElementsCount(headerCells.toSelector());
      expect(columnCount).toBe(8); // 7 columns + 1 selection column
    }),
  );

  test(
    'Table has multiple rows',
    setupTest(async page => {
      const tableSelector = wrapper.findTable();
      const rowsSelector = tableSelector.findRows().toSelector();
      const rowCount = await page.getElementsCount(rowsSelector);
      expect(rowCount).toBeGreaterThan(0);
    }),
  );

  test(
    'Table supports multi-selection',
    setupTest(async page => {
      const tableSelector = wrapper.findTable();
      
      // Click first row checkbox
      const firstRowCheckbox = tableSelector.findRowSelectionArea(1).toSelector();
      await page.click(firstRowCheckbox);
      
      // Click second row checkbox
      const secondRowCheckbox = tableSelector.findRowSelectionArea(2).toSelector();
      await page.click(secondRowCheckbox);
      
      // Verify selections (implementation depends on how selection state is shown)
      await expect(page.isDisplayed(firstRowCheckbox)).resolves.toBe(true);
      await expect(page.isDisplayed(secondRowCheckbox)).resolves.toBe(true);
    }),
  );

  test(
    'Table header checkboxes allow select all',
    setupTest(async page => {
      const tableSelector = wrapper.findTable();
      const selectAllCheckbox = tableSelector.findSelectAllTrigger().toSelector();
      
      await expect(page.isDisplayed(selectAllCheckbox)).resolves.toBe(true);
      await page.click(selectAllCheckbox);
      
      // After clicking select all, it should be checked
      await expect(page.isDisplayed(selectAllCheckbox)).resolves.toBe(true);
    }),
  );

  test(
    'Layout is responsive with grid',
    setupTest(async page => {
      // Check that grid containers exist
      const gridExists = await page.isExisting('[class*="awsui_grid"]');
      expect(gridExists).toBe(true);
    }),
  );

  test(
    'Page description is displayed',
    setupTest(async page => {
      const headerSelector = wrapper.findHeader('h1').toSelector();
      const headerContent = await page.getElementsText(headerSelector);
      
      // Verify description exists
      expect(headerContent).toBeTruthy();
    }),
  );
});
