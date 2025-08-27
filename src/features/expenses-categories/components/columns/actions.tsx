import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

interface GetColumneActionsArgs {
  actionHref: {
    edit: string;
    delete: string;
  };
  actionFunc?: {
    delete?: () => void;
    edit?: () => void;
  };
}

export const getCommonColumnActions = <T,>(
  args: GetColumneActionsArgs
): ColumnDef<T>[] => {
  return [
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const id = row.getValue("id");
        return (
          <>
            <Link
              href={`${args.actionHref.edit}/${id}`}
              onClick={args.actionFunc?.edit}
              passHref
              aria-disabled={!id}
            >
              <Button variant={"ghost"}>
                <Edit3Icon />
              </Button>
            </Link>

            <Link
              href={`${args.actionHref.delete}/${id}`}
              onClick={args.actionFunc?.delete}
              aria-disabled={!id}
              passHref
            >
              <Button variant={"ghost"} className="text-destructive">
                <Trash2Icon />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
};

export const getCommonColumns = <T,>(): ColumnDef<T>[] => [
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
];
