# Administrative Dashboard

A comprehensive dashboard displaying charts and data tables using Cloudscape Design System components.

## Features

- **Area Chart**: Displays performance metrics for two sites with threshold visualization
- **Bar Chart**: Shows comparative data across multiple periods with performance goals
- **Data Table**: Multi-select table with 7 columns and pagination support
- **Responsive Layout**: Charts stack on mobile and display side-by-side on larger screens

## Testing

This dashboard includes comprehensive Jest testing:

### Unit Tests

Located in `src/pages/administrative-dashboard/app.test.tsx`

Tests cover:
- Data structure validation
- Area chart series (Site 1, Site 2, threshold)
- Bar chart series configuration
- Table data integrity
- Column definitions
- Value formatters
- Data domain validation

**Run unit tests:**
```bash
npm test -- app.test.tsx
```

### E2E Tests

Located in `test/e2e/administrative-dashboard.test.ts`

Tests cover:
- Page rendering and layout
- Breadcrumb navigation
- Header and action buttons
- Text filter functionality
- Pagination controls
- Chart rendering
- Table selection and sorting
- Responsive grid layout

**Run e2e tests:**
```bash
npm run jest -- administrative-dashboard.test.ts
```

**Run all tests:**
```bash
npm test
```

## Code Organization

- `index.tsx` - Entry point
- `app.tsx` - Main component with UI logic
- `data.ts` - Exported data structures for charts and tables
- `app.test.tsx` - Unit tests for data structures
- `../../test/e2e/administrative-dashboard.test.ts` - Browser-based e2e tests

## Data Structures

All data structures are exported from `data.ts` for:
- Easy testing
- Separation of concerns
- Potential data source integration

### Area Chart Data
- 2 area series with 12 data points each
- 1 threshold line for performance goals

### Bar Chart Data
- 1 bar series with 5 data points
- 1 threshold line for performance goals

### Table Data
- 12 rows of sample data
- 7 columns with sortable headers
- Multi-select capability

## Development

The dashboard follows Cloudscape Design System patterns and integrates seamlessly with the demo catalog.

**Access the dashboard:**
Navigate to `/administrative-dashboard` or select "Administrative Dashboard" from the demo catalog.
