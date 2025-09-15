"use client";

import { DataTable } from "@/components/data-table";
import { ID } from "@/interface/entity";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { deleteExpenseCategory } from "../../api/expense-categories";
import { ExpenseCategory } from "../../interface";
import { columns } from "../columns";
import { getCommonColumnActions } from "../columns/actions";
import { expenseCategoriesOptions } from "./query-options";

export function ExpenseCategoriesTable() {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useSuspenseQuery(
    expenseCategoriesOptions
  );
  const tableData = data.data ?? [];

  const mutation = useMutation({
    mutationKey: ["delete-expense-category"],
    mutationFn: deleteExpenseCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: expenseCategoriesOptions.queryKey,
      });
    },
  });

  const columnData = useMemo(
    () => [
      ...columns,
      ...getCommonColumnActions<ExpenseCategory>({
        actionHref: {
          edit: "/expense-categories/edit",
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
    return <div>Error loading expense categories: {error.message}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      {mutation.isPending && <div>Deleting expense category...</div>}
      <DataTable
        columns={columnData}
        data={tableData}
        isLoading={isFetching || mutation.isPending}
      />
    </div>
  );
}
