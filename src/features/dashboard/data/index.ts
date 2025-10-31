import { SingleResponse } from "@/interface/response";
import { DashBoordResponseData } from "../interface";
import { customFetch } from "@/lib/api";

export async function getDashboardData(): Promise<SingleResponse<DashBoordResponseData>> {
    return await customFetch("/dashboard");
}