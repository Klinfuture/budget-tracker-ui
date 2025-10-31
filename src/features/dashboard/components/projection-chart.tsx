"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface ProjectionChartProps {
  monthlyProjection: {
    name: string;
    value: number;
  }[];
}

const ProjectionChart = ({ monthlyProjection }: ProjectionChartProps) => {
  return (
    <div className="bg-foreground/10 backdrop-blur-md rounded-2xl p-6 border border-foreground/20 mb-8">
      <div className="flex flex-column md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Financial Projection</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-300">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Surplus</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          accessibilityLayer
          data={monthlyProjection}
          barCategoryGap="10%"
          barGap={4}
          height={300}
          syncMethod="index"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip defaultIndex={3} />
          <Bar
            dataKey="value"
            name="Amount"
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;

              // Define color mapping based on name
              const colorMap: Record<string, string> = {
                revenue: "oklch(69.6% 0.17 162.48)",
                expenses: "oklch(63.7% 0.237 25.331)",
                surplus: "oklch(62.3% 0.214 259.815)",
                // Add more name-to-color mappings as needed
              };

              // Get color based on the name field in your data
              const fill = colorMap[payload.name] || "#10B981"; // fallback color

              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  rx={4}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;
