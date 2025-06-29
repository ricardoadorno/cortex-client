import { type ReactNode } from 'react'
import { ReactQueryProvider } from './react-query-provider'
import { ThemeProvider } from './dark-mode'
import { Toaster } from '@/components/ui/sonner'

interface AppProvidersProps {
    children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ReactQueryProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {children}
                <Toaster />
            </ThemeProvider>
        </ReactQueryProvider>
    )
}
