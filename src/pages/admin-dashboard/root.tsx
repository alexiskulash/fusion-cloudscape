// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * ============================================================================
 * ADMINISTRATION DASHBOARD COMPONENT
 * ============================================================================
 *
 * OVERVIEW:
 * This module implements a comprehensive administration dashboard that serves
 * as a complete example of the Cloudscape Design System's capabilities for
 * building data-intensive AWS console-style applications.
 *
 * KEY FEATURES:
 * 1. Real-time Data Visualization
 *    - Area chart showing trending data across multiple series
 *    - Bar chart for categorical metric comparison
 *    - Threshold indicators for performance goals
 *
 * 2. Interactive Data Table
 *    - Multi-row selection with checkboxes
 *    - Client-side filtering with live match count
 *    - Column-based sorting (ascending/descending)
 *    - Pagination with configurable page size
 *
 * 3. Responsive Grid Layout
 *    - Mobile-first design that stacks charts vertically on small screens
 *    - Side-by-side chart display on tablets and desktops
 *    - Automatic adjustment based on viewport size
 *
 * 4. System Notifications
 *    - Dismissible alert banner for important information
 *    - Proper ARIA attributes for accessibility
 *
 * DESIGN PATTERNS:
 * - Component composition for modularity
 * - Separation of data and presentation logic
 * - React hooks for state management
 * - TypeScript for type safety
 * - Cloudscape Design System for consistent UX
 *
 * ARCHITECTURAL NOTES:
 * This dashboard follows the common pattern used across AWS console applications,
 * providing a familiar experience for users and a reusable template for developers.
 * The layout uses the CustomAppLayout wrapper which handles navigation, tools panel,
 * breadcrumbs, and notifications - all standard elements in AWS console applications.
 *
 * PRODUCTION CONSIDERATIONS:
 * - Replace mock data with API calls to real backend services
 * - Implement error handling and loading states
 * - Add data refresh mechanisms (polling, WebSocket, etc.)
 * - Consider implementing server-side pagination for large datasets
 * - Add unit tests for data transformations and user interactions
 * - Implement analytics tracking for user behavior
 *
 * @module AdminDashboard
 * @requires React
 * @requires @cloudscape-design/collection-hooks
 * @requires @cloudscape-design/components
 */

// ============================================================================
// REACT CORE IMPORTS
// ============================================================================
import React, { useRef, useState } from 'react';
// React is the core library for building the component tree
// - useRef: Creates a mutable reference to DOM elements or component instances
//   (used here to reference the AppLayout for programmatic control)
// - useState: React hook for managing component-local state
//   (used here for tracking selected items and panel open/closed states)

// ============================================================================
// CLOUDSCAPE COLLECTION HOOKS
// ============================================================================
import { useCollection } from '@cloudscape-design/collection-hooks';
// The useCollection hook is a powerful utility that manages complex table
// interactions with minimal code. It handles:
// - Filtering: Text-based search across all columns
// - Sorting: Click column headers to sort ascending/descending
// - Pagination: Automatic page splitting and navigation
// - Selection: Track which rows are selected
// This hook significantly reduces boilerplate code that would otherwise be
// needed to implement these features manually. It follows the "batteries included"
// philosophy of the Cloudscape Design System.

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
// TypeScript type definitions for the AppLayout component. This import provides
// type safety for the AppLayout ref, ensuring we only call valid methods on it.
// The AppLayoutProps.Ref type includes methods like:
// - focusToolsClose(): Programmatically focus the tools panel close button
// - openTools(): Open the tools panel programmatically
// - closeTools(): Close the tools panel programmatically

// ============================================================================
// CLOUDSCAPE UI COMPONENTS
// ============================================================================
// The following imports are individual Cloudscape Design System components.
// Each component is imported separately to enable tree-shaking - only the
// components actually used in this file will be included in the final bundle.
// This is a performance optimization that reduces bundle size.

import Pagination from '@cloudscape-design/components/pagination';
// Pagination component provides controls for navigating through pages of data.
// Features: page number display, previous/next buttons, configurable page size

import Table from '@cloudscape-design/components/table';
// Table component is a powerful data table with built-in features for sorting,
// selection, and responsive behavior. It follows AWS console design patterns.

import TextFilter from '@cloudscape-design/components/text-filter';
// TextFilter provides a search input with clear button and results counter.
// Integrates seamlessly with useCollection hook for client-side filtering.

import SpaceBetween from '@cloudscape-design/components/space-between';
// SpaceBetween is a layout component that adds consistent spacing between
// child elements. It's more maintainable than manual margin/padding because
// spacing is controlled in one place and follows design system standards.

import Header from '@cloudscape-design/components/header';
// Header component displays page and section titles with optional descriptions
// and action buttons. Provides consistent typography and layout.

import Button from '@cloudscape-design/components/button';
// Button component with multiple variants (primary, normal, link, icon) and
// built-in states (loading, disabled). Includes proper focus management and
// keyboard accessibility.

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
// BreadcrumbGroup shows the navigation path to help users understand their
// location in the application hierarchy. Each breadcrumb is clickable to
// navigate back to parent pages.

import Box from '@cloudscape-design/components/box';
// Box is a versatile container component that provides consistent spacing,
// text styling, and layout utilities. It's the foundation for most layouts
// in Cloudscape applications.

import AreaChart from '@cloudscape-design/components/area-chart';
// AreaChart visualizes data as filled areas under lines, useful for showing
// trends over time and comparing multiple data series. Supports interactive
// features like tooltips, legend filtering, and threshold lines.

