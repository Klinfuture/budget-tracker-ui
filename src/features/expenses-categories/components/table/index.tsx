"use client";

import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../columns";
import { expenseCategoriesOptions } from "./query-options";

export function ExpenseCategoriesTable() {
  const { data, error } = useSuspenseQuery(expenseCategoriesOptions);
  const tableData = data.data ?? [];

  if (error) {
    return <div>Error loading expense categories: {error.message}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
