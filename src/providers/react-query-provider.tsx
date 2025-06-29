import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { ApiException } from '@/types/api-types'

interface ReactQueryProviderProps {
    children: ReactNode
}

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: (failureCount, error) => {
                // Don't retry on certain errors
                if (error instanceof ApiException) {
                    // Don't retry on client errors (4xx) or network errors
                    if (error.statusCode >= 400 && error.statusCode < 500) {
                        return false
                    }
                    if (error.isNetworkError) {
                        return failureCount < 2 // Only retry network errors twice
                    }
                }
                // Default retry behavior for other errors
                return failureCount < 1
            },
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: (failureCount, error) => {
                // Don't retry mutations on client errors
                if (error instanceof ApiException && error.statusCode >= 400 && error.statusCode < 500) {
                    return false
                }
                return failureCount < 1
            },
        },
    },
})

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