import BarChart from '@cloudscape-design/components/bar-chart';
// BarChart displays data as vertical or horizontal bars, ideal for comparing
// categorical data. Supports stacked bars, thresholds, and interactive tooltips.

import Container from '@cloudscape-design/components/container';
// Container wraps content with consistent padding, borders, and optional
// headers/footers. Used to group related content visually.

import ColumnLayout from '@cloudscape-design/components/column-layout';
// ColumnLayout arranges content in responsive columns. Unused in this file
// but imported for potential future use. Consider removing if not needed
// to reduce bundle size.

import Grid from '@cloudscape-design/components/grid';
// Grid provides a flexible 12-column grid system with responsive breakpoints.
// Used here to arrange charts side-by-side on larger screens and stacked on mobile.

import Alert from '@cloudscape-design/components/alert';
// Alert displays important messages to users with different severity levels
// (info, success, warning, error). Supports dismissal and custom actions.

// ============================================================================
// SHARED APPLICATION COMPONENTS
// ============================================================================
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
// These are reusable components shared across the application:
// - CustomAppLayout: Wraps the standard AppLayout with application-specific
//   configuration (theme, locale, common props)
// - Navigation: Side navigation component with hierarchical menu structure
// - Notifications: Flash message banner for system notifications
// - TableEmptyState: Component shown when table has no data at all
// - TableNoMatchState: Component shown when filter returns no results

// ============================================================================
// SHARED UTILITIES
// ============================================================================
import { commonChartProps } from '../dashboard/widgets/chart-commons';
// commonChartProps contains shared configuration for all charts including:
// - Loading and error states
// - Empty state messages
// - i18n strings for accessibility
// - Number/date formatters
// Centralizing this configuration ensures consistency across all charts
// and makes it easy to update all charts at once.

// ============================================================================
// STYLES
// ============================================================================
import '../../styles/base.scss';
// Base SCSS styles that apply globally to the application. Includes:
// - CSS reset/normalization
// - Typography defaults
// - Common utility classes
// - Theme variables

// ============================================================================
// DATA GENERATION UTILITIES
// ============================================================================

/**
 * Generates mock table data for demonstration purposes
 *
 * OVERVIEW:
 * This function creates an array of sample data items to populate the table.
 * In a real application, this would be replaced with an API call to fetch
 * data from a backend service.
 *
 * IMPLEMENTATION DETAILS:
 * - Creates exactly 12 rows of data
 * - Each row has a unique ID and 7 columns of data
 * - All column values are placeholder strings ("Cell Value")
 * - Uses a simple loop to avoid repetitive code
 *
 * DATA STRUCTURE:
 * Each item in the returned array has this shape:
 * {
 *   id: string,     // Unique identifier (e.g., "item-1", "item-2")
 *   col1: string,   // First column value
 *   col2: string,   // Second column value
 *   col3: string,   // Third column value
 *   col4: string,   // Fourth column value
 *   col5: string,   // Fifth column value
 *   col6: string,   // Sixth column value
 *   col7: string    // Seventh column value
 * }
 *
 * PRODUCTION REPLACEMENT EXAMPLE:
 * ```typescript
 * const fetchTableData = async () => {
 *   try {
 *     const response = await fetch('/api/admin-data');
 *     const data = await response.json();
 *     return data.items;
 *   } catch (error) {
 *     console.error('Failed to fetch data:', error);
 *     return [];
 *   }
 * };
 * ```
 *
 * @returns {Array<Object>} Array of 12 table row objects with id and column values
 *
 * @example
 * const data = generateTableData();
 * console.log(data.length); // 12
 * console.log(data[0]); // { id: 'item-1', col1: 'Cell Value', ... }
 */
