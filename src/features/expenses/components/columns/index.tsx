"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Expesnse } from "../../interface";

export const columns: ColumnDef<Expesnse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "categoryId",
    header: "Category ID",
  },
];
