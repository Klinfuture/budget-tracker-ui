import Feature from "@/components/feature";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { ExpenseDataTable } from "./components/table";
import { expenseOptions } from "./components/table/expenses";

export default async function FeatureExpenses() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expenseOptions);
  return (
    <Feature>
      <div className="w-full flex flex-row justify-items-start gap-4 flex-wrap md:flex-nowrap">
        <Link href={"/expenses/create"} passHref>
          <Button>Create</Button>
        </Link>
      </div>
      <div className="w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ExpenseDataTable />
        </HydrationBoundary>
      </div>
    </Feature>
  );
}
