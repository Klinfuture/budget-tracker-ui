import { ID } from "@/interface/entity";
import * as z from "zod";

export const createExpenseFormValidationSchema = z.object({
    amount:z.number()
        .positive("Amount must be greater than zero"),
    description: z.string().optional(),
    category_id: z.custom<ID>(),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseFormValidationSchema>;
