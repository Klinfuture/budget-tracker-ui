"use client";

import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface TenstackQueryProviderProps {
  children?: React.ReactNode;
}

export default function TenstackQueryProvider(
  props: TenstackQueryProviderProps
) {
  const [client] = React.useState(() => getQueryClient());
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
}
