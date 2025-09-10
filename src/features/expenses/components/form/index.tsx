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
import { Textarea } from "@/components/ui/textarea";
import { expenseCategoriesOptions } from "@/features/expenses-categories/components/table/query-options";
import {
  createExpense,
  getExpenseById,
  updateExpense,
} from "@/features/expenses/api/expense";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  createExpenseFormValidationSchema,
  CreateExpenseFormValues,
} from "./validation";
import { ID } from "@/interface/entity";

interface ExpenseFormProps {
  expenseId?: ID;
}

export default function ExpenseForm({ expenseId }: ExpenseFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: categoriesResponse, isLoading: isLoadingCategories } =
    useSuspenseQuery(expenseCategoriesOptions);

  const categories = categoriesResponse.data ?? [];

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
    mutation.mutate(data);
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
     
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <SelectItem value={category.id} key={category.id}>
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
