"use client";

import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
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


export const FeatureErrorResetBoundary = (props: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
              <p className="font-bold">Something went wrong:</p>
              <pre className="whitespace-pre-wrap">{error.message}</pre>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  resetErrorBoundary();
                }}
              >
                Try again
              </button>
            </div>
          )}
        >
          {props.children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}