'use client';

import React, { ReactNode, useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.handleRetry) || (
          <DefaultErrorFallback
            error={this.state.error}
            onRetry={this.handleRetry}
          />
        )
      );
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error;
  onRetry: () => void;
}

function DefaultErrorFallback({ error, onRetry }: DefaultErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-red-500/30 bg-red-500/10 space-y-4">
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-300 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-red-200/80 mb-3">
            {error.message || 'An unexpected error occurred'}
          </p>
          <details className="text-xs text-red-200/60 mb-4">
            <summary className="cursor-pointer hover:text-red-200/80 transition">
              Error details
            </summary>
            <pre className="mt-2 p-2 bg-red-900/20 rounded text-red-200/60 overflow-auto max-h-32">
              {error.stack}
            </pre>
          </details>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Async Error Boundary for handling errors in async components
 * Usage in async components:
 * try {
 *   await asyncOperation();
 * } catch (error) {
 *   setAsyncError(error as Error);
 * }
 */
interface AsyncErrorProps {
  error: Error | null;
  isLoading?: boolean;
  onRetry: () => void;
}

export function AsyncErrorDisplay({
  error,
  isLoading,
  onRetry,
}: AsyncErrorProps) {
  if (!error || isLoading) return null;

  return (
    <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3">
      <svg
        className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex-1">
        <p className="text-sm text-red-300 font-medium mb-2">Error</p>
        <p className="text-xs text-red-200/80 mb-3">
          {error.message || 'Something went wrong. Please try again.'}
        </p>
        <button
          onClick={onRetry}
          className="text-xs text-red-300 hover:text-red-200 font-medium transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
