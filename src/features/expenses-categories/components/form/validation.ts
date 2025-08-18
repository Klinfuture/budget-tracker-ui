import * as z from "zod";

export const createExpenseCategoryFormValidationSchema = z.object({
    name: z.string().min(1, "Expense name is required"),
    description: z.string().optional(),
});

export type CreateExpenseCategoryFormValues = z.infer<typeof createExpenseCategoryFormValidationSchema>;