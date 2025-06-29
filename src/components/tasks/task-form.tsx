import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CreateTaskData, TaskStatus } from '@/types/task-types'

interface TaskFormProps {
    onSubmit: (data: CreateTaskData) => void
    onCancel?: () => void
    isLoading?: boolean
    initialData?: Partial<CreateTaskData>
}

const taskStatuses: { value: TaskStatus; label: string }[] = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' },
]

export function TaskForm({ onSubmit, onCancel, isLoading, initialData }: TaskFormProps) {
    const [formData, setFormData] = useState<CreateTaskData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        dueDate: initialData?.dueDate || undefined,
        status: initialData?.status || 'To Do',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
        }

        if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
            newErrors.dueDate = 'Due date cannot be in the past'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        onSubmit(formData)
    }

    const handleDateSelect = (date: Date | undefined) => {
        setFormData(prev => ({
            ...prev,
            dueDate: date?.toISOString(),
        }))
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>
                    {initialData ? 'Edit Task' : 'Create New Task'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Field */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter task title"
                            className={cn(errors.title && "border-destructive")}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title}</p>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter task description (optional)"
                            rows={3}
                        />
                    </div>

                    {/* Status Field */}
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: TaskStatus) =>
                                setFormData(prev => ({ ...prev, status: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {taskStatuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Due Date Field */}
                    <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.dueDate && "text-muted-foreground",
                                        errors.dueDate && "border-destructive"
                                    )}
                                >
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    {formData.dueDate ? (
                                        format(new Date(formData.dueDate), "PPP")
                                    ) : (
                                        "Pick a date"
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                    mode="single"
                                    selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                                    onSelect={handleDateSelect}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.dueDate && (
                            <p className="text-sm text-destructive">{errors.dueDate}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
                        </Button>
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
