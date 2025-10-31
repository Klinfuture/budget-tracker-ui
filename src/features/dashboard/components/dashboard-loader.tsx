import { Skeleton } from "@/components/ui/skeleton";

const BudgetDashboardLoading = () => {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-foreground/10 rounded-lg border border-foreground/20 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>

      {/* Projection Chart Skeleton */}
      <div className="bg-foreground/10 rounded-lg border border-foreground/20 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Revenue Sources + Budget Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Revenue Sources Skeleton */}
        <div className="bg-foreground/10 rounded-lg border border-foreground/20 p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-5 w-24 mb-1 ml-auto" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Breakdown Skeleton */}
        <div className="bg-foreground/10 rounded-lg border border-foreground/20 p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Insights Skeleton */}
      <div className="bg-foreground/10 rounded-lg border border-foreground/20 p-6">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-foreground/30 dark:bg-gray-900 rounded-lg p-4"
            >
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboardLoading;
