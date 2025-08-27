import * as z from "zod";

export const createExpenseFormValidationSchema = z.object({
    amount: z.number(),
    description: z.string().optional(),
    category_id: z.string(),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseFormValidationSchema>;