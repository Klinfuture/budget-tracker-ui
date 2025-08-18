import React from "react";

interface FeatureProps {
  children?: React.ReactNode;
}
export default function Feature({ children }: FeatureProps) {
  return <div className="space-y-4">{children}</div>;
}