const generateTableData = () => {
  // Initialize empty array to store table rows
  const data = [];

  // Generate 12 rows of data
  // The number 12 is chosen to demonstrate pagination (with 10 items per page,
  // this will result in 2 pages)
  for (let i = 0; i < 12; i++) {
    // Create a new row object and add it to the array
    // Each row has:
    // - A unique ID for React key and item identification
    // - Seven columns of placeholder data
    data.push({
      // Unique identifier using 1-based indexing for human readability
      // (e.g., "item-1", "item-2", etc.)
      id: `item-${i + 1}`,

      // Placeholder values for each column
      // In production, these would be actual data fields like:
      // - col1: item.name
      // - col2: item.status
      // - col3: item.created_date
      // etc.
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }

  // Return the complete array of table rows
  return data;
};

// ============================================================================
// CHART DATA CONFIGURATION
// ============================================================================

/**
 * Area Chart Series Data Configuration
 *
 * OVERVIEW:
 * Defines the data series for the area chart visualization. This configuration
 * matches the design specifications from the original Figma mockup, showing
 * two performance metrics (Site 1 and Site 2) with a performance goal threshold.
 *
 * CHART STRUCTURE:
 * The area chart displays three elements:
 * 1. Site 1 series: Filled area showing performance trend (higher values)
 * 2. Site 2 series: Filled area showing performance trend (lower values)
 * 3. Performance goal: Horizontal threshold line at y=3.5
 *
 * DATA SERIES TYPES:
 * - 'area': Renders as a filled region under a line
 *   - Good for showing magnitude and trends
 *   - Multiple series are stacked or overlaid
 *   - Visual weight helps compare relative values
 *
 * - 'threshold': Renders as a horizontal or vertical line
 *   - Used to mark targets, limits, or boundaries
 *   - Helps users quickly identify if values meet goals
 *   - Can be styled differently (dashed, dotted, etc.)
 *
 * DATA POINT STRUCTURE:
 * Each data point in the series has two properties:
 * - x: The position along the horizontal axis (time, category, sequence)
 * - y: The measured value (performance metric, count, percentage, etc.)
 *
 * INTERPRETATION:
 * - X-axis values 1-12 could represent months, hours, or any sequential data
 * - Y-axis values represent the performance metric being measured
 * - Site 1 shows generally higher performance (range 2.8-5.8)
 * - Site 2 shows lower but still positive performance (range 1.8-4.0)
 * - Both sites show variation over time with some upward trends
 * - The threshold at 3.5 helps identify which periods meet the goal
 *
 * PRODUCTION CONSIDERATIONS:
 * In a real application, this data would typically:
 * - Come from an API endpoint (REST, GraphQL, etc.)
 * - Include timestamps for x-axis instead of sequential numbers
 * - Have proper data types and validation
 * - Support different time ranges (day, week, month, year)
 * - Update in real-time or on a refresh interval
 *
 * @type {Array<Object>} Array of chart series configurations
 *
 * @example
 * // Typical production data transformation:
 * const transformApiData = (apiData) => {
 *   return [
 *     {
 *       type: 'area',
 *       title: apiData.site1.name,
 *       data: apiData.site1.metrics.map(m => ({
 *         x: new Date(m.timestamp),
 *         y: m.value
 *       }))
 *     },
 *     // ... additional series
 *   ];
 * };
 */
const areaChartSeries = [
  {
    // Type must be 'area' for filled area visualization
    // 'as const' is a TypeScript assertion that makes this a literal type,
    // ensuring type safety and enabling proper type checking
    type: 'area' as const,

    // Series title shown in the legend
    // Users can click legend items to show/hide series
    title: 'Site 1',

    // Array of data points for this series
    // Each point represents a measurement at a specific x position
    data: [
      { x: 1, y: 2.8 }, // First measurement: value of 2.8
      { x: 2, y: 3.2 }, // Second measurement: value of 3.2 (trending up)
      { x: 3, y: 3.8 }, // Third measurement: value of 3.8 (continuing upward)
      { x: 4, y: 4.2 }, // Fourth measurement: value of 4.2
      { x: 5, y: 4.8 }, // Fifth measurement: value of 4.8
      { x: 6, y: 5.2 }, // Sixth measurement: value of 5.2 (peak region starts)
      { x: 7, y: 5.5 }, // Seventh measurement: value of 5.5
      { x: 8, y: 5.8 }, // Eighth measurement: value of 5.8 (highest point)
      { x: 9, y: 5.5 }, // Ninth measurement: value of 5.5 (slight decrease)
      { x: 10, y: 5.2 }, // Tenth measurement: value of 5.2
      { x: 11, y: 5.5 }, // Eleventh measurement: value of 5.5 (recovering)
      { x: 12, y: 5.8 }, // Twelfth measurement: value of 5.8 (ending high)
    ],
  },
  {
    // Second area series for comparison
    type: 'area' as const,

    // Series title for legend
    title: 'Site 2',

    // Data points for Site 2 - generally lower values than Site 1
    // This creates a visual comparison between the two sites
    data: [
      { x: 1, y: 1.8 }, // Starting lower than Site 1
      { x: 2, y: 2.0 }, // Gradual increase
      { x: 3, y: 2.5 }, // Continuing upward trend
      { x: 4, y: 3.0 }, // Approaching performance goal
      { x: 5, y: 3.5 }, // Reaching performance goal (matches threshold)
      { x: 6, y: 4.0 }, // Peak performance for Site 2
      { x: 7, y: 3.8 }, // Slight decline from peak
      { x: 8, y: 3.5 }, // Back to goal level
      { x: 9, y: 3.0 }, // Declining below goal
      { x: 10, y: 2.8 }, // Continuing decline
      { x: 11, y: 3.2 }, // Starting to recover
      { x: 12, y: 3.8 }, // Ending on an upward trend
    ],
  },
  {
    // Threshold series - displays as a horizontal line
    type: 'threshold' as const,

    // Label for the threshold line shown in legend
    title: 'Performance goal',

    // Y-value where the threshold line is drawn
    // This is the target performance level that both sites should meet
    // Set at 3.5 to be visible between Site 1 and Site 2 performance
    y: 3.5,
  },
];

/**
 * Bar Chart Series Data Configuration
 *
 * OVERVIEW:
 * Defines the data series for the bar chart visualization. Shows categorical
 * performance metrics with a threshold line indicating the target performance level.
 *
 * CHART STRUCTURE:
 * The bar chart displays:
 * 1. Site 1 performance bars: Vertical bars showing values at 5 data points
 * 2. Performance goal threshold: Horizontal line at y=450
 *
 * USE CASE:
 * Bar charts are ideal for:
 * - Comparing discrete categories or time periods
 * - Showing magnitude differences clearly
 * - Displaying data that doesn't have continuous transitions
 *
 * The threshold line helps users quickly assess:
 * - Which data points meet the performance goal
 * - How far above or below the goal each point is
 * - Overall performance trend relative to the goal
 *
 * DATA INTERPRETATION:
 * Looking at the values:
 * - Point 1: 450 (exactly at goal)
 * - Point 2: 630 (significantly above goal - 40% higher)
 * - Point 3: 520 (above goal - 16% higher)
 * - Point 4: 300 (below goal - 33% lower, needs attention)
 * - Point 5: 510 (above goal - 13% higher)
 *
 * Analysis: Most points exceed the goal, but point 4 shows a concerning dip
 * that may require investigation or corrective action.
 *
 * CHART CONFIGURATION OPTIONS:
 * The bar chart supports additional features not used here:
 * - stackedBars: Stack multiple series in each bar
 * - horizontalBars: Display bars horizontally instead of vertically
 * - Multiple series: Show multiple bars per category for comparison
 *
 * PRODUCTION EXAMPLE:
 * ```typescript
 * // Real-world API integration
 * const fetchBarChartData = async () => {
 *   const response = await fetch('/api/performance-metrics');
 *   const data = await response.json();
 *   return [{
 *     type: 'bar',
 *     title: data.site_name,
 *     data: data.metrics.map((m, index) => ({
 *       x: index + 1,
 *       y: m.value
 *     }))
 *   }, {
 *     type: 'threshold',
 *     title: 'Target',
 *     y: data.target_value
 *   }];
 * };
 * ```
 *
 * @type {Array<Object>} Array of bar chart series configurations
 */
const barChartSeries = [
  {
    // Type must be 'bar' for vertical bar visualization
    // TypeScript 'as const' ensures type literal for better type checking
    type: 'bar' as const,

    // Series name displayed in chart legend
    title: 'Site 1',

    // Data points for each bar
    // x values are categories (1, 2, 3, 4, 5)
    // y values are the bar heights (performance metrics)
    data: [
      { x: 1, y: 450 }, // First category: value at goal
      { x: 2, y: 630 }, // Second category: highest value, well above goal
      { x: 3, y: 520 }, // Third category: above goal
      { x: 4, y: 300 }, // Fourth category: BELOW goal (needs attention)
      { x: 5, y: 510 }, // Fifth category: above goal, good performance
    ],
  },
  {
    // Threshold line to mark the performance goal
    type: 'threshold' as const,

    // Threshold label for legend
    title: 'Performance goal',

    // Goal value - bars above this line meet the goal
    // Set at 450 to match the baseline performance expectation
    y: 450,
  },
];

// ============================================================================
// TABLE CONFIGURATION
// ============================================================================

/**
 * Table Column Definitions
 *
 * OVERVIEW:
 * Configures the structure of the data table, defining how each column
 * should be displayed, sorted, and rendered. This configuration follows
 * the Cloudscape Table component API specification.
 *
 * COLUMN DEFINITION STRUCTURE:
 * Each column object contains:
 *
 * 1. id (string):
 *    - Unique identifier for the column
 *    - Used as the React key for the column
 *    - Should be stable across renders
 *    - Convention: use the data field name
 *
 * 2. header (string):
 *    - Text displayed in the column header row
 *    - Should be descriptive and concise
 *    - May include sort indicators when column is sorted
 *    - Consider i18n for multi-language support
 *
 * 3. cell (function):
 *    - Render function for each cell in this column
 *    - Receives the row item as parameter
 *    - Returns the value to display in the cell
 *    - Can return React components for rich content
 *    - Example: (item) => <Link>{item.name}</Link>
 *
 * 4. sortingField (string):
 *    - Field name used for sorting this column
 *    - Typically matches the data property being displayed
 *    - Used by useCollection hook for sort logic
 *    - Optional: omit if column shouldn't be sortable
 *
 * ADVANCED OPTIONS (not used here but available):
 * - width: Fixed pixel width or percentage
 * - minWidth: Minimum width for responsive layouts
 * - sortingComparator: Custom sort function
 * - ariaLabel: Accessibility label for the column
 *
 * PRODUCTION BEST PRACTICES:
 * 1. Define a TypeScript interface for your data items
 * 2. Replace 'any' type with your interface
 * 3. Use more descriptive header text
 * 4. Consider adding custom cell renderers for:
 *    - Links to detail pages
 *    - Status badges
 *    - Formatted dates
 *    - Action buttons
 *
 * EXAMPLE PRODUCTION COLUMN:
 * ```typescript
 * {
 *   id: 'status',
 *   header: 'Status',
 *   cell: (item: DataItem) => (
 *     <StatusIndicator type={item.status === 'active' ? 'success' : 'error'}>
 *       {item.status}
 *     </StatusIndicator>
 *   ),
 *   sortingField: 'status'
 * }
 * ```
 *
 * @type {Array<Object>} Array of column configuration objects
 */
const COLUMN_DEFINITIONS = [
  {
    // First column configuration
    id: 'col1', // Unique identifier for this column
    header: 'Column header', // Text shown in header row
    cell: (item: any) => item.col1, // Extract and display col1 value from each row
    sortingField: 'col1', // Enable sorting by col1 field
  },
  {
    // Second column - same pattern as first
    id: 'col2',
    header: 'Column header',
    cell: (item: any) => item.col2,
    sortingField: 'col2',
  },
  {
    // Third column
    id: 'col3',
    header: 'Column header',
    cell: (item: any) => item.col3,
    sortingField: 'col3',
  },
  {
    // Fourth column
    id: 'col4',
    header: 'Column header',
    cell: (item: any) => item.col4,
    sortingField: 'col4',
  },
  {
    // Fifth column
    id: 'col5',
    header: 'Column header',
    cell: (item: any) => item.col5,
    sortingField: 'col5',
  },
  {
    // Sixth column
    id: 'col6',
    header: 'Column header',
    cell: (item: any) => item.col6,
    sortingField: 'col6',
  },
  {
    // Seventh column (last column)
    id: 'col7',
    header: 'Column header',
    cell: (item: any) => item.col7,
    sortingField: 'col7',
  },
];

// ============================================================================
// COMPONENT TYPE DEFINITIONS
// ============================================================================

/**
 * Props interface for AdminDashboardContent component
 *
 * OVERVIEW:
 * TypeScript interface defining the props (properties) accepted by the
 * AdminDashboardContent component. Props are the way data flows from
 * parent components to child components in React.
 *
 * CURRENT PROPERTIES:
 * @property {any[]} tableData - Array of data items to display in the table
 *
 * ABOUT THE 'any' TYPE:
 * The 'any' type is used here for flexibility during prototyping, but
 * in production code, this should be replaced with a specific interface
 * that describes the exact structure of your data items.
 *
 * PRODUCTION EXAMPLE:
 * ```typescript
 * // Define your data structure
 * interface AdminDataItem {
 *   id: string;
 *   name: string;
 *   status: 'active' | 'inactive' | 'pending';
 *   created_date: Date;
 *   updated_date: Date;
 *   metrics: {
 *     performance: number;
 *     reliability: number;
 *   };
 * }
 *
 * // Use the specific type
 * interface AdminDashboardContentProps {
 *   tableData: AdminDataItem[];
 *   onRefresh?: () => void;
 *   isLoading?: boolean;
 *   error?: Error | null;
 * }
 * ```
 *
 * BENEFITS OF SPECIFIC TYPES:
 * - Catch errors at compile time instead of runtime
 * - Better IDE autocomplete and IntelliSense
 * - Self-documenting code
 * - Refactoring safety
 * - Prevents bugs from typos or wrong property access
 */
interface AdminDashboardContentProps {
  tableData: any[]; // Array of items to display - replace 'any' with specific type in production
}

// ============================================================================
// MAIN CONTENT COMPONENT
// ============================================================================

/**
 * AdminDashboardContent Component
 *
 * OVERVIEW:
 * This component renders the main content area of the administration dashboard.
 * It's responsible for displaying the data visualizations and interactive table,
 * but not the overall page layout (navigation, breadcrumbs, etc.).
 *
 * COMPONENT ARCHITECTURE:
 * This component follows React's composition pattern:
 * - Receives data as props from parent
 * - Manages its own UI state (selected items)
 * - Uses the useCollection hook for table functionality
 * - Returns JSX describing the UI structure
 *
 * KEY FEATURES IMPLEMENTED:
 *
 * 1. STATE MANAGEMENT:
 *    - selectedItems: Tracks which table rows are selected
 *    - useCollection: Manages filtering, sorting, and pagination
 *
 * 2. LAYOUT STRUCTURE:
 *    - SpaceBetween wrapper for consistent vertical spacing
 *    - Header with title and actions
 *    - Alert banner for notifications
 *    - Responsive grid for charts
 *    - Data table with full interaction support
 *
 * 3. USER INTERACTIONS:
 *    - Select/deselect table rows
 *    - Filter table data by text search
 *    - Sort columns ascending/descending
 *    - Navigate between pages
 *    - Refresh data
 *    - Dismiss alert
 *
 * 4. ACCESSIBILITY:
 *    - Proper ARIA labels on charts
 *    - Semantic HTML structure
 *    - Keyboard navigation support
 *    - Screen reader friendly
 *
 * PROPS:
 * @param {AdminDashboardContentProps} props - Component properties
 * @param {any[]} props.tableData - Array of data items for the table
 *
 * RETURNS:
 * @returns {JSX.Element} The rendered dashboard content
 *
 * USAGE EXAMPLE:
 * ```typescript
 * const data = await fetchDashboardData();
 * <AdminDashboardContent tableData={data} />
 * ```
 *
 * PERFORMANCE CONSIDERATIONS:
 * - useCollection hook memoizes expensive operations
 * - Column definitions are defined outside component to avoid recreating on each render
 * - Chart data is also defined outside to prevent unnecessary recalculations
 *
 * FUTURE ENHANCEMENTS:
 * - Add loading states for async operations
 * - Implement error boundaries for error handling
 * - Add data export functionality
 * - Implement real-time updates via WebSocket
 * - Add filters beyond text search (date range, status, etc.)
 */
function AdminDashboardContent({ tableData }: AdminDashboardContentProps) {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================

  /**
   * State: selectedItems
   *
   * PURPOSE:
   * Tracks which rows in the table are currently selected by the user.
   * This enables bulk operations on selected items (delete, export, etc.)
   *
   * STATE TYPE: Array of selected row objects
   * INITIAL VALUE: Empty array (no selections)
   *
   * UPDATES:
   * - User clicks a row checkbox: add to array
   * - User unchecks a row: remove from array
   * - User clicks "select all": array contains all visible items
   * - User clicks "clear selection": array becomes empty
   *
   * USAGE EXAMPLES:
   * - Display count: "2 items selected"
   * - Enable/disable action buttons based on selection
   * - Perform bulk operations on selected items
   */
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  /**
   * useCollection Hook
   *
   * PURPOSE:
   * Manages all table interactions (filtering, sorting, pagination) with
   * a single hook call, significantly reducing boilerplate code.
   *
   * HOOK PARAMETERS:
   * 1. tableData: The source data array to manage
   * 2. Configuration object with:
   *    - filtering: Filter configuration and empty states
   *    - pagination: Page size and pagination settings
   *    - sorting: Default sort column and direction
   *    - selection: Enable row selection feature
   *
   * RETURNED VALUES:
   * - items: Current page of filtered/sorted items to display
   * - actions: Functions to control table state (setFiltering, setSorting, etc.)
   * - filteredItemsCount: Number of items matching current filter
   * - collectionProps: Props to spread directly on Table component
   * - filterProps: Props to spread directly on TextFilter component
   * - paginationProps: Props to spread directly on Pagination component
   *
   * HOW IT WORKS:
   * 1. Takes full dataset as input
   * 2. Applies current filter (if any)
   * 3. Applies current sort (if any)
   * 4. Splits into pages based on page size
   * 5. Returns current page of items
   * 6. Manages all state internally
   * 7. Provides props that automatically wire up components
   *
   * BENEFITS:
   * - No manual filter/sort/pagination logic needed
   * - Consistent behavior across all tables
   * - Optimized performance with memoization
   * - Type-safe with TypeScript
   * - Extensible for custom logic
   */
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableData,
    {
      // Filtering configuration
      filtering: {
        // Component shown when table has no data at all
        empty: <TableEmptyState resourceName="Item" />,
        // Component shown when filter returns no matches
        // Includes a button to clear the filter
        noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
      },

      // Pagination configuration
      pagination: {
        // Number of items per page
        // Chosen to fit comfortably on screen without scrolling
        // Can be made configurable via user preferences
        pageSize: 10,
      },

      // Sorting configuration
      sorting: {
        // Default sort state when component first renders
        // Sorts by the first column in ascending order
        defaultState: {
          sortingColumn: COLUMN_DEFINITIONS[0],
        },
      },

      // Selection configuration
      // Empty object enables selection with default behavior
      // Can be configured with:
      // - trackBy: Custom function to get unique ID for each item
      // - keepSelection: Keep selection when data changes
      selection: {},
    },
  );

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <SpaceBetween size="l">
      {/* ====================================================================
          PAGE HEADER
          ====================================================================
          
          Displays the page title, description, and primary action button.
          
          COMPONENT: Header
          VARIANT: h1 (largest heading size, used for page titles)
          
          PROPS:
          - description: Subtitle text shown below the title
          - actions: React node rendered in the header's action area
                    (typically buttons for primary page actions)
          
          CHILDREN: The main heading text
          
          NOTE: The title "Adminstration" has a typo (should be "Administration")
                This matches the original Figma design but should be corrected
      ====================================================================== */}
      <Header
        variant="h1"
        description="Collection description"
        actions={
          <Button variant="primary" iconName="external" iconAlign="right">
            Refresh Data
          </Button>
        }
      >
        Adminstration Dashboard
      </Header>

      {/* ====================================================================
          ALERT BANNER
          ====================================================================
          
          Displays an informational message to users about the dashboard.
          
          COMPONENT: Alert
          TYPE: info (blue color scheme, informational purpose)
          
          FEATURES:
          - dismissible: Users can close the alert with an X button
          - header: Bold title text for the alert
          - children: Main alert message content
          
          USE CASES FOR ALERTS:
          - Info: General information (like this example)
          - Success: Confirmation of successful operations
          - Warning: Important notices that need attention
          - Error: Error messages for failed operations
          
          BEST PRACTICES:
          - Keep message concise and actionable
          - Use appropriate type for the message severity
          - Consider adding action buttons for next steps
          - Don't overuse - too many alerts reduce effectiveness
      ====================================================================== */}
      <Alert type="info" dismissible header="Dashboard information">
        This dashboard displays real-time administrative data and performance metrics. Data is automatically refreshed
        every 5 minutes.
      </Alert>

      {/* ====================================================================
          CHARTS GRID LAYOUT
          ====================================================================
          
          Responsive grid that arranges charts side-by-side on larger screens
          and stacks them vertically on mobile devices.
          
          COMPONENT: Grid
          
          GRID DEFINITION:
          - Array of column specifications
          - Each item defines colspan (how many of 12 columns to occupy)
          - Responsive breakpoints:
            * default: Mobile/smallest screens (12 cols = full width)
            * s: Small screens like tablets (6 cols = half width, side by side)
          
          LAYOUT BEHAVIOR:
          - On phones: Charts stack vertically (each 12/12 = 100% width)
          - On tablets+: Charts are side-by-side (each 6/12 = 50% width)
          
          GRID SYSTEM:
          The grid is based on a 12-column layout system:
          - colspan: 12 = 100% width (1 column)
          - colspan: 6 = 50% width (2 columns)
          - colspan: 4 = 33.33% width (3 columns)
          - colspan: 3 = 25% width (4 columns)
          
          RESPONSIVE DESIGN:
          This responsive approach ensures:
          - Mobile users see full-width charts (easier to read)
          - Desktop users see side-by-side comparison
          - Optimal use of available screen space
          - No horizontal scrolling required
      ====================================================================== */}
      <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
        {/* ==================================================================
            AREA CHART CONTAINER
            ==================================================================
            
            Container holding the area chart visualization.
            
            COMPONENT: Container
            PROP: fitHeight - Makes container height match content height
            
            CHART COMPONENT: AreaChart
            
            CHART CONFIGURATION:
            - series: Data series to display (defined earlier in file)
            - height: Fixed height in pixels (300px)
            - xScaleType: 'linear' - evenly spaced x-axis values
            - yScaleType: 'linear' - evenly spaced y-axis values
            - xTitle: Label for x-axis
            - yTitle: Label for y-axis
            - ariaLabel: Accessibility description for screen readers
            - i18nStrings: Internationalization strings for UI text
            
            COMMON CHART PROPS:
            Spread operator (...commonChartProps) includes:
            - Loading states
            - Error handling
            - Empty states
            - Number formatters
            - Accessibility strings
            
            This ensures consistent behavior across all charts in the app.
        ================================================================== */}
        <Container fitHeight>
          <AreaChart
            {...commonChartProps}
            series={areaChartSeries}
            height={300}
            xScaleType="linear"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Area chart showing data trends"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>

        {/* ==================================================================
            BAR CHART CONTAINER
            ==================================================================
            
            Container holding the bar chart visualization.
            
            CHART COMPONENT: BarChart
            
            KEY DIFFERENCE FROM AREA CHART:
            - xScaleType: 'categorical' instead of 'linear'
              * 'categorical' is used when x-axis values are discrete categories
                (like months, product names, regions)
              * 'linear' is used for continuous numeric values
              * This affects spacing and labeling of x-axis
            
            CATEGORICAL VS LINEAR SCALES:
            - Categorical: Equal spacing between categories, regardless of value
              Example: "Jan, Feb, Mar" are evenly spaced even though different
                      month lengths
            - Linear: Spacing proportional to numeric value
              Example: Values 1, 2, 10 would show larger gap before 10
            
            All other configuration is similar to the area chart, ensuring
            consistent appearance and behavior across both visualizations.
        ================================================================== */}
        <Container fitHeight>
          <BarChart
            {...commonChartProps}
            series={barChartSeries}
            height={300}
            xScaleType="categorical"
            yScaleType="linear"
            xTitle="X-axis label"
            yTitle="y-axis label"
            ariaLabel="Bar chart showing performance metrics"
            i18nStrings={{
              ...commonChartProps.i18nStrings,
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
            }}
          />
        </Container>
      </Grid>

      {/* ====================================================================
          DATA TABLE
          ====================================================================
          
          Interactive data table with full suite of features:
          - Multi-row selection with checkboxes
          - Text-based filtering
          - Column sorting
          - Pagination
          
          COMPONENT: Table
          
          SPREAD PROPS:
          {...collectionProps} - Automatically includes props from useCollection:
          - sortingColumn: Currently sorted column
          - sortingDescending: Sort direction
          - onSortingChange: Handler for sort changes
          - loading: Loading state
          
          SELECTION PROPS:
          - selectionType: 'multi' - Allow selecting multiple rows with checkboxes
          - selectedItems: Array of currently selected row objects
          - onSelectionChange: Callback when selection changes
          
          HEADER:
          Shows table title and selection counter
          - No selection: "(12)" - total item count
          - With selection: "(2/12)" - selected/total
          
          COLUMN DEFINITIONS:
          Array of column configurations (defined earlier)
          Specifies how each column is rendered and sorted
          
          ITEMS:
          Current page of data from useCollection hook
          Already filtered, sorted, and paginated
          
          FILTER:
          TextFilter component with props from useCollection
          Enables typing to filter table rows
          Shows match count below the input
          
          PAGINATION:
          Pagination component with props from useCollection
          Shows page numbers and navigation buttons
          Page size configured in useCollection (10 items)
          
          EMPTY STATE:
          Box component shown when table has no data
          Displays user-friendly message and description
      ====================================================================== */}
      <Table
        {...collectionProps}
        selectionType="multi"
        header={
          <Header
            counter={selectedItems.length ? `(${selectedItems.length}/${tableData.length})` : `(${tableData.length})`}
          >
            Data
          </Header>
        }
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Placeholder"
            countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
          />
        }
        pagination={<Pagination {...paginationProps} />}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
}

