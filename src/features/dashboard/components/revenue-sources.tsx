"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Confidence } from "./utils";
import { RevenueSource } from "@/features/revenue/interface";


interface RevenueSourcesProps {
  revenueSources: RevenueSource[];
  getConfidenceColor: (conf: Confidence) => string;
}

const RevenueSources = ({
  revenueSources,
  getConfidenceColor,
}: RevenueSourcesProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Revenue Sources</h3>
        <Link href={"/revenues/create"} passHref>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
            <Plus size={16} />
            Add Source
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        {revenueSources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(
                  source.confidence
                )}`}
              >
                {source.confidence}
              </div>
              <div>
                <p className="text-white font-medium">{source?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-bold">
                {source.amount?.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">/month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueSources;
