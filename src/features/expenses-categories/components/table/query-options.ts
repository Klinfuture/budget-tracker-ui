import { getExpenseCategories } from "@/features/expenses-categories/api";
import { queryOptions } from "@tanstack/react-query";

export const expenseCategoriesOptions = queryOptions({
    queryKey: ["expense-categories"],
    queryFn: getExpenseCategories,
});

// export const expenseMuatationOptions = mutationOptions();