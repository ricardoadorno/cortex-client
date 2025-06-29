import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { createContext, useContext, useEffect, useState } from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
    id: string
    title: string
    description: string
    type: NotificationType
    duration?: number
}

interface NotificationContextType {
    notifications: Notification[]
    showNotification: (title: string, description: string, type?: NotificationType, duration?: number) => void
    removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}

interface NotificationProviderProps {
    children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const showNotification = (
        title: string,
        description: string,
        type: NotificationType = 'info',
        duration = 4000
    ) => {
        const id = Date.now().toString()
        const notification: Notification = { id, title, description, type, duration }

        setNotifications(prev => [...prev, notification])

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, duration)
        }
    }

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    return (
        <NotificationContext.Provider
            value={{ notifications, showNotification, removeNotification }}
        >
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    )
}

function NotificationContainer() {
    const { notifications, removeNotification } = useNotifications()

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(notification => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    )
}

interface NotificationCardProps {
    notification: Notification
    onClose: () => void
}

function NotificationCard({ notification, onClose }: NotificationCardProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger animation
        const timer = setTimeout(() => setIsVisible(true), 10)
        return () => clearTimeout(timer)
    }, [])

    const iconMap = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
    }

    const colorMap = {
        success: 'text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800',
        error: 'text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800',
        info: 'text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800',
    }

    const Icon = iconMap[notification.type]

    return (
        <div
            className={cn(
                'flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 transform',
                'bg-background text-foreground border-border max-w-sm',
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            )}
        >
            <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', colorMap[notification.type].split(' ')[0])} />

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">
                    {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                </p>
            </div>

            <button
                onClick={onClose}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

// Global notification function to be used by the error handler
let globalNotificationFunction: ((title: string, description: string, type?: NotificationType) => void) | null = null

export function setGlobalNotificationFunction(
    fn: (title: string, description: string, type?: NotificationType) => void
) {
    globalNotificationFunction = fn
}

export function showGlobalNotification(
    title: string,
    description: string,
    type: NotificationType = 'error'
) {
    if (globalNotificationFunction) {
        globalNotificationFunction(title, description, type)
    } else {
        // Fallback to console if notifications aren't set up
        console.error(`${title}: ${description}`)
    }
}
