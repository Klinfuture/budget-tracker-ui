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
  createExpenseCategory,
  updateExpenseCategory,
} from "@/features/expenses-categories/api/expense-categories";
import { getExpenseById } from "@/features/expenses/api/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createExpenseCategoryFormValidationSchema,
  CreateExpenseCategoryFormValues,
} from "./validation";
import { useRouter } from "next/navigation";

interface ExpenseCategoryFormProps {
  expenseId?: number;
}

export default function ExpenseCategoryForm({
  expenseId,
}: ExpenseCategoryFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { data, isLoading } = useQuery({
    queryKey: ["expense-category", expenseId],
    queryFn: async () => await getExpenseById(expenseId!),
    enabled: !!expenseId,
  });

  const form = useForm<CreateExpenseCategoryFormValues>({
    defaultValues: data,
    resolver: zodResolver(createExpenseCategoryFormValidationSchema),
    disabled: isLoading,
  });

  const mutation = useMutation({
    mutationFn: async (formData: CreateExpenseCategoryFormValues) => {
      if (expenseId) {
        return await updateExpenseCategory(expenseId, formData);
      } else {
        return await createExpenseCategory(formData);
      }
    },
    onSuccess: () => {
      console.log("Expense category saved successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["expense-categories"] });
    },
  });

  const onSubmit = (data: CreateExpenseCategoryFormValues) => {
    mutation.mutate(data);
    router.back();
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
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
