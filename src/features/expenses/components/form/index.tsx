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
import { Textarea } from "@/components/ui/textarea";
import {
  createExpense,
  getExpenseById,
  updateExpense,
} from "@/features/expenses/api/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createExpenseFormValidationSchema,
  CreateExpenseFormValues,
} from "./validation";

interface ExpenseFormProps {
  expenseId?: number;
}

export default function ExpenseForm({ expenseId }: ExpenseFormProps) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: async () => await getExpenseById(expenseId!),
    enabled: !!expenseId,
  });

  const form = useForm<CreateExpenseFormValues>({
    defaultValues: data,
    resolver: zodResolver(createExpenseFormValidationSchema),
    disabled: isLoading,
  });

  const mutation = useMutation({
    mutationFn: async (formData: CreateExpenseFormValues) => {
      if (expenseId) {
        return await updateExpense(expenseId, formData);
      } else {
        return await createExpense(formData);
      }
    },
    onSuccess: () => {
      console.log("Expense saved successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  const onSubmit = (data: CreateExpenseFormValues) => {
    console.log("Form submitted with data:", data);
    mutation.mutate(data);
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
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  {...field}
                  placeholder="Enter expense description"
                />
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
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: Uncomment when categories are implemented
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter category ID"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
