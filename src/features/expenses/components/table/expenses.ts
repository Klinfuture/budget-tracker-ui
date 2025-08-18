import { queryOptions } from "@tanstack/react-query";

export const expenseOptions = queryOptions({
    queryKey: ["expenses"],
    queryFn: async () => {
        return [
            {
                id: 1,
                description: "Groceries",
                amount: 50.0,
                date: "2023-10-01",
                categoryId: 1,
            },
            {
                id: 2,
                description: "Utilities",
                amount: 100.0,
                date: "2023-10-02",
                categoryId: 2,
            },
            {
                id: 3,
                description: "Rent",
                amount: 1200.0,
                date: "2023-10-03",
                categoryId: 3,
            }
        ]
    },
})