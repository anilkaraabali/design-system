import { ICommonView } from '@/model';
import React from 'react';

import { Error } from './Error';

interface ErrorBoundaryProps extends ICommonView {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): JSX.Element | React.ReactNode {
    if (this.state.hasError) {
      return <Error {...this.props} statusCode={400} />;
    }

    return this.props.children;
  }
}
