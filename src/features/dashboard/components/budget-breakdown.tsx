"use client";

import { Plus } from "lucide-react";
import { getPriorityColor } from "./utils";

interface Expense {
  category: string;
  budgetAmount: number;
  priority: string;
}

interface BudgetBreakdownProps {
  plannedExpenses: Expense[];
  totalMonthlyExpenses: number;
}

const BudgetBreakdown = ({
  plannedExpenses,
  totalMonthlyExpenses,
}: BudgetBreakdownProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Budget Allocation</h3>
        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
          <Plus size={16} />
          Add Category
        </button>
      </div>
      <div className="space-y-3">
        {plannedExpenses.map((expense, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
              expense.priority
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">
                  {expense.category}
                </span>
                <span className="text-xs text-gray-400 capitalize px-2 py-1 bg-white/10 rounded-full">
                  {expense.priority}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  ${expense.budgetAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  {(
                    (expense.budgetAmount / totalMonthlyExpenses) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetBreakdown;
