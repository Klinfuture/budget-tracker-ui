"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExpenseCategory } from "../../interface";
import { getCommonColumns } from "./actions";

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description") || "n/a",
  },
  ...getCommonColumns<ExpenseCategory>(),
];
