"use client";

import { Edit3, Save, Eye } from "lucide-react";

interface DashboardHeaderProps {
  timeHorizon: string;
  setTimeHorizon: (val: string) => void;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
}

const DashboardHeader = ({
  timeHorizon,
  setTimeHorizon,
  editMode,
  setEditMode,
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Budget Planner</h1>
        <p className="text-gray-300">Plan and forecast your financial future</p>
      </div>
      <div className="flex gap-3">
        <select
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="month">Monthly View</option>
          <option value="quarter">Quarterly View</option>
          <option value="year">Annual View</option>
          <option value="5year">5-Year Projection</option>
        </select>

        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            editMode
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          {editMode ? <Save size={16} /> : <Edit3 size={16} />}
          {editMode ? "Save Changes" : "Edit Budget"}
        </button>

        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <Eye size={16} />
          Scenarios
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
