import { SingleResponse } from "@/interface/response";
import { DashBoordResponseData } from "../interface";
import { customFetch } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const dashboardQueryOptions = queryOptions({
  queryKey: ["dashboard-data"],
  queryFn: getDashboardData,
});

export async function getDashboardData(): Promise<SingleResponse<DashBoordResponseData>> {
    return await customFetch("/dashboard");
}