import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingFormProps {
  fields?: number;
  showButton?: boolean;
  className?: string;
}

const LoadingFormField = () => (
  <div className="space-y-2">
    {/* Label skeleton */}
    <Skeleton className="h-4 w-20" />

    {/* Input skeleton */}
    <Skeleton className="h-10 w-full" />
  </div>
);

const LoadingTextareaField = () => (
  <div className="space-y-2">
    {/* Label skeleton */}
    <Skeleton className="h-4 w-24" />

    {/* Textarea skeleton */}
    <Skeleton className="h-20 w-full" />
  </div>
);

export default function LoadingForm({
  fields = 2,
  showButton = true,
  className = "",
}: LoadingFormProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Generate loading fields */}
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index}>
          {/* Show textarea for last field if more than 1 field */}
          {index === fields - 1 && fields > 1 ? (
            <LoadingTextareaField />
          ) : (
            <LoadingFormField />
          )}
        </div>
      ))}

      {/* Loading button */}
      {showButton && (
        <div className="pt-2">
          <Skeleton className="h-10 w-24" />
        </div>
      )}
    </div>
  );
}

// Alternative specialized loading forms for common use cases
export const LoadingExpenseCategoryForm = () => (
  <LoadingForm fields={2} showButton={true} />
);

export const LoadingProfileForm = () => (
  <LoadingForm fields={4} showButton={true} />
);

export const LoadingContactForm = () => (
  <LoadingForm fields={3} showButton={true} />
);

export const LoadingCardForm = () => (
  <div className="space-y-6 p-6 border rounded-lg bg-card">
    <div className="space-y-2">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
    <LoadingForm fields={2} showButton={true} />
  </div>
);

export const LoadingDialogForm = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-64" />
    </div>
    <LoadingForm fields={2} showButton={false} />
    <div className="flex justify-end space-x-2 pt-4">
      <Skeleton className="h-9 w-16" />
      <Skeleton className="h-9 w-20" />
    </div>
  </div>
);

// Usage examples in your components:
/*

// Basic usage - replace your loading div
if (isLoading) {
  return <LoadingForm />;
}

// Custom number of fields
if (isLoading) {
  return <LoadingForm fields={3} />;
}

// Without submit button
if (isLoading) {
  return <LoadingForm fields={2} showButton={false} />;
}

// With custom styling
if (isLoading) {
  return <LoadingForm className="max-w-md mx-auto p-4" />;
}

// Use specialized forms
if (isLoading) {
  return <LoadingExpenseCategoryForm />;
}

// For card layouts
if (isLoading) {
  return <LoadingCardForm />;
}

// For dialog/modal forms
if (isLoading) {
  return <LoadingDialogForm />;
}

*/
