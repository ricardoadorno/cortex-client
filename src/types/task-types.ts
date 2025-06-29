export type TaskStatus = 'To Do' | 'In Progress' | 'Done'

export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description?: string
  dueDate?: string
  status?: TaskStatus
}

export interface UpdateTaskData {
  title?: string
  description?: string
  dueDate?: string
  status?: TaskStatus
}

export interface TaskFilters {
  status?: TaskStatus
  search?: string
}
