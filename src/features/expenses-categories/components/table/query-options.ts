import { getExpenses } from "@/lib/api/expense";
import { queryOptions } from "@tanstack/react-query";

export const expenseCategoriesOptions = queryOptions({
    queryKey: ["expense-categories"],
    queryFn: getExpenses,
});