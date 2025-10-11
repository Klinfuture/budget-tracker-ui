"use client";

import { useState } from "react";
import { DollarSign, TrendingDown, TrendingUp, Target } from "lucide-react";
import DashboardHeader from "./components/dashboard-header";
import MetricCard from "./components/metric-card";
import ProjectionChart from "./components/projection-chart";
import RevenueSources from "./components/revenue-sources";
import BudgetBreakdown from "./components/budget-breakdown";
import QuickInsights from "./components/quick-insights";
import { getConfidenceColor } from "./components/utils";

const BudgetPlanningDashboard = () => {
  const [timeHorizon, setTimeHorizon] = useState("year");

  // --- Mock data ---
  const revenueSources = [
    {
      id: 1,
      name: "Primary Salary",
      monthlyAmount: 5500,
      type: "salary",
      confidence: "high",
    },
    {
      id: 2,
      name: "Freelance Projects",
      monthlyAmount: 1200,
      type: "freelance",
      confidence: "medium",
    },
    {
      id: 3,
      name: "Investment Returns",
      monthlyAmount: 350,
      type: "passive",
      confidence: "low",
    },
    {
      id: 4,
      name: "Side Business",
      monthlyAmount: 800,
      type: "business",
      confidence: "medium",
    },
  ];

  const plannedExpenses = [
    { category: "Housing", budgetAmount: 2200, priority: "essential" },
    { category: "Transportation", budgetAmount: 650, priority: "essential" },
    { category: "Food & Groceries", budgetAmount: 800, priority: "essential" },
    { category: "Utilities", budgetAmount: 300, priority: "essential" },
    { category: "Insurance", budgetAmount: 400, priority: "important" },
    { category: "Entertainment", budgetAmount: 500, priority: "flexible" },
    { category: "Shopping", budgetAmount: 350, priority: "flexible" },
    { category: "Savings", budgetAmount: 1500, priority: "goal" },
  ];

  const monthlyProjection = [
    { month: "Jan", revenue: 7850, expenses: 6700, surplus: 1150 },
    { month: "Feb", revenue: 7850, expenses: 6700, surplus: 1150 },
    { month: "Mar", revenue: 7850, expenses: 6700, surplus: 1150 },
    { month: "Apr", revenue: 8200, expenses: 6700, surplus: 1500 },
    { month: "May", revenue: 8200, expenses: 6700, surplus: 1500 },
    { month: "Jun", revenue: 8200, expenses: 6700, surplus: 1500 },
    { month: "Jul", revenue: 7650, expenses: 6700, surplus: 950 },
    { month: "Aug", revenue: 7650, expenses: 6700, surplus: 950 },
    { month: "Sep", revenue: 8100, expenses: 6700, surplus: 1400 },
    { month: "Oct", revenue: 8100, expenses: 6700, surplus: 1400 },
    { month: "Nov", revenue: 8100, expenses: 6700, surplus: 1400 },
    { month: "Dec", revenue: 8500, expenses: 6700, surplus: 1800 },
  ];

  // --- Calculations ---
  const totalMonthlyRevenue = revenueSources.reduce(
    (sum, source) => sum + source.monthlyAmount,
    0
  );
  const totalMonthlyExpenses = plannedExpenses.reduce(
    (sum, exp) => sum + exp.budgetAmount,
    0
  );
  const monthlySurplus = totalMonthlyRevenue - totalMonthlyExpenses;
  const annualSurplus = monthlySurplus * 12;
  const savingsRate = ((monthlySurplus / totalMonthlyRevenue) * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      <DashboardHeader
        timeHorizon={timeHorizon}
        setTimeHorizon={setTimeHorizon}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={DollarSign}
          iconBg="bg-emerald-500/20"
          iconColor="text-emerald-400"
          label="Monthly Revenue"
          value={`$${totalMonthlyRevenue.toLocaleString()}`}
        />
        <MetricCard
          icon={TrendingDown}
          iconBg="bg-red-500/20"
          iconColor="text-red-400"
          label="Monthly Expenses"
          value={`$${totalMonthlyExpenses.toLocaleString()}`}
        />
        <MetricCard
          icon={TrendingUp}
          iconBg="bg-blue-500/20"
          iconColor="text-blue-400"
          label="Monthly Surplus"
          value={`$${monthlySurplus.toLocaleString()}`}
          tag={monthlySurplus >= 0 ? "Positive" : "Negative"}
          tagColor={
            monthlySurplus >= 0
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }
        />
        <MetricCard
          icon={Target}
          iconBg="bg-purple-500/20"
          iconColor="text-purple-400"
          label="Savings Rate"
          value={`${savingsRate}%`}
        />
      </div>

      {/* Projection Chart */}
      <ProjectionChart monthlyProjection={monthlyProjection} />

      {/* Revenue + Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RevenueSources
          revenueSources={revenueSources}
          getConfidenceColor={getConfidenceColor}
        />
        <BudgetBreakdown
          plannedExpenses={plannedExpenses}
          totalMonthlyExpenses={totalMonthlyExpenses}
        />
      </div>

      {/* Insights */}
      <QuickInsights
        annualSurplus={annualSurplus}
        monthlySurplus={monthlySurplus}
      />
    </div>
  );
};

export default BudgetPlanningDashboard;
