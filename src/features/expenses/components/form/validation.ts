import z from "zod";

export const createExpenseFormValidationSchema = z.object({
    name: z.string().min(1, "Expense name is required"),
    amount: z
        .number()
        .min(0.01, "Amount must be greater than 0")
        .max(1000000, "Amount must be less than 1,000,000"),
    category: z.number().min(1, "Category is required"),
    description: z.string().optional(),
});