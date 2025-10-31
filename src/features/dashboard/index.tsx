import Feature from "@/components/feature";
import { getQueryClient } from "@/lib/query-client";
import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from "@tanstack/react-query";
import BudgetPlanningDashboard from "./dashboard";
import { getDashboardData } from "./data";

export const dashboardQueryOptions = queryOptions({
  queryKey: ["dashboard-data"],
  queryFn: getDashboardData,
});

export default async function Dashboard() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(dashboardQueryOptions);
  return (
    <Feature>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BudgetPlanningDashboard />
      </HydrationBoundary>
    </Feature>
  );
}
