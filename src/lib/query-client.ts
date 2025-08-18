import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query'


function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
                retry: (failureCount, error: any) => {
                    if (error?.status === 404) return false
                    return failureCount < 3
                },
            },
            dehydrate: {
                // include pending queries in dehydration
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
            mutations: {
                retry: 1,
            },
        },
    })
}


let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
    if (isServer) {
        return createQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = createQueryClient();
        return browserQueryClient
    }
}