import { AlertTriangle, RefreshCw } from "lucide-react";

export const CompactErrorComponent = ({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary:(...args:any[])=>void;
}) => {
  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-1 shadow-lg">
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 rounded-full p-2 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Something went wrong
            </h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r">
              <p className="text-red-700 text-sm">
                {error?.message || "An unexpected error occurred"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={resetErrorBoundary}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};
