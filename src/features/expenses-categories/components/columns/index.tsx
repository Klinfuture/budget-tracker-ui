"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExpenseCategory } from "../../interface";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";

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
  {
    accessorKey: "CreatedAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("CreatedAt")),
  },
  {
    accessorKey: "UpdatedAt",
    header: "Updated",
    cell: ({ row }) => formatDate(row.getValue("UpdatedAt")),
  },
  {
    header: "Action",
    cell: () => {
      return <Button variant={"secondary"}>more</Button>;
    },
  },
];
