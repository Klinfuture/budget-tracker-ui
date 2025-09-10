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
  getExpenseCategoryById,
  updateExpenseCategory,
} from "@/features/expenses-categories/api/expense-categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  createExpenseCategoryFormValidationSchema,
  CreateExpenseCategoryFormValues,
} from "./validation";
import { ID } from "@/interface/entity";
import LoadingForm from "@/components/loaders";

interface ExpenseCategoryFormProps {
  id?: ID;
}

export default function ExpenseCategoryForm({ id }: ExpenseCategoryFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["expense-category", id],
    queryFn: async () => await getExpenseCategoryById(id!),
    enabled: !!id,
  });

  const form = useForm<CreateExpenseCategoryFormValues>({
    values: {
      name: data?.data.name || "",
      description: data?.data.description || "",
    },
    resolver: zodResolver(createExpenseCategoryFormValidationSchema),
    disabled: isLoading,
  });

  const mutation = useMutation({
    mutationFn: async (formData: CreateExpenseCategoryFormValues) => {
      if (id) {
        return await updateExpenseCategory(id, formData);
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

  if (isLoading) {
    return <LoadingForm />;
  }

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
                <Input placeholder="Enter category name" {...field} />
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
                  placeholder="Enter category description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {mutation.isPending ? "Loading..." : id ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
