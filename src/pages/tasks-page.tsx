import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { TaskForm } from '@/components/tasks/task-form'
import { TaskList } from '@/components/tasks/task-list'
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/api/use-tasks'
import type { Task, CreateTaskData } from '@/types/task-types'

export default function TasksPage() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    // React Query hooks
    const { data: tasks = [], isLoading } = useTasks()
    const createTaskMutation = useCreateTask()
    const updateTaskMutation = useUpdateTask()
    const deleteTaskMutation = useDeleteTask()

    const handleCreateTask = async (data: CreateTaskData) => {
        try {
            await createTaskMutation.mutateAsync(data)
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to create task:', error)
        }
    }

    const handleUpdateTask = async (data: CreateTaskData) => {
        if (!editingTask) return

        try {
            await updateTaskMutation.mutateAsync({
                id: editingTask.id,
                data,
            })
            setEditingTask(null)
        } catch (error) {
            console.error('Failed to update task:', error)
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTaskMutation.mutateAsync(taskId)
        } catch (error) {
            console.error('Failed to delete task:', error)
        }
    }

    const handleEditTask = (task: Task) => {
        setEditingTask(task)
    }

    const handleCancelEdit = () => {
        setEditingTask(null)
    }

    const handleCancelCreate = () => {
        setIsFormOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your tasks and stay organized
                    </p>
                </div>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                        </DialogHeader>
                        <TaskForm
                            onSubmit={handleCreateTask}
                            onCancel={handleCancelCreate}
                            isLoading={createTaskMutation.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Task List */}
            <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                isLoading={isLoading}
            />

            {/* Edit Task Dialog */}
            <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    {editingTask && (
                        <TaskForm
                            onSubmit={handleUpdateTask}
                            onCancel={handleCancelEdit}
                            isLoading={updateTaskMutation.isPending}
                            initialData={{
                                title: editingTask.title,
                                description: editingTask.description,
                                dueDate: editingTask.dueDate,
                                status: editingTask.status,
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
