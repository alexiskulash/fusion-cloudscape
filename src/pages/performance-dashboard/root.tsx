// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import LineChart from '@cloudscape-design/components/line-chart';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import ContentLayout from '@cloudscape-design/components/content-layout';
import AppLayout from '@cloudscape-design/components/app-layout';
import Badge from '@cloudscape-design/components/badge';
import Link from '@cloudscape-design/components/link';
import Select from '@cloudscape-design/components/select';

const breadcrumbs = [
  {
    text: 'Service',
    href: '#',
  },
  {
    text: 'Performance Monitoring Dashboard',
    href: '#',
  },
];

// Response Time Chart Data (P50, P95, P99 with SLA threshold)
const responseTimeData = [
  {
    title: 'P50 (Median)',
    type: 'line',
    data: [
      { x: new Date('2024-01-29T00:00:00'), y: 145 },
      { x: new Date('2024-01-29T01:00:00'), y: 152 },
      { x: new Date('2024-01-29T02:00:00'), y: 138 },
      { x: new Date('2024-01-29T03:00:00'), y: 142 },
      { x: new Date('2024-01-29T04:00:00'), y: 149 },
      { x: new Date('2024-01-29T05:00:00'), y: 155 },
      { x: new Date('2024-01-29T06:00:00'), y: 168 },
      { x: new Date('2024-01-29T07:00:00'), y: 182 },
      { x: new Date('2024-01-29T08:00:00'), y: 195 },
      { x: new Date('2024-01-29T09:00:00'), y: 210 },
      { x: new Date('2024-01-29T10:00:00'), y: 225 },
      { x: new Date('2024-01-29T11:00:00'), y: 218 },
      { x: new Date('2024-01-29T12:00:00'), y: 220 },
      { x: new Date('2024-01-29T13:00:00'), y: 215 },
      { x: new Date('2024-01-29T14:00:00'), y: 208 },
      { x: new Date('2024-01-29T15:00:00'), y: 195 },
      { x: new Date('2024-01-29T16:00:00'), y: 188 },
      { x: new Date('2024-01-29T17:00:00'), y: 175 },
      { x: new Date('2024-01-29T18:00:00'), y: 162 },
      { x: new Date('2024-01-29T19:00:00'), y: 155 },
      { x: new Date('2024-01-29T20:00:00'), y: 148 },
      { x: new Date('2024-01-29T21:00:00'), y: 142 },
      { x: new Date('2024-01-29T22:00:00'), y: 138 },
      { x: new Date('2024-01-29T23:00:00'), y: 145 },
    ],
    valueFormatter: (value: number) => `${value}ms`,
  },
  {
    title: 'P95',
    type: 'line',
    data: [
      { x: new Date('2024-01-29T00:00:00'), y: 890 },
      { x: new Date('2024-01-29T01:00:00'), y: 920 },
      { x: new Date('2024-01-29T02:00:00'), y: 875 },
      { x: new Date('2024-01-29T03:00:00'), y: 895 },
      { x: new Date('2024-01-29T04:00:00'), y: 925 },
      { x: new Date('2024-01-29T05:00:00'), y: 980 },
      { x: new Date('2024-01-29T06:00:00'), y: 1150 },
      { x: new Date('2024-01-29T07:00:00'), y: 1420 },
      { x: new Date('2024-01-29T08:00:00'), y: 1680 },
      { x: new Date('2024-01-29T09:00:00'), y: 1950 },
      { x: new Date('2024-01-29T10:00:00'), y: 2150 },
      { x: new Date('2024-01-29T11:00:00'), y: 2340 },
      { x: new Date('2024-01-29T12:00:00'), y: 2380 },
      { x: new Date('2024-01-29T13:00:00'), y: 2290 },
      { x: new Date('2024-01-29T14:00:00'), y: 2120 },
      { x: new Date('2024-01-29T15:00:00'), y: 1890 },
      { x: new Date('2024-01-29T16:00:00'), y: 1650 },
      { x: new Date('2024-01-29T17:00:00'), y: 1420 },
      { x: new Date('2024-01-29T18:00:00'), y: 1180 },
      { x: new Date('2024-01-29T19:00:00'), y: 1050 },
      { x: new Date('2024-01-29T20:00:00'), y: 950 },
      { x: new Date('2024-01-29T21:00:00'), y: 920 },
      { x: new Date('2024-01-29T22:00:00'), y: 885 },
      { x: new Date('2024-01-29T23:00:00'), y: 910 },
    ],
    valueFormatter: (value: number) => `${value}ms`,
  },
  {
    title: 'P99',
    type: 'line',
    data: [
      { x: new Date('2024-01-29T00:00:00'), y: 1450 },
      { x: new Date('2024-01-29T01:00:00'), y: 1520 },
      { x: new Date('2024-01-29T02:00:00'), y: 1380 },
      { x: new Date('2024-01-29T03:00:00'), y: 1420 },
      { x: new Date('2024-01-29T04:00:00'), y: 1490 },
      { x: new Date('2024-01-29T05:00:00'), y: 1650 },
      { x: new Date('2024-01-29T06:00:00'), y: 2120 },
      { x: new Date('2024-01-29T07:00:00'), y: 2580 },
      { x: new Date('2024-01-29T08:00:00'), y: 2950 },
      { x: new Date('2024-01-29T09:00:00'), y: 3280 },
      { x: new Date('2024-01-29T10:00:00'), y: 3650 },
      { x: new Date('2024-01-29T11:00:00'), y: 3920 },
      { x: new Date('2024-01-29T12:00:00'), y: 3980 },
      { x: new Date('2024-01-29T13:00:00'), y: 3750 },
      { x: new Date('2024-01-29T14:00:00'), y: 3420 },
      { x: new Date('2024-01-29T15:00:00'), y: 2980 },
      { x: new Date('2024-01-29T16:00:00'), y: 2650 },
      { x: new Date('2024-01-29T17:00:00'), y: 2280 },
      { x: new Date('2024-01-29T18:00:00'), y: 1920 },
      { x: new Date('2024-01-29T19:00:00'), y: 1680 },
      { x: new Date('2024-01-29T20:00:00'), y: 1550 },
      { x: new Date('2024-01-29T21:00:00'), y: 1480 },
      { x: new Date('2024-01-29T22:00:00'), y: 1420 },
      { x: new Date('2024-01-29T23:00:00'), y: 1480 },
    ],
    valueFormatter: (value: number) => `${value}ms`,
  },
  {
    title: 'SLA Target (1.5s)',
    type: 'threshold',
    y: 1500,
    valueFormatter: (value: number) => `${value}ms`,
  },
];

