import { baseURL } from "@/constants/url";
import { CreateExpenseCategoryFormValues } from "@/features/expenses-categories/components/form/validation";
import { ExpenseCategory } from "@/features/expenses-categories/interface";
import { NormalResponse, PaginatedResponse } from "@/interface/response";

export const getExpenseCategories = async (): Promise<PaginatedResponse<ExpenseCategory>> => {
    const response = await fetch(baseURL + "/expense-categories");
    return await response.json();

}

export const getExpenseCategoryById = async (id: number): Promise<NormalResponse<ExpenseCategory>> => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`);
    return await response.json();

}

export const createExpenseCategory = async (categoryData: CreateExpenseCategoryFormValues) => {
    const response = await fetch(baseURL + "/expense-categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        throw new Error("Failed to create expense category");
    }
    return await response.json();

}

export const updateExpenseCategory = async (id: number, categoryData: CreateExpenseCategoryFormValues) => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        throw new Error("Failed to update expense category");
    }
    return await response.json();

}

export const deleteExpenseCategory = async (id: number) => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete expense category");
    }
    return await response.json();

}

