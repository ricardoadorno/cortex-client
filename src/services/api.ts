import axios from 'axios'
import { ApiException, type HttpErrorResponse } from '@/types/api-types'
import { globalErrorHandler } from './error-handler'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Global error handling
api.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response
  },
  (error) => {
    let apiException: ApiException

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      const errorResponse: HttpErrorResponse = data || {
        message: 'An error occurred',
        statusCode: status,
      }

      apiException = new ApiException(
        Array.isArray(errorResponse.message) 
          ? errorResponse.message.join(', ')
          : errorResponse.message || 'An error occurred',
        status,
        errorResponse
      )
    } else if (error.request) {
      // Network error - no response received
      apiException = new ApiException(
        'Network error - unable to reach server',
        0,
        undefined,
        true // isNetworkError
      )
    } else {
      // Something else happened
      apiException = new ApiException(
        error.message || 'An unexpected error occurred',
        0
      )
    }

    // Handle the error globally
    globalErrorHandler.handleApiError(apiException)

    // Return rejected promise with our custom error
    return Promise.reject(apiException)
  }
)

