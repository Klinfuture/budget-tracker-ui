"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExpenseCategory } from "../../interface";
import { getCommonColumnActions, getCommonColumns } from "./actions";

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
  ...getCommonColumnActions<ExpenseCategory>({
    actionHref: {
      delete: "/expense-categories/delete",
      edit: "/expense-categories/edit",
    },
  }),
];
