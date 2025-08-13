"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getExpenseById } from "@/lib/api/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { createExpenseFormValidationSchema } from "./validation";

interface ExpenseFormProps {
  expenseId?: number;
}

export default function ExpenseForm({ expenseId }: ExpenseFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: async () => await getExpenseById(expenseId!),
    enabled: !!expenseId,
  });

  const form = useForm<zod.infer<typeof createExpenseFormValidationSchema>>({
    defaultValues: data,
    resolver: zodResolver(createExpenseFormValidationSchema),
    disabled: isLoading,
  });

  const onSubmit = (
    data: zod.infer<typeof createExpenseFormValidationSchema>
  ) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter expense name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*select category id*/}
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter category ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
