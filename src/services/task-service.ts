import { api } from './api'
import type { Task, CreateTaskData } from '@/types/task-types'

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new task management system',
    status: 'In Progress',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from team members',
    status: 'To Do',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'Done',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Use mock data for development
const USE_MOCK_DATA = import.meta.env.DEV || !import.meta.env.VITE_API_BASE_URL

let taskIdCounter = mockTasks.length + 1

export const taskService = {
  async getTasks(): Promise<Task[]> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      return [...mockTasks].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    const response = await api.get('/tasks')
    return response.data
  },

  async getTask(id: string): Promise<Task> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const task = mockTasks.find(t => t.id === id)
      if (!task) {
        throw new Error(`Task with id ${id} not found`)
      }
      return task
    }

    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400))
      const newTask: Task = {
        id: String(taskIdCounter++),
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status || 'To Do',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockTasks.push(newTask)
      return newTask
    }

    const response = await api.post('/tasks', data)
    return response.data
  },

  async updateTask(id: string, data: Partial<CreateTaskData>): Promise<Task> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400))
      const taskIndex = mockTasks.findIndex(t => t.id === id)
      if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`)
      }
      
      const updatedTask: Task = {
        ...mockTasks[taskIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      mockTasks[taskIndex] = updatedTask
      return updatedTask
    }

    const response = await api.patch(`/tasks/${id}`, data)
    return response.data
  },

  async deleteTask(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const taskIndex = mockTasks.findIndex(t => t.id === id)
      if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`)
      }
      mockTasks.splice(taskIndex, 1)
      return
    }

    await api.delete(`/tasks/${id}`)
  },
}
