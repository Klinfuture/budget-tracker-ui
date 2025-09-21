"use client";

import { DataTable } from "@/components/data-table";
import { ID } from "@/interface/entity";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { deleteRevenueSource } from "../../api";
import { RevenueSource } from "../../interface";
import { columns } from "../columns";
import { revenueSourceOptions } from "./query-options";
import { getCommonColumnActions } from "@/features/expenses-categories/components/columns/actions";

export function RevenueSourcesTable() {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useSuspenseQuery(
    revenueSourceOptions
  );
  const tableData = data.data ?? [];

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
    return <div>Error loading Revenue sources {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-lg">
      {mutation.isPending && <div>Deleting revenue source...</div>}
      <DataTable
        columns={columnData}
        data={tableData}
        isLoading={isFetching || mutation.isPending}
      />
    </div>
  );
}