// ============================================================================
// ROOT DASHBOARD COMPONENT
// ============================================================================

/**
 * AdminDashboard Component (Main Export)
 *
 * OVERVIEW:
 * This is the root component for the administration dashboard page.
 * It handles the overall page layout and structure, delegating the
 * content rendering to the AdminDashboardContent component.
 *
 * RESPONSIBILITIES:
 * 1. Page Layout Structure
 *    - Integrates with the application's standard layout (CustomAppLayout)
 *    - Manages the tools panel (help panel) state
 *    - Provides navigation context
 *
 * 2. Data Management
 *    - Generates table data (or would fetch from API in production)
 *    - Passes data down to child components
 *
 * 3. Layout Components
 *    - Breadcrumbs for navigation hierarchy
 *    - Side navigation with active page highlight
 *    - Tools panel for contextual help
 *    - Notifications area for system messages
 *
 * COMPONENT ARCHITECTURE:
 *
 * Layout hierarchy:
 * ```
 * AdminDashboard (this component)
 * └── CustomAppLayout (standard layout wrapper)
 *     ├── breadcrumbs (Service > Administrative Dashboard)
 *     ├── navigation (Side menu)
 *     ├── content (AdminDashboardContent)
 *     ├── tools (Help panel)
 *     └── notifications (Flash messages)
 * ```
 *
 * STATE MANAGEMENT:
 * - toolsOpen: Boolean controlling help panel visibility
 * - appLayout: Ref to AppLayout for programmatic control
 *
 * REF USAGE:
 * The appLayout ref provides access to AppLayout methods:
 * - appLayout.current.focusToolsClose() - Focus the close button
 * - appLayout.current.openTools() - Open tools panel programmatically
 * - appLayout.current.closeTools() - Close tools panel programmatically
 *
 * This is useful for:
 * - Accessibility: Managing focus when panels open/close
 * - Keyboard shortcuts: Open/close panels with keyboard
 * - Guided tours: Programmatically highlight UI elements
 *
 * LAYOUT PROPS EXPLAINED:
 *
 * contentType="table":
 * - Hints to the layout about content type
 * - May affect responsive behavior or styling
 * - Options: 'default', 'table', 'cards', 'form'
 *
 * breadcrumbs:
 * - Shows navigation path: Service > Administrative Dashboard
 * - Each breadcrumb is clickable to navigate back
 * - Helps users understand their location in the app
 *
 * navigation:
 * - Side navigation menu
 * - activeHref prop highlights current page
 * - Provides navigation to other sections
 *
 * tools:
 * - Contextual help panel content
 * - Slides in from the right when opened
 * - Can contain documentation, tips, or related actions
 *
 * toolsOpen:
 * - Boolean state controlling tools panel visibility
 * - true = panel visible, false = panel hidden
 *
 * onToolsChange:
 * - Callback when user opens/closes tools panel
 * - Updates toolsOpen state
 * - detail.open contains the new open state
 *
 * notifications:
 * - Flash message area at top of page
 * - For temporary messages (success, error, info, warning)
 * - Automatically dismissed after timeout or by user
 *
 * RETURNS:
 * @returns {JSX.Element} The complete admin dashboard page with layout
 *
 * USAGE:
 * This component is typically rendered by React Router when user
 * navigates to the /admin-dashboard route:
 * ```typescript
 * <Route path="/admin-dashboard" element={<AdminDashboard />} />
 * ```
 */
