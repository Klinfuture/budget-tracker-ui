import Feature from "@/components/feature";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { ExpenseCategoriesTable } from "./components/table";
import { expenseCategoriesOptions } from "./components/table/query-options";

export default async function FeatureExpenseCategories() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expenseCategoriesOptions);

  return (
    <Feature>
      <div className="w-full flex flex-row justify-items-start gap-4 flex-wrap md:flex-nowrap">
        <Link href={"/expense-categories/create"} passHref>
          <Button>Create</Button>
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExpenseCategoriesTable />
      </HydrationBoundary>
    </Feature>
  );
}
