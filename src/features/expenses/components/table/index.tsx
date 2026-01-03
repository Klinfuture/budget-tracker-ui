"use client";

import { DataTable } from "@/components/data-table";
import { getCommonColumnActions } from "@/features/expenses-categories/components/columns/actions";
import { ID } from "@/interface/entity";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { deleteExpense } from "../../api";
import { expenseOptions } from "../../api/expenses";
import { Expense } from "../../interface";
import { columns } from "./columns";

export function ExpenseDataTable() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSuspenseQuery(expenseOptions);
  const tableData = data.data ?? [];
  const totalCount = data.total_items ?? 0;

  const mutation = useMutation({
    mutationKey: ["delete-expense"],
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: expenseOptions.queryKey,
      });
    },
  });

  const columnData = useMemo(
    () => [
      ...columns,
      ...getCommonColumnActions<Expense>({
        actionHref: {
          edit: "/expenses/edit",
        },
        actionFunc: {
          delete: (id: ID) => {
            mutation.mutate(id);
          },
        },
      }),
    ],
    [mutation]
  );

  if (error) {
    return <div>Error loading expense: {error.message}</div>;
  }

  return (
    <DataTable
      columns={columnData}
      data={tableData}
      isLoading={isLoading}
      totalCount={totalCount}
    />
  );
}