// Error Rate Chart Data (4xx and 5xx errors)
const errorRateData = [
  {
    title: '5xx Errors',
    type: 'area',
    data: [
      { x: new Date('2024-01-29T00:00:00'), y: 12 },
      { x: new Date('2024-01-29T01:00:00'), y: 8 },
      { x: new Date('2024-01-29T02:00:00'), y: 5 },
      { x: new Date('2024-01-29T03:00:00'), y: 7 },
      { x: new Date('2024-01-29T04:00:00'), y: 9 },
      { x: new Date('2024-01-29T05:00:00'), y: 15 },
      { x: new Date('2024-01-29T06:00:00'), y: 23 },
      { x: new Date('2024-01-29T07:00:00'), y: 35 },
      { x: new Date('2024-01-29T08:00:00'), y: 48 },
      { x: new Date('2024-01-29T09:00:00'), y: 67 },
      { x: new Date('2024-01-29T10:00:00'), y: 89 },
      { x: new Date('2024-01-29T11:00:00'), y: 125 },
      { x: new Date('2024-01-29T12:00:00'), y: 142 },
      { x: new Date('2024-01-29T13:00:00'), y: 118 },
      { x: new Date('2024-01-29T14:00:00'), y: 95 },
      { x: new Date('2024-01-29T15:00:00'), y: 72 },
      { x: new Date('2024-01-29T16:00:00'), y: 58 },
      { x: new Date('2024-01-29T17:00:00'), y: 42 },
      { x: new Date('2024-01-29T18:00:00'), y: 31 },
      { x: new Date('2024-01-29T19:00:00'), y: 22 },
      { x: new Date('2024-01-29T20:00:00'), y: 18 },
      { x: new Date('2024-01-29T21:00:00'), y: 14 },
      { x: new Date('2024-01-29T22:00:00'), y: 10 },
      { x: new Date('2024-01-29T23:00:00'), y: 11 },
    ],
    valueFormatter: (value: number) => `${value} errors`,
  },
  {
    title: '4xx Errors',
    type: 'area',
    data: [
      { x: new Date('2024-01-29T00:00:00'), y: 45 },
      { x: new Date('2024-01-29T01:00:00'), y: 38 },
      { x: new Date('2024-01-29T02:00:00'), y: 32 },
      { x: new Date('2024-01-29T03:00:00'), y: 35 },
      { x: new Date('2024-01-29T04:00:00'), y: 42 },
      { x: new Date('2024-01-29T05:00:00'), y: 55 },
      { x: new Date('2024-01-29T06:00:00'), y: 78 },
      { x: new Date('2024-01-29T07:00:00'), y: 105 },
      { x: new Date('2024-01-29T08:00:00'), y: 132 },
      { x: new Date('2024-01-29T09:00:00'), y: 165 },
      { x: new Date('2024-01-29T10:00:00'), y: 198 },
      { x: new Date('2024-01-29T11:00:00'), y: 225 },
      { x: new Date('2024-01-29T12:00:00'), y: 242 },
      { x: new Date('2024-01-29T13:00:00'), y: 218 },
      { x: new Date('2024-01-29T14:00:00'), y: 185 },
      { x: new Date('2024-01-29T15:00:00'), y: 152 },
      { x: new Date('2024-01-29T16:00:00'), y: 125 },
      { x: new Date('2024-01-29T17:00:00'), y: 98 },
      { x: new Date('2024-01-29T18:00:00'), y: 75 },
      { x: new Date('2024-01-29T19:00:00'), y: 62 },
      { x: new Date('2024-01-29T20:00:00'), y: 52 },
      { x: new Date('2024-01-29T21:00:00'), y: 48 },
      { x: new Date('2024-01-29T22:00:00'), y: 41 },
      { x: new Date('2024-01-29T23:00:00'), y: 46 },
    ],
    valueFormatter: (value: number) => `${value} errors`,
  },
];

