import Feature from "@/components/feature";
import { getQueryClient } from "@/lib/query-client";
import {
  dehydrate,
  HydrationBoundary
} from "@tanstack/react-query";
import BudgetPlanningDashboard from "./dashboard";
import { dashboardQueryOptions } from "./data";

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
