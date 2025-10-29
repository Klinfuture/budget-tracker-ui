import { ID } from "@/interface/entity";
import { NoContentResponse, PaginatedResponse, SingleResponse } from "@/interface/response";
import { customFetch } from "@/lib/api";
import { RevenueSource } from "../interface";
import { CreateRevenueSourceFormValues } from "../components/form/validation";

export async function getRevenueSources(): Promise<PaginatedResponse<RevenueSource>> {
    return await customFetch("/revenue-sources");
}

export async function getRevenueSourceById(id: ID): Promise<SingleResponse<RevenueSource>> {
    return await customFetch(`/revenue-sources/${id}`);
}

export async function createRevenueSource(
    data: CreateRevenueSourceFormValues
): Promise<NoContentResponse> {
    return await customFetch(`/revenue-sources`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateRevenueSource(
    id: ID,
    data: CreateRevenueSourceFormValues
): Promise<NoContentResponse> {
    return await customFetch(`/revenue-sources/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteRevenueSource(id: ID): Promise<NoContentResponse> {
    return await customFetch(`/revenue-sources/${id}`, {
        method: "DELETE",
    });
}

