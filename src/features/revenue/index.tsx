import Feature from "@/components/feature";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { RevenueSourcesTable } from "./components/table";
import { revenueSourceOptions } from "./components/table/query-options";

export default async function FeatureRevenueSources() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(revenueSourceOptions);

  return (
    <Feature>
      <div className="w-full flex flex-row justify-end gap-4">
        <Link href={"/expense-categories/create"} passHref>
          <Button>
            <PlusIcon />
            Create
          </Button>
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RevenueSourcesTable />
      </HydrationBoundary>
    </Feature>
  );
}
