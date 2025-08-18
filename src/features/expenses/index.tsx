import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CreateExpense from "./components/create";
import EditExpense from "./components/edit";
import { ExpenseDataTable } from "./components/table";
import { expenseOptions } from "./components/table/expenses";
import Feature from "@/components/feature";

export default async function FeatureExpenses() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expenseOptions);
  return (
    <Feature>
      <div className="w-full flex flex-row justify-items-start gap-4 flex-wrap md:flex-nowrap">
        <CreateExpense />
        <EditExpense />
      </div>
      <div className="w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ExpenseDataTable />
        </HydrationBoundary>
      </div>
    </Feature>
  );
}
