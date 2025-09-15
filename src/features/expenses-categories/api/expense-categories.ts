import { baseURL } from "@/constants/url";
import { CreateExpenseCategoryFormValues } from "@/features/expenses-categories/components/form/validation";
import { ExpenseCategory } from "@/features/expenses-categories/interface";
import { ID } from "@/interface/entity";
import { NormalResponse, PaginatedResponse } from "@/interface/response";

export const getExpenseCategories = async (): Promise<PaginatedResponse<ExpenseCategory>> => {
    try {
    const response = await fetch(baseURL + "/expense-categories");
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch expense categories", { cause: error });
    }

}

export const getExpenseCategoryById = async (id: ID): Promise<NormalResponse<ExpenseCategory>> => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`, { cache: "no-store" });
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

export const updateExpenseCategory = async (id: ID, categoryData: CreateExpenseCategoryFormValues) => {
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

export const deleteExpenseCategory = async (id: ID) => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete expense category");
    }
    
    // Some APIs return 204 (no content) on DELETE
    if (response.status === 204) {
        return { success: true };
    }

    return await response.json();

}

