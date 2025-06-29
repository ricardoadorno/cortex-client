import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, ListTodo } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModeToggle } from './mode-toggle'

export function Navigation() {
    const location = useLocation()

    const navItems = [
        {
            name: 'Home',
            href: '/',
            icon: Home,
        },
        {
            name: 'Tasks',
            href: '/tasks',
            icon: ListTodo,
        },
    ]

    return (
        <nav className="bg-background border-b border-border px-4 py-3">
            <div className="container mx-auto flex items-center justify-between max-w-4xl">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <CheckSquare className="h-6 w-6 text-primary" />
                    Cortex
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}