export default function AdminDashboard() {
  // ==========================================================================
  // STATE AND REFS
  // ==========================================================================

  /**
   * State: toolsOpen
   *
   * PURPOSE:
   * Controls whether the tools (help) panel is currently visible.
   * The tools panel slides in from the right side of the screen.
   *
   * STATE TYPE: boolean
   * INITIAL VALUE: false (panel starts closed)
   *
   * UPDATES:
   * - User clicks info button: true (opens panel)
   * - User clicks close button: false (closes panel)
   * - User presses Escape key: false (closes panel)
   *
   * CONNECTED COMPONENTS:
   * - CustomAppLayout: Reads this value to show/hide tools panel
   * - Info button: Opens panel when clicked
   * - Close button: Closes panel when clicked
   */
  const [toolsOpen, setToolsOpen] = useState(false);

  /**
   * Ref: appLayout
   *
   * PURPOSE:
   * Holds a reference to the AppLayout component instance, enabling
   * programmatic control of layout features.
   *
   * REF TYPE: AppLayoutProps.Ref
   * INITIAL VALUE: null (assigned when component mounts)
   *
   * AVAILABLE METHODS:
   * - focusToolsClose(): Move keyboard focus to tools panel close button
   * - openTools(): Open tools panel programmatically
   * - closeTools(): Close tools panel programmatically
   *
   * USE CASES:
   * - Accessibility: Focus management when panels open
   * - Keyboard shortcuts: Open panels without clicking
   * - Guided tours: Highlight specific UI elements
   * - Automated testing: Programmatically interact with layout
   *
   * USAGE EXAMPLE:
   * ```typescript
   * const handleHelpShortcut = () => {
   *   setToolsOpen(true);
   *   appLayout.current?.focusToolsClose();
   * };
   * ```
   */
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  /**
   * Data Generation
   *
   * PURPOSE:
   * Generate mock data for the table component.
   *
   * CURRENT IMPLEMENTATION:
   * Calls generateTableData() which returns 12 sample items.
   *
   * PRODUCTION REPLACEMENT:
   * Replace this with an API call or data fetching logic:
   *
   * ```typescript
   * const [tableData, setTableData] = useState([]);
   * const [loading, setLoading] = useState(true);
   * const [error, setError] = useState(null);
   *
   * useEffect(() => {
   *   async function fetchData() {
   *     try {
   *       setLoading(true);
   *       const response = await fetch('/api/admin-data');
   *       const data = await response.json();
   *       setTableData(data.items);
   *     } catch (err) {
   *       setError(err);
   *     } finally {
   *       setLoading(false);
   *     }
   *   }
   *   fetchData();
   * }, []);
   * ```
   */
  const tableData = generateTableData();

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <CustomAppLayout
      // Reference to the layout component for programmatic control
      ref={appLayout}
      // Hint about the type of content being displayed
      // Affects responsive behavior and layout optimizations
      contentType="table"
      // Main content area - the dashboard itself
      content={<AdminDashboardContent tableData={tableData} />}
      // Breadcrumb navigation trail
      // Shows: Service > Administrative Dashboard
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' }, // Link to home page
            { text: 'Administrative Dashboard', href: '#/admin-dashboard' }, // Current page (not clickable)
          ]}
        />
      }
      // Side navigation menu
      // activeHref prop highlights the current page in the menu
      navigation={<Navigation activeHref="#/admin-dashboard" />}
      // Tools panel content (help/documentation)
      // Slides in from right when user clicks info button
      tools={
        <Box padding="l">
          <SpaceBetween size="l">
            <div>
              <Box variant="h3">Administration Dashboard</Box>
              <Box variant="p">View and manage administrative data with charts and detailed tables.</Box>
            </div>
          </SpaceBetween>
        </Box>
      }
      // Boolean state controlling tools panel visibility
      toolsOpen={toolsOpen}
      // Callback when tools panel open state changes
      // Updates our local state to match the panel state
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      // Flash message notifications area
      // Shows temporary messages at top of page
      notifications={<Notifications />}
    />
  );
}
