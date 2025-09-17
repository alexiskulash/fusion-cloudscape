// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

export interface WeatherWidgetDataType {
  icon: 'lineChart' | 'mixedContent' | 'table' | 'list' | 'barChart' | 'pieChart';
  title: string;
  description: string;
  disableContentPaddings?: boolean;
  provider?: React.JSXElementConstructor<{ children: React.ReactElement }>;
  header: React.JSXElementConstructor<Record<string, never>>;
  content: React.JSXElementConstructor<Record<string, never>>;
  footer?: React.JSXElementConstructor<Record<string, never>>;
  staticMinHeight?: number;
}

export type WeatherWidgetConfig = {
  definition: { defaultRowSpan: number; defaultColumnSpan: number; minRowSpan?: number };
  data: WeatherWidgetDataType;
};
