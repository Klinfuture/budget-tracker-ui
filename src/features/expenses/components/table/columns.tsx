"use client";

import {
  getCommonColumns
} from "@/features/expenses-categories/components/columns/actions";
import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../../interface";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  ...getCommonColumns<Expense>(),
];
