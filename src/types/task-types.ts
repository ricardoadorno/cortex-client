export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: number // Changed from string to number to match API
  title: string
  description: string | null // Made explicit nullable to match API
  dueDate: string | null // Made explicit nullable to match API
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

// CreateTaskDto from API spec
export interface CreateTaskData {
  title: string
  description?: string
  dueDate?: string // ISO 8601 format
  status?: TaskStatus
}

// UpdateTaskDto from API spec
export interface UpdateTaskData {
  title?: string
  description?: string
  dueDate?: string // ISO 8601 format
  status?: TaskStatus
}

export interface TaskFilters {
  status?: TaskStatus
  search?: string
}
