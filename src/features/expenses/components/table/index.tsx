"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { columns } from "../columns";
import { expenseOptions } from "./expenses";
import { DataTable } from "@/components/data-table";
import { deleteExpense } from "../../api";
import { useMemo } from "react";
import { getCommonColumnActions } from "@/features/expenses-categories/components/columns/actions";
import { Expense } from "../../interface";
import { ID } from "@/interface/entity";

export function ExpenseDataTable() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSuspenseQuery(expenseOptions);
  const tableData = data.data ?? [];

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
          edit: "/expense/edit",
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
    <div className="bg-white rounded-lg">
      <DataTable columns={columnData} data={tableData} isLoading={isLoading} />
    </div>
  );
}
