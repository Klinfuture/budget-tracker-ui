import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CreateExpenseCategory from "./components/create";
import EditExpenseCategory from "./components/edit";
import { ExpenseCategoriesTable } from "./components/table";
import { expenseCategoriesOptions } from "./components/table/query-options";
import Feature from "@/components/feature";

export default async function FeatureExpenseCategories() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(expenseCategoriesOptions);

  return (
    <Feature>
      <div className="w-full flex flex-row justify-items-start gap-4 flex-wrap md:flex-nowrap">
        <CreateExpenseCategory />
        <EditExpenseCategory />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExpenseCategoriesTable />
      </HydrationBoundary>
    </Feature>
  );
}
