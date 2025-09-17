import { createExpenseFormValidationSchema } from "@/features/expenses/components/form/validation";
import { ID } from "@/interface/entity";
import { NoContentResponse, PaginatedResponse, SingleResponse } from "@/interface/response";
import { customFetch } from "@/lib/api";
import * as zod from "zod";
import { Expense } from "../interface";

export async function getExpenses(): Promise<PaginatedResponse<Expense>> {
    return await customFetch("/expenses");
}

export async function getExpenseById(id: ID): Promise<SingleResponse<Expense>> {
    return await customFetch(`/expenses/${id}`);
}

export async function createExpense(
    data: zod.infer<typeof createExpenseFormValidationSchema>
): Promise<NoContentResponse> {
    return await customFetch("/expenses", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateExpense(
    id: ID,
    data: zod.infer<typeof createExpenseFormValidationSchema>
): Promise<NoContentResponse> {
    return await customFetch(`/expenses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteExpense(id: ID): Promise<NoContentResponse> {
    return await customFetch(`/expenses/${id}`, {
        method: "DELETE",
    });
}
