import { FeatureErrorResetBoundary } from "@/contexts/query";
import React from "react";

interface FeatureProps {
  children?: React.ReactNode;
}
export default function Feature({ children }: FeatureProps) {
  return (
    <FeatureErrorResetBoundary>
      <div className="space-y-4">{children}</div>
    </FeatureErrorResetBoundary>
  );
}
