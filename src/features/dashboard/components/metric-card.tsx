"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  tag?: string;
  tagColor?: string;
}

const MetricCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  tag,
  tagColor,
}: MetricCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon className={iconColor} size={24} />
        </div>
        {tag && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${tagColor}`}
          >
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-gray-300 text-sm font-medium mb-1">{label}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default MetricCard;
