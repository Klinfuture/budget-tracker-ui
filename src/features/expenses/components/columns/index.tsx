"use client";

import {
  getCommonColumnActions,
  getCommonColumns,
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
  ...getCommonColumns<Expense>(),
  ...getCommonColumnActions<Expense>({
    actionHref: {
      delete: "/expenses/delete",
      edit: "/expenses/edit",
    },
  }),
];
