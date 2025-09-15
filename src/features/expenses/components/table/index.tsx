"use client";

import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../columns";
import { expenseOptions } from "./expenses";

export function ExpenseDataTable() {
  const { data, error, isFetching } = useSuspenseQuery(expenseOptions);
  const tableData = data.data ?? [];

  if (error) {
    return <div>Error loading expense: {error.message}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      <DataTable columns={columns} data={tableData} isLoading={isFetching} />
    </div>
  );
}
