// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BaseStaticWidget } from '../../widgets/base-static-widget';
import { WidgetDataType } from '../../widgets/interfaces';

// Mock the Container component to simplify testing
jest.mock('@cloudscape-design/components/container', () => {
  return function MockContainer({ header, children, footer, fitHeight, disableContentPaddings }: any) {
    return (
      <div data-testid="container">
        <div data-testid="fit-height">{fitHeight ? 'true' : 'false'}</div>
        <div data-testid="disable-content-paddings">{disableContentPaddings ? 'true' : 'false'}</div>
        {header && <div data-testid="header-section">{header}</div>}
        <div data-testid="content-section">{children}</div>
        {footer && <div data-testid="footer-section">{footer}</div>}
      </div>
    );
  };
});

describe('BaseStaticWidget', () => {
  const mockHeader = () => <div data-testid="mock-header">Mock Header</div>;
  const mockContent = () => <div data-testid="mock-content">Mock Content</div>;
  const mockFooter = () => <div data-testid="mock-footer">Mock Footer</div>;

  const baseConfig: WidgetDataType = {
    icon: 'status-info',
    title: 'Test Widget',
    description: 'Test widget description',
    header: mockHeader,
    content: mockContent,
  };

  it('should render widget with basic configuration', () => {
    render(<BaseStaticWidget config={baseConfig} />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
  });

  it('should render widget with footer when provided', () => {
    const configWithFooter = {
      ...baseConfig,
      footer: mockFooter,
    };

    render(<BaseStaticWidget config={configWithFooter} />);

    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('footer-section')).toBeInTheDocument();
  });

  it('should not render footer when not provided', () => {
    render(<BaseStaticWidget config={baseConfig} />);

    expect(screen.queryByTestId('mock-footer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer-section')).not.toBeInTheDocument();
  });

  it('should pass fitHeight=true to Container', () => {
    render(<BaseStaticWidget config={baseConfig} />);

    expect(screen.getByTestId('fit-height')).toHaveTextContent('true');
  });

  it('should pass disableContentPaddings when configured', () => {
    const configWithPaddings = {
      ...baseConfig,
      disableContentPaddings: true,
    };

    render(<BaseStaticWidget config={configWithPaddings} />);

    expect(screen.getByTestId('disable-content-paddings')).toHaveTextContent('true');
  });

  it('should not disable content paddings by default', () => {
    render(<BaseStaticWidget config={baseConfig} />);

    expect(screen.getByTestId('disable-content-paddings')).toHaveTextContent('false');
  });

  it('should apply staticMinHeight style when provided', () => {
    const configWithMinHeight = {
      ...baseConfig,
      staticMinHeight: 300,
    };

    const { container } = render(<BaseStaticWidget config={configWithMinHeight} />);
    const widgetDiv = container.firstChild as HTMLElement;

    expect(widgetDiv).toHaveStyle('min-height: 300px');
  });

  it('should not apply staticMinHeight style when not provided', () => {
    const { container } = render(<BaseStaticWidget config={baseConfig} />);
    const widgetDiv = container.firstChild as HTMLElement;

    expect(widgetDiv).not.toHaveStyle('min-height: 300px');
  });

  it('should use provider wrapper when provided', () => {
    const MockProvider = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-provider">{children}</div>
    );

    const configWithProvider = {
      ...baseConfig,
      provider: MockProvider,
    };

    render(<BaseStaticWidget config={configWithProvider} />);

    expect(screen.getByTestId('mock-provider')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('should use React.Fragment as default wrapper when no provider', () => {
    const { container } = render(<BaseStaticWidget config={baseConfig} />);

    // Should only have the widget div and container, no additional wrapper
    expect(container.firstChild).toHaveClass('staticWidget');
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('should have correct CSS class applied', () => {
    const { container } = render(<BaseStaticWidget config={baseConfig} />);
    const widgetDiv = container.firstChild as HTMLElement;

    expect(widgetDiv).toHaveClass('staticWidget');
  });

  it('should render complex widget configuration', () => {
    const ComplexProvider = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="complex-provider">{children}</div>
    );

    const complexConfig: WidgetDataType = {
      icon: 'status-warning',
      title: 'Complex Widget',
      description: 'Complex widget with all options',
      header: mockHeader,
      content: mockContent,
      footer: mockFooter,
      provider: ComplexProvider,
      disableContentPaddings: true,
      staticMinHeight: 250,
    };

    const { container } = render(<BaseStaticWidget config={complexConfig} />);

    expect(screen.getByTestId('complex-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('disable-content-paddings')).toHaveTextContent('true');

    const widgetDiv = container.firstChild as HTMLElement;
    expect(widgetDiv).toHaveStyle('min-height: 250px');
  });
});
