"use server";

import { createExpenseFormValidationSchema } from "@/features/expenses/components/form/validation";
import { ID } from "@/interface/entity";
// import { Expense } from "@/features/expenses/interface";
import * as zod from "zod";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const getExpenses = async () => {
    // Fetch expenses from the API
    const response = await fetch(baseURL + "/expenses");
    return await response.json();
}

export const getExpenseById = async (id: ID) => {
    // Fetch a single expense by ID from the API
    const response = await fetch(`${baseURL}/expenses/${id}`);
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

    return response.json();
}


export const updateExpense = async (id: ID, expenseData: zod.infer<typeof createExpenseFormValidationSchema>) => {
    // Update an existing expense via the API
    const response = await fetch(`${baseURL}/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
    });

    return await response.json();
}


export const deleteExpense = async (id: ID) => {
    // Delete an expense via the API
    const response = await fetch(`${baseURL}/expenses/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete expense");
    }
    return response.json();
}