"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RevenueSource } from "../../interface";
import { getCommonColumns } from "@/features/expenses-categories/components/columns/actions";


export const columns: ColumnDef<RevenueSource>[] = [
  {
    accessorKey: "source",
    header: "Revenue",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description") || "n/a",
  },
  ...getCommonColumns<RevenueSource>(),
];
