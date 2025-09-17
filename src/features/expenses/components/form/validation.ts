import * as z from "zod";

export const createExpenseFormValidationSchema = z.object({
    amount: z.coerce
        .number()
        .positive("Amount must be greater than zero"),
    description: z.string().optional(),
    category_id: z.coerce.number(),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseFormValidationSchema>;
