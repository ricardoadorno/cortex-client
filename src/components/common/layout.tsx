import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from '@/components/common/navigation'

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )
}

export function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
