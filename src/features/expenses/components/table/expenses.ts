import { getExpenses } from "@/features/expenses/api";
import { queryOptions } from "@tanstack/react-query";

export const expenseOptions = queryOptions({
    queryKey: ["expenses"],
    queryFn: getExpenses,
});