"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExpenseCategory } from "../../interface";

export const columns: ColumnDef<ExpenseCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created",
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
  }
];