// Throughput Chart Data (Top endpoints by request volume)
const throughputData = [
  {
    title: 'Requests/min',
    type: 'bar',
    data: [
      { x: 'GET /api/products', y: 245 },
      { x: 'POST /api/users', y: 189 },
      { x: 'GET /api/orders', y: 167 },
      { x: 'POST /api/auth/login', y: 142 },
      { x: 'GET /api/categories', y: 128 },
      { x: 'PUT /api/users/profile', y: 95 },
      { x: 'GET /api/search', y: 87 },
      { x: 'POST /api/orders', y: 76 },
    ],
    valueFormatter: (value: number) => `${value} req/min`,
  },
];

// Slowest Endpoints Table Data
const slowestEndpoints = [
  {
    id: '1',
    endpoint: 'POST /api/users/authenticate',
    avgResponseTime: 1850,
    p95ResponseTime: 2340,
    requestCount: 12450,
    errorRate: 2.3,
    trend: 'up',
  },
  {
    id: '2',
    endpoint: 'GET /api/products/search',
    avgResponseTime: 1620,
    p95ResponseTime: 2150,
    requestCount: 8920,
    errorRate: 1.8,
    trend: 'up',
  },
  {
    id: '3',
    endpoint: 'POST /api/orders/checkout',
    avgResponseTime: 1450,
    p95ResponseTime: 1890,
    requestCount: 5680,
    errorRate: 3.5,
    trend: 'down',
  },
  {
    id: '4',
    endpoint: 'GET /api/analytics/report',
    avgResponseTime: 1380,
    p95ResponseTime: 1750,
    requestCount: 3250,
    errorRate: 0.8,
    trend: 'stable',
  },
  {
    id: '5',
    endpoint: 'PUT /api/inventory/update',
    avgResponseTime: 1220,
    p95ResponseTime: 1650,
    requestCount: 7840,
    errorRate: 2.1,
    trend: 'up',
  },
  {
    id: '6',
    endpoint: 'GET /api/users/preferences',
    avgResponseTime: 980,
    p95ResponseTime: 1420,
    requestCount: 15230,
    errorRate: 1.2,
    trend: 'stable',
  },
  {
    id: '7',
    endpoint: 'POST /api/feedback/submit',
    avgResponseTime: 850,
    p95ResponseTime: 1180,
    requestCount: 2150,
    errorRate: 0.5,
    trend: 'down',
  },
  {
    id: '8',
    endpoint: 'DELETE /api/cart/items',
    avgResponseTime: 720,
    p95ResponseTime: 950,
    requestCount: 4580,
    errorRate: 1.5,
    trend: 'stable',
  },
];

