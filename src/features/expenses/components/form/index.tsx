"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { expenseCategoriesOptions } from "@/features/expenses-categories/components/table/query-options";
import {
  createExpense,
  getExpenseById,
  updateExpense,
} from "@/features/expenses/api";
import { ID } from "@/interface/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  createExpenseFormValidationSchema,
  CreateExpenseFormValues,
} from "./validation";

interface ExpenseFormProps {
  expenseId?: ID;
}

export default function ExpenseForm({ expenseId }: ExpenseFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: categoriesResponse, isLoading: isLoadingCategories } =
    useSuspenseQuery(expenseCategoriesOptions);

  const categories = useMemo(
    () => categoriesResponse.data ?? [],
    [categoriesResponse]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["expense", expenseId],
    queryFn: async () => await getExpenseById(expenseId!),
    enabled: !!expenseId,
  });

  const form = useForm<CreateExpenseFormValues>({
    values: {
      description: data?.data.description || "",
      amount: data?.data.amount || 0,
      category_id: data?.data.category_id || 0,
    },
    resolver: zodResolver(createExpenseFormValidationSchema),
    disabled: isLoading,
    defaultValues: {
      description: "",
      amount: 0,
      category_id: 1,
    },
  });

  const [formSubmissionError, setFormSubmissionError] = React.useState<
    string | null
  >(null);

  const mutation = useMutation({
    mutationKey: expenseId ? ["update-expense", expenseId] : ["create-expense"],
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
      router.back();
    },
    onError: (error) => {
      console.error("Error saving expense:", error);
      setFormSubmissionError(
        error.message || "An unexpected error occurred. Please try again."
      );
    },
  });

  const onSubmit = (data: CreateExpenseFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formSubmissionError && (
          <div className="text-red-600">{formSubmissionError}</div>
        )}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingCategories ? "loading.." : "Select category"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage categories{" "}
                <Link href="/expense-categories">here</Link>.
              </FormDescription>
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
                  value={field.value || ""}
                  placeholder="Enter amount"
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
