"use server";

import { createExpenseFormValidationSchema } from "@/features/expenses/components/form/validation";
import * as zod from "zod";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const getExpenses = async () => {
    // Fetch expenses from the API
    const response = await fetch(baseURL + "/expenses");
    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }
    return response.json();
}

export const getExpenseById = async (id: number) => {
    // Fetch a single expense by ID from the API
    const response = await fetch(`${baseURL}/expenses/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch expense");
    }
    return response.json();
}

export const createExpense = async (expenseData: zod.infer<typeof createExpenseFormValidationSchema>) => {
    // Create a new expense via the API
    const response = await fetch(baseURL + "/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        throw new Error("Failed to create expense");
    }
    return response.json();
}


export const updateExpense = async (id: number, expenseData: zod.infer<typeof createExpenseFormValidationSchema>) => {
    // Update an existing expense via the API
    const response = await fetch(`${baseURL}/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        throw new Error("Failed to update expense");
    }
    return response.json();
}


export const deleteExpense = async (id: number) => {
    // Delete an expense via the API
    const response = await fetch(`${baseURL}/expenses/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete expense");
    }
    return response.json();
}