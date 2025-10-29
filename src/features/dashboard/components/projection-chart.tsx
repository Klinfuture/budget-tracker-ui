"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProjectionChartProps {
  monthlyProjection: {
    month: string;
    revenue: number;
    expenses: number;
    surplus: number;
  }[];
}

const ProjectionChart = ({ monthlyProjection }: ProjectionChartProps) => {
  return (
    <div className="bg-foreground/10 backdrop-blur-md rounded-2xl p-6 border border-foreground/20 mb-8">
      <div className="flex flex-column md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">
          12-Month Financial Projection
        </h3>
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
        <LineChart data={monthlyProjection}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="surplus"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;
