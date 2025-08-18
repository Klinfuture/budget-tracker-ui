"use client";

import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../columns";
import { expenseOptions } from "./expenses";

export function ExpenseDataTable() {
  const { data } = useSuspenseQuery(expenseOptions);

  return (
    <div className="bg-white shadow-md rounded-lg">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
