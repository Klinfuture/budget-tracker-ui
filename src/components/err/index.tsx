import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

type ErrorBoundaryProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const CompactErrorComponent = ({
  error,
  resetErrorBoundary,
}: ErrorBoundaryProps) => {
  return (
    <Card className="border-destructive/50">
      <div className="px-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-destructive/10 text-destructive rounded-full p-2 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              Something went wrong
            </h3>
            <div className="bg-destructive/10 border-l-2 border-destructive p-3 rounded-r">
              <p className="text-destructive text-sm">
                {error?.message || "An unexpected error occurred"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={resetErrorBoundary} variant="destructive">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>

          <Button onClick={() => window.location.reload()} variant="outline">
            Refresh Page
          </Button>
        </div>
      </div>
    </Card>
  );
};
