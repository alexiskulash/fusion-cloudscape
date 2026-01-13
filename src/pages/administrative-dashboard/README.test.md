# Administrative Dashboard Unit Tests

## Setup Instructions

To run the unit tests for the Administrative Dashboard, you need to install the required testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Running the Tests

Once the dependencies are installed, you can run the unit tests using:

```bash
# Run all unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit -- --watch

# Run unit tests with coverage
npm run test:unit -- --coverage
```

## Add to package.json

Add the following script to your `package.json`:

```json
{
  "scripts": {
    "test:unit": "jest --config jest.unit.config.js"
  }
}
```

## Test Coverage

The unit tests for the Administrative Dashboard cover:

### Page Header

- ✅ Renders the page title "Administration Dashboard"
- ✅ Renders the page description
- ✅ Renders the "Refresh Data" button with icon

### Breadcrumbs

- ✅ Renders breadcrumb navigation
- ✅ Shows "Service" and "Administrative Dashboard" breadcrumb items

### Charts

- ✅ Renders area chart with y-axis and x-axis labels
- ✅ Renders bar chart with y-axis and x-axis labels
- ✅ Charts display with proper data series

### Data Table

- ✅ Renders table with column headers
- ✅ Displays table rows with cell values
- ✅ Text filter input for searching
- ✅ Filter text updates on user input
- ✅ Pagination controls (next/previous buttons)

### Table Selection

- ✅ Multi-select checkboxes in table
- ✅ Selection state updates on checkbox click

### Pagination

- ✅ Page changes when pagination buttons are clicked
- ✅ Displays correct number of pages based on data

### Accessibility

- ✅ Proper ARIA labels for charts
- ✅ Proper ARIA labels for pagination controls
- ✅ Screen reader friendly component structure

### Layout

- ✅ Renders content in CustomAppLayout
- ✅ Navigation and tools panels hidden as configured

### Data Integration

- ✅ Area chart renders with mock data
- ✅ Bar chart renders with mock data
- ✅ Table generates correct number of items (12 total)
- ✅ Pagination shows 10 items per page

## Test File Structure

```
src/pages/administrative-dashboard/
├── root.tsx          # Main component
├── root.test.tsx     # Unit tests
└── index.tsx         # Route entry point
```

## Mocking Strategy

The tests use mocking for:

- `CustomAppLayout` - Simplified layout wrapper
- `Breadcrumbs` - Basic breadcrumb display
- `HelpPanelProvider` - Context provider wrapper

This allows us to focus on testing the dashboard's specific functionality without dealing with complex layout component internals.

## Best Practices Followed

1. **Descriptive test names** - Each test clearly describes what it's testing
2. **Organized test suites** - Tests grouped by feature area (Header, Charts, Table, etc.)
3. **Accessibility testing** - Includes tests for ARIA labels and screen reader support
4. **User interaction testing** - Tests user actions like clicking and typing
5. **Isolation** - Each test is independent and doesn't rely on others
6. **Mocking** - External dependencies are mocked to keep tests fast and focused

## Extending the Tests

To add more tests:

1. Follow the existing test structure in `root.test.tsx`
2. Use `describe` blocks to group related tests
3. Use `it` or `test` for individual test cases
4. Use `screen.getByText()`, `screen.getByRole()`, etc. for querying elements
5. Use `fireEvent` or `userEvent` for simulating interactions
6. Always add accessibility tests for new features
