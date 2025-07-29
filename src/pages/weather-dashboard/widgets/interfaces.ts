// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

export interface WidgetDataType {
  icon: string;
  title: string;
  description: string;
  header: React.ComponentType;
  content: React.ComponentType;
  footer?: React.ComponentType;
  provider?: React.ComponentType<React.PropsWithChildren>;
  disableContentPaddings?: boolean;
  staticMinHeight?: number;
}

export interface WidgetConfig {
  definition?: {
    defaultRowSpan?: number;
    defaultColumnSpan?: number;
  };
  data: WidgetDataType;
}
