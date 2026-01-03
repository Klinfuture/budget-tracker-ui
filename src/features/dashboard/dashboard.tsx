"use client";

import { useQuery } from "@tanstack/react-query";
import { DollarSign, Target, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import BudgetBreakdown from "./components/budget-breakdown";
import DashboardHeader from "./components/dashboard-header";
import BudgetDashboardLoading from "./components/dashboard-loader";
import MetricCard from "./components/metric-card";
import ProjectionChart from "./components/projection-chart";
import QuickInsights from "./components/quick-insights";
import { Confidence, getConfidenceColor } from "./components/utils";
import RevenueSources from "./components/revenue-sources";
import { dashboardQueryOptions } from "./data";

export enum TimeHorizon {
  MONTH = "monthly",
  YEAR = "yearly",
  QUARTER = "quarterly",
  FIVE_YEAR = "5-Years",
}

const BudgetPlanningDashboard = () => {
  const { data, error, isLoading } = useQuery(dashboardQueryOptions);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon | string>(
    TimeHorizon.MONTH
  );

  const plannedExpenses = useMemo(() => data?.data?.expenses || [], [data?.data?.expenses]);

  const revenueSources = useMemo(() => data?.data?.revenues?.map((data) => ({
    ...data,
    confidence: Confidence.HIGH,
  })) || [], [data?.data?.revenues]);

  const totalMonthlyRevenue = revenueSources.reduce(
    (sum, source) => sum + source.amount,
    0
  );
  const totalMonthlyExpenses = plannedExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const monthlySurplus = totalMonthlyRevenue - totalMonthlyExpenses;
  const annualSurplus = monthlySurplus * 12;
  const savingsRate = ((monthlySurplus / totalMonthlyRevenue) * 100).toFixed(1);

  const { totalExpense, totalRevenue, totalSurplus } = useMemo(() => {
    switch (timeHorizon) {
      case TimeHorizon.FIVE_YEAR:
        return {
          totalExpense: totalMonthlyExpenses * 12 * 5,
          totalRevenue: totalMonthlyRevenue * 12 * 5,
          totalSurplus: monthlySurplus * 12 * 5,
        };
      case TimeHorizon.YEAR:
        return {
          totalExpense: totalMonthlyExpenses * 12,
          totalRevenue: totalMonthlyRevenue * 12,
          totalSurplus: monthlySurplus * 12,
        };
      case TimeHorizon.QUARTER:
        return {
          totalExpense: totalMonthlyExpenses * 3,
          totalRevenue: totalMonthlyRevenue * 3,
          totalSurplus: monthlySurplus * 3,
        };
      default:
        return {
          totalExpense: totalMonthlyExpenses,
          totalRevenue: totalMonthlyRevenue,
          totalSurplus: monthlySurplus,
        };
    }
  }, [timeHorizon]);

  const periodicProjection = [
    { name: "totalRevenue", value: totalRevenue },
    { name: "expenses", value: totalExpense },
    { name: "totalSurplus", value: totalSurplus },
  ];

  const metrics = useMemo(
    () => [
      {
        icon: DollarSign,
        iconBg: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
        label: "Revenue",
        value: `${totalRevenue.toLocaleString()}`,
      },
      {
        icon: TrendingDown,
        iconBg: "bg-red-500/20",
        iconColor: "text-red-400",
        label: "Expenses",
        value: `${totalExpense.toLocaleString()}`,
      },
      {
        icon: TrendingUp,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
        label: "Surplus",
        value: `${totalSurplus.toLocaleString()}`,
        tag: totalSurplus >= 0 ? "Positive" : "Negative",
        tagColor:
          totalSurplus >= 0
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400",
      },
      {
        icon: Target,
        iconBg: "bg-purple-500/20",
        iconColor: "text-purple-400",
        label: "Savings Rate",
        value: `${savingsRate}%`,
      },
    ],
    [totalExpense, totalRevenue, totalSurplus]
  );

  if (isLoading) return <BudgetDashboardLoading />;

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader
        timeHorizon={timeHorizon}
        setTimeHorizon={setTimeHorizon}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            iconBg={metric.iconBg}
            iconColor={metric.iconColor}
            label={`${timeHorizon} ${metric.label}`}
            value={metric.value}
            tag={metric.tag}
            tagColor={metric.tagColor}
          />
        ))}
      </div>

      {/* Projection Chart */}
      <ProjectionChart monthlyProjection={periodicProjection} />

      {/* Revenue + Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RevenueSources
          revenueSources={revenueSources}
          getConfidenceColor={getConfidenceColor}
        />
        <BudgetBreakdown
          plannedExpenses={plannedExpenses}
          totalExpense={totalExpense}
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
