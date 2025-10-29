import * as z from "zod";

export const createRevenueSourceFormValidationSchema = z.object({
    amount:z.number()
        .positive("Amount must be greater than zero"),
    description: z.string().optional(),
    source: z.string().min(1, "Source is required"),
});

export type CreateRevenueSourceFormValues = z.infer<typeof createRevenueSourceFormValidationSchema>;