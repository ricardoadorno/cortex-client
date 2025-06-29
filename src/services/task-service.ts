import { api } from './api'
import type { Task, CreateTaskData, TaskFilters } from '@/types/task-types'

export const taskService = {
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const response = await api.get('/tasks', { params: filters })
    return response.data
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await api.post('/tasks', data)
    return response.data
  },

  async updateTask(id: string, data: Partial<CreateTaskData>): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, data)
    return response.data
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`)
  },
}