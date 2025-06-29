import { CalendarDays, Edit, Trash2 } from 'lucide-react'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { Task, TaskStatus } from '@/types/task-types'
import { cn } from '@/lib/utils'

interface TaskListProps {
    tasks: Task[]
    onEdit: (task: Task) => void
    onDelete: (taskId: string) => void
    isLoading?: boolean
}

const getStatusVariant = (status: TaskStatus) => {
    switch (status) {
        case 'TO_DO':
            return 'secondary'
        case 'IN_PROGRESS':
            return 'default'
        case 'DONE':
            return 'outline'
        default:
            return 'secondary'
    }
}

const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
        case 'TO_DO':
            return 'To Do'
        case 'IN_PROGRESS':
            return 'In Progress'
        case 'DONE':
            return 'Done'
        default:
            return status
    }
}

const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)

    if (isToday(date)) {
        return 'Today'
    } else if (isTomorrow(date)) {
        return 'Tomorrow'
    } else {
        return format(date, 'MMM d, yyyy')
    }
}

const getDueDateColor = (dueDate: string) => {
    const date = new Date(dueDate)

    if (isPast(date) && !isToday(date)) {
        return 'text-destructive'
    } else if (isToday(date)) {
        return 'text-chart-4'
    } else if (isTomorrow(date)) {
        return 'text-chart-5'
    } else {
        return 'text-muted-foreground'
    }
}

export function TaskList({ tasks, onEdit, onDelete, isLoading }: TaskListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-3">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="h-3 bg-muted rounded w-full"></div>
                                <div className="h-3 bg-muted rounded w-2/3"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <Card className="text-center py-8">
                <CardContent>
                    <p className="text-muted-foreground text-lg">No tasks found</p>
                    <p className="text-muted-foreground/70 text-sm mt-2">
                        Create your first task to get started!
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className={cn(
                        "transition-all duration-200 hover:shadow-md",
                        task.status === 'DONE' && "opacity-75"
                    )}
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className={cn(
                                    "font-semibold text-lg",
                                    task.status === 'DONE' && "line-through text-muted-foreground"
                                )}>
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {task.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onEdit(task)}
                                    className="h-8 w-8 p-0"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit task</span>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete task</span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete "{task.title}"? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => onDelete(task.id)}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Badge
                                variant={getStatusVariant(task.status)}
                            >
                                {getStatusLabel(task.status)}
                            </Badge>
                            {task.dueDate && (
                                <div className={cn(
                                    "flex items-center gap-1 text-sm",
                                    getDueDateColor(task.dueDate)
                                )}>
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{formatDueDate(task.dueDate)}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
