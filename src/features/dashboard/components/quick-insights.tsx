"use client";

interface QuickInsightsProps {
  annualSurplus: number;
  monthlySurplus: number;
}

const QuickInsights = ({
  annualSurplus,
  monthlySurplus,
}: QuickInsightsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-emerald-500/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20">
        <h4 className="text-emerald-400 font-bold mb-2">Annual Projection</h4>
        <p className="text-2xl font-bold mb-2">
          ${annualSurplus.toLocaleString()}
        </p>
        <p className="text-emerald-300 text-sm">
          Expected annual surplus based on current plan
        </p>
      </div>

      <div className="bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
        <h4 className="text-blue-400 font-bold mb-2">Budget Health</h4>
        <p className="text-2xl font-bold  mb-2">
          {monthlySurplus >= 0 ? "Healthy" : "At Risk"}
        </p>
        <p className="text-blue-300 text-sm">
          {monthlySurplus >= 0
            ? "Your budget plan shows positive cash flow"
            : "Consider adjusting expenses or increasing revenue"}
        </p>
      </div>

      <div className="bg-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-purple-400 font-bold mb-2">Next Action</h4>
        <p className="text-lg font-bold text-white mb-2">Review Q2</p>
        <p className="text-purple-300 text-sm">
          Consider adjusting freelance projections for better accuracy
        </p>
      </div>
    </div>
  );
};

export default QuickInsights;
