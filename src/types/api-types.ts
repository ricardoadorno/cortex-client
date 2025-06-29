export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface ErrorResponse {
  error: ApiError
  statusCode: number
  timestamp: string
}

// Standard HTTP error response structure
export interface HttpErrorResponse {
  message: string | string[]
  error?: string
  statusCode: number
}

// Custom error class for API errors
export class ApiException extends Error {
  public readonly statusCode: number
  public readonly response?: HttpErrorResponse
  public readonly isNetworkError: boolean

  constructor(
    message: string,
    statusCode: number,
    response?: HttpErrorResponse,
    isNetworkError = false
  ) {
    super(message)
    this.name = 'ApiException'
    this.statusCode = statusCode
    this.response = response
    this.isNetworkError = isNetworkError
  }
}

// Error types for different scenarios
export type ErrorType = 
  | 'VALIDATION_ERROR'    // 400 - Invalid input data
  | 'NOT_FOUND'          // 404 - Resource not found
  | 'NETWORK_ERROR'      // Network/connection issues
  | 'SERVER_ERROR'       // 500+ server errors
  | 'TIMEOUT_ERROR'      // Request timeout
  | 'UNKNOWN_ERROR'      // Fallback for unexpected errors
