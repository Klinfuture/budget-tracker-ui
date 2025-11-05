import { FeatureErrorResetBoundary } from "@/contexts/query";
import React from "react";

interface FeatureProps {
  children?: React.ReactNode;
}
export default function Feature({ children }: FeatureProps) {
  return (
    <FeatureErrorResetBoundary>
      <div className="container max-w-screen-xl mx-auto py-8 space-y-4">{children}</div>
    </FeatureErrorResetBoundary>
  );
}