// Recent Errors Table Data
const recentErrors = [
  {
    id: '1',
    timestamp: new Date('2024-01-29T15:23:00'),
    errorType: '5xx',
    endpoint: 'POST /api/orders',
    message: 'Database connection timeout',
    occurrences: 45,
  },
  {
    id: '2',
    timestamp: new Date('2024-01-29T15:18:00'),
    errorType: '5xx',
    endpoint: 'GET /api/products/search',
    message: 'Elasticsearch cluster unavailable',
    occurrences: 23,
  },
  {
    id: '3',
    timestamp: new Date('2024-01-29T15:12:00'),
    errorType: '4xx',
    endpoint: 'POST /api/auth/login',
    message: 'Invalid credentials provided',
    occurrences: 156,
  },
  {
    id: '4',
    timestamp: new Date('2024-01-29T15:05:00'),
    errorType: '5xx',
    endpoint: 'PUT /api/inventory/update',
    message: 'Redis cache write failure',
    occurrences: 12,
  },
  {
    id: '5',
    timestamp: new Date('2024-01-29T14:58:00'),
    errorType: '4xx',
    endpoint: 'GET /api/orders/history',
    message: 'Unauthorized access attempt',
    occurrences: 89,
  },
  {
    id: '6',
    timestamp: new Date('2024-01-29T14:45:00'),
    errorType: '5xx',
    endpoint: 'POST /api/users/register',
    message: 'Email service unavailable',
    occurrences: 8,
  },
  {
    id: '7',
    timestamp: new Date('2024-01-29T14:32:00'),
    errorType: '4xx',
    endpoint: 'PUT /api/users/profile',
    message: 'Validation failed: invalid email format',
    occurrences: 34,
  },
  {
    id: '8',
    timestamp: new Date('2024-01-29T14:21:00'),
    errorType: '5xx',
    endpoint: 'GET /api/analytics/dashboard',
    message: 'Internal server error',
    occurrences: 5,
  },
];

// Column definitions for Slowest Endpoints Table
const slowestEndpointsColumns = [
  {
    id: 'endpoint',
    header: 'Endpoint',
    cell: (item: any) => item.endpoint,
    sortingField: 'endpoint',
    width: 280,
  },
  {
    id: 'avgResponseTime',
    header: 'Avg Response Time',
    cell: (item: any) => `${item.avgResponseTime}ms`,
    sortingField: 'avgResponseTime',
  },
  {
    id: 'p95ResponseTime',
    header: 'P95 Response Time',
    cell: (item: any) => `${item.p95ResponseTime}ms`,
    sortingField: 'p95ResponseTime',
  },
  {
    id: 'requestCount',
    header: 'Request Count (24h)',
    cell: (item: any) => item.requestCount.toLocaleString(),
    sortingField: 'requestCount',
  },
  {
    id: 'errorRate',
    header: 'Error Rate',
    cell: (item: any) => `${item.errorRate}%`,
    sortingField: 'errorRate',
  },
  {
    id: 'trend',
    header: 'Trend',
    cell: (item: any) => {
      if (item.trend === 'up') return '↑';
      if (item.trend === 'down') return '↓';
      return '→';
    },
    sortingField: 'trend',
  },
];

