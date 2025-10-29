import { queryOptions } from "@tanstack/react-query";
import { getRevenueSources } from "../../data";

export const revenueSourceOptions = queryOptions({
    queryKey: ["revenue-sources"],
    queryFn: getRevenueSources,
});

// export const expenseMuatationOptions = mutationOptions();