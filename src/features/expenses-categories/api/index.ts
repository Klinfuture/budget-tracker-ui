import { CreateExpenseCategoryFormValues } from "@/features/expenses-categories/components/form/validation";
import { ID } from "@/interface/entity";
import { NoContentResponse, PaginatedResponse, SingleResponse } from "@/interface/response";
import { customFetch } from "@/lib/api";
import { ExpenseCategory } from "../interface";

export async function getExpenseCategories(): Promise<PaginatedResponse<ExpenseCategory>> {
    return await customFetch("/expense-categories");
}

export async function getExpenseCategoryById(id: ID): Promise<SingleResponse<ExpenseCategory>> {
    return await customFetch(`/expense-categories/${id}`);
}

export async function createExpenseCategory(
    data: CreateExpenseCategoryFormValues
): Promise<NoContentResponse> {
    return await customFetch(`/expense-categories`, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateExpenseCategory(
    id: ID,
    data: CreateExpenseCategoryFormValues
): Promise<NoContentResponse> {
    return await customFetch(`/expense-categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteExpenseCategory(id: ID): Promise<NoContentResponse> {
    return await customFetch(`/expense-categories/${id}`, {
        method: "DELETE",
    });
}

