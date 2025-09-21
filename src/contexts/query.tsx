"use client";

import { CompactErrorComponent } from "@/components/err";
import { getQueryClient } from "@/lib/query-client";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface TenstackQueryProviderProps {
  children?: React.ReactNode;
}

export default function TenstackQueryProvider(
  props: TenstackQueryProviderProps
) {
  const [client] = React.useState(() => getQueryClient());
  return (
    <QueryClientProvider client={client}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export const FeatureErrorResetBoundary = (props: {
  children: React.ReactNode;
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <CompactErrorComponent
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          {props.children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
