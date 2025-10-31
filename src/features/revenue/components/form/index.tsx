"use client";

import LoadingForm from "@/components/loaders";
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

import { ID } from "@/interface/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  createRevenueSource,
  getRevenueSourceById,
  updateRevenueSource,
} from "../../data";
import { revenueSourceOptions } from "../table/query-options";
import {
  createRevenueSourceFormValidationSchema,
  CreateRevenueSourceFormValues,
} from "./validation";
import { dashboardQueryOptions } from "@/features/dashboard";

interface RevenueSourceFormProps {
  id?: ID;
}

export default function RevenueSourceForm({ id }: RevenueSourceFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["revenue-source", id],
    queryFn: async () => await getRevenueSourceById(id!),
    enabled: !!id,
  });

  const form = useForm<CreateRevenueSourceFormValues>({
    values: {
      source: data?.data.source || "",
      description: data?.data.description || "",
      amount: data?.data.amount || 0,
    },
    resolver: zodResolver(createRevenueSourceFormValidationSchema),
    disabled: isLoading,
  });

  const [formSubmissionError, setFormSubmissionError] = React.useState<
    string | null
  >(null);

  const mutation = useMutation({
    mutationKey: id ? ["update-revenue-source", id] : ["create-revenue-source"],
    mutationFn: async (formData: CreateRevenueSourceFormValues) => {
      if (id) {
        return await updateRevenueSource(id, formData);
      } else {
        return await createRevenueSource(formData);
      }
    },
    onSuccess: () => {
      console.log("Revenue source saved successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: revenueSourceOptions.queryKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueryOptions.queryKey });
      router.back();
    },
    onError: (error) => {
      console.error("Error saving expense:", error);
      setFormSubmissionError(
        error.message || "An unexpected error occurred. Please try again."
      );
    },
  });

  const onSubmit = (data: CreateRevenueSourceFormValues) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formSubmissionError && (
          <div className="text-red-600">{formSubmissionError}</div>
        )}
        <FormField
          name="source"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Enter revenue source." {...field} />
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
                  min={0}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
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