// Column definitions for Recent Errors Table
const recentErrorsColumns = [
  {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (item: any) => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - item.timestamp.getTime()) / 1000 / 60);
      return `${diff} minutes ago`;
    },
    sortingField: 'timestamp',
  },
  {
    id: 'errorType',
    header: 'Error Type',
    cell: (item: any) => (
      <Badge color={item.errorType === '5xx' ? 'red' : 'blue'}>{item.errorType}</Badge>
    ),
    sortingField: 'errorType',
  },
  {
    id: 'endpoint',
    header: 'Endpoint',
    cell: (item: any) => item.endpoint,
    sortingField: 'endpoint',
    width: 250,
  },
  {
    id: 'message',
    header: 'Message',
    cell: (item: any) => item.message,
    sortingField: 'message',
    width: 300,
  },
  {
    id: 'occurrences',
    header: 'Occurrences',
    cell: (item: any) => item.occurrences,
    sortingField: 'occurrences',
  },
  {
    id: 'action',
    header: 'Action',
    cell: () => (
      <Button variant="inline-link">View Details</Button>
    ),
  },
];

const Content = () => {
  const [alertVisible, setAlertVisible] = useState(true);
  const [timeRange, setTimeRange] = useState({ label: 'Last 24 hours', value: '24h' });
  const [endpointsSortingColumn, setEndpointsSortingColumn] = useState<any>({
    sortingField: 'p95ResponseTime',
    isDescending: true,
  });
  const [errorsSortingColumn, setErrorsSortingColumn] = useState<any>({
    sortingField: 'timestamp',
    isDescending: true,
  });

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Real-time application performance metrics for DevOps teams, SREs, and developers"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Select
                selectedOption={timeRange}
                onChange={({ detail }) => setTimeRange(detail.selectedOption as any)}
                options={[
                  { label: 'Last hour', value: '1h' },
                  { label: 'Last 24 hours', value: '24h' },
                  { label: 'Last 7 days', value: '7d' },
                  { label: 'Last 30 days', value: '30d' },
                ]}
              />
              <Button iconName="refresh">Refresh Data</Button>
            </SpaceBetween>
          }
        >
          Performance Monitoring Dashboard
        </Header>
      }
    >
      <SpaceBetween size="l">
        {/* Alert Banner */}
        {alertVisible && (
          <Alert
            type="warning"
            dismissible
            onDismiss={() => setAlertVisible(false)}
            header="Response time SLA breached"
            action={
              <Button href="#" variant="primary">
                View Incident
              </Button>
            }
          >
            95th percentile response time at 2.3s exceeds target of 1.5s. Current error rate spike detected at 15%
            failure rate in the last 5 minutes.{' '}
            <Link external href="#">
              View detailed traces
            </Link>
          </Alert>
        )}

        {/* Service Health Status Cards */}
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xs: 6, s: 3 } },
            { colspan: { default: 12, xs: 6, s: 3 } },
            { colspan: { default: 12, xs: 6, s: 3 } },
            { colspan: { default: 12, xs: 6, s: 3 } },
          ]}
        >
          <Container>
            <Box textAlign="center" padding="m">
              <Box variant="h1" fontWeight="bold" color="text-status-success">
                99.95%
              </Box>
              <Box variant="small" color="text-label">
                Uptime (30 days)
              </Box>
              <Box variant="small" color="text-status-success" margin={{ top: 'xs' }}>
                ↑ 0.03%
              </Box>
            </Box>
          </Container>

          <Container>
            <Box textAlign="center" padding="m">
              <Box margin={{ bottom: 'xs' }}>
                <Badge color="green">Operational</Badge>
              </Box>
              <Box variant="small" color="text-label">
                Current Status
              </Box>
              <Box variant="small" color="text-body-secondary" margin={{ top: 'xs' }}>
                All systems running
              </Box>
            </Box>
          </Container>

          <Container>
            <Box textAlign="center" padding="m">
              <Box variant="h1" fontWeight="bold">
                3
              </Box>
              <Box variant="small" color="text-label">
                Incidents (24h)
              </Box>
              <Box variant="small" color="text-body-secondary" margin={{ top: 'xs' }}>
                2 resolved, 1 active
              </Box>
            </Box>
          </Container>

          <Container>
            <Box textAlign="center" padding="m">
              <Box variant="h1" fontWeight="bold">
                12.5m
              </Box>
              <Box variant="small" color="text-label">
                Mean Time to Recovery
              </Box>
              <Box variant="small" color="text-status-success" margin={{ top: 'xs' }}>
                ↓ 2.3m improvement
              </Box>
            </Box>
          </Container>
        </Grid>

        {/* Charts Row: Response Time and Error Rate */}
        <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
          <Container header={<Header variant="h2">Response Time Percentiles</Header>}>
            <LineChart
              series={responseTimeData as any}
              xScaleType="time"
              yDomain={[0, 4500]}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                detailPopoverDismissAriaLabel: 'Dismiss',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'line chart',
                xTickFormatter: (value: any) =>
                  value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                yTickFormatter: (value: number) => `${value}ms`,
              }}
              ariaLabel="Response time percentiles chart"
              height={300}
              hideFilter
              hideLegend={false}
              xTitle="Time"
              yTitle="Response Time (ms)"
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
          </Container>

          <Container header={<Header variant="h2">Error Rate Over Time</Header>}>
            <AreaChart
              series={errorRateData as any}
              xScaleType="time"
              yDomain={[0, 300]}
              stackedBars={true}
              i18nStrings={{
                filterLabel: 'Filter displayed data',
                filterPlaceholder: 'Filter data',
                filterSelectedAriaLabel: 'selected',
                detailPopoverDismissAriaLabel: 'Dismiss',
                legendAriaLabel: 'Legend',
                chartAriaRoleDescription: 'area chart',
                xTickFormatter: (value: any) =>
                  value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                yTickFormatter: (value: number) => `${value}`,
              }}
              ariaLabel="Error rate chart"
              height={300}
              hideFilter
              hideLegend={false}
              xTitle="Time"
              yTitle="Error Count"
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
          </Container>
        </Grid>

        {/* Throughput Chart */}
        <Container header={<Header variant="h2">Throughput by Endpoint</Header>}>
          <BarChart
            series={throughputData as any}
            xDomain={throughputData[0].data.map(d => d.x)}
            yDomain={[0, 300]}
            i18nStrings={{
              filterLabel: 'Filter displayed data',
              filterPlaceholder: 'Filter data',
              filterSelectedAriaLabel: 'selected',
              detailPopoverDismissAriaLabel: 'Dismiss',
              legendAriaLabel: 'Legend',
              chartAriaRoleDescription: 'bar chart',
              xTickFormatter: (value: any) => value,
              yTickFormatter: (value: number) => `${value}`,
            }}
            ariaLabel="Throughput by endpoint chart"
            height={300}
            hideFilter
            hideLegend
            horizontalBars
            xScaleType="categorical"
            xTitle="Endpoint"
            yTitle="Requests per Minute"
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
        </Container>

        {/* Slowest Endpoints Table */}
        <Table
          columnDefinitions={slowestEndpointsColumns}
          items={slowestEndpoints}
          sortingColumn={endpointsSortingColumn}
          onSortingChange={({ detail }) => setEndpointsSortingColumn(detail.sortingColumn)}
          sortingDescending={endpointsSortingColumn.isDescending}
          header={
            <Header
              variant="h2"
              description="API endpoints ranked by P95 response time"
              counter={`(${slowestEndpoints.length})`}
            >
              Slowest Endpoints
            </Header>
          }
          variant="container"
          stickyHeader
        />

        {/* Recent Errors Table */}
        <Table
          columnDefinitions={recentErrorsColumns}
          items={recentErrors}
          sortingColumn={errorsSortingColumn}
          onSortingChange={({ detail }) => setErrorsSortingColumn(detail.sortingColumn)}
          sortingDescending={errorsSortingColumn.isDescending}
          header={
            <Header
              variant="h2"
              description="Latest application errors with occurrence count"
              counter={`(${recentErrors.length})`}
            >
              Recent Errors
            </Header>
          }
          variant="container"
          stickyHeader
        />
      </SpaceBetween>
    </ContentLayout>
  );
};

export function App() {
  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={<BreadcrumbGroup items={breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
      content={<Content />}
    />
  );
}
