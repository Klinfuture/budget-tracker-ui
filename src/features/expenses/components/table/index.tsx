import { getQueryClient } from "@/lib/query-client";
import { expenseOptions } from "./expenses";
import { ExpenseDataTable } from "./expense-table";

export default async function ExpensesDataTable() {
  const queryClient = await getQueryClient();
  void queryClient.prefetchQuery(expenseOptions);
  return (
    <div className="w-full">
      <ExpenseDataTable />
    </div>
  );
}
