import { queryOptions } from "@tanstack/react-query";
import { getRevenueSources } from "../../api";

export const revenueSourceOptions = queryOptions({
    queryKey: ["revenue-sources"],
    queryFn: getRevenueSources,
});

// export const expenseMuatationOptions = mutationOptions();