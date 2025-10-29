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
import { deleteRevenueSource } from "../../data";
import { RevenueSource } from "../../interface";
import { columns } from "../columns";
import { revenueSourceOptions } from "./query-options";

export function RevenueSourcesTable() {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useSuspenseQuery(revenueSourceOptions);
  const tableData = data.data ?? [];
  const totalCount = data.total_items ?? 0;
  const mutation = useMutation({
    mutationKey: ["delete-expense-category"],
    mutationFn: deleteRevenueSource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: revenueSourceOptions.queryKey,
      });
    },
  });

  const columnData = useMemo(
    () => [
      ...columns,
      ...getCommonColumnActions<RevenueSource>({
        actionHref: {
          edit: "/revenues/edit",
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
    return <div>Error loading Revenue sources {error.message}</div>;
  }

  return (
    <>
      {mutation.isPending && <div>Deleting revenue source...</div>}
      <DataTable
        columns={columnData}
        data={tableData}
        isLoading={isFetching || mutation.isPending}
        totalCount={totalCount}
      />
    </>
  );
}
