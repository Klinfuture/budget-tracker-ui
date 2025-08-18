import * as z from "zod";

export const createExpenseFormValidationSchema = z.object({
    name: z.string().min(1, "Expense name is required"),
    amount: z.number(),
    category: z.string().optional(),
    description: z.string().optional(),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseFormValidationSchema>;