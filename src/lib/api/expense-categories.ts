import { CreateExpenseCategoryFormValues } from "@/features/expenses-categories/components/form/validation";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const getExpenseCategories = async () => {
    const response = await fetch(baseURL + "/expense-categories");
    return response.json();
}

export const getExpenseCategoryById = async (id: number) => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`);
    return response.json();
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
    return response.json();
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
    return response.json();
}

export const deleteExpenseCategory = async (id: number) => {
    const response = await fetch(`${baseURL}/expense-categories/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete expense category");
    }
    return response.json();
}

