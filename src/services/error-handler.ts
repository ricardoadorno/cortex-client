import { toast } from 'sonner'
import { ApiException, type ErrorType } from '@/types/api-types'

// Notification functions using sonner
const showErrorNotification = (title: string, description: string) => {
  toast.error(title, { description })
  
  // Log error for debugging (only in development)
  if (import.meta.env.DEV) {
    console.error(`${title}: ${description}`)
  }
}

const showSuccessNotification = (title: string, description?: string) => {
  toast.success(title, { description })
}

const showInfoNotification = (title: string, description?: string) => {
  toast.info(title, { description })
}

const showWarningNotification = (title: string, description?: string) => {
  toast.warning(title, { description })
}

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler
  
  private constructor() {}

  public static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler()
    }
    return GlobalErrorHandler.instance
  }

  /**
   * Handles API errors and shows appropriate user notifications
   */
  public handleApiError(error: ApiException): void {
    const errorType = this.determineErrorType(error)
    const userMessage = this.getUserFriendlyMessage(error, errorType)

    // Log error for debugging (only in development)
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        message: error.message,
        statusCode: error.statusCode,
        response: error.response,
        type: errorType,
      })
    }

    // Show user notification
    this.showErrorNotification(userMessage, errorType)
  }

  /**
   * Determines the error type based on status code and error details
   */
  private determineErrorType(error: ApiException): ErrorType {
    if (error.isNetworkError) {
      return 'NETWORK_ERROR'
    }

    switch (error.statusCode) {
      case 400:
        return 'VALIDATION_ERROR'
      case 404:
        return 'NOT_FOUND'
      case 408:
      case 504:
        return 'TIMEOUT_ERROR'
      case 500:
      case 502:
      case 503:
        return 'SERVER_ERROR'
      default:
        return 'UNKNOWN_ERROR'
    }
  }

  /**
   * Converts technical error messages to user-friendly messages
   */
  private getUserFriendlyMessage(error: ApiException, errorType: ErrorType): string {
    switch (errorType) {
      case 'VALIDATION_ERROR':
        // Try to extract specific validation messages
        if (error.response?.message) {
          const messages = Array.isArray(error.response.message) 
            ? error.response.message 
            : [error.response.message]
          return messages.join(', ')
        }
        return 'Please check your input and try again.'

      case 'NOT_FOUND':
        return 'The requested item could not be found.'

      case 'NETWORK_ERROR':
        return 'Unable to connect to the server. Please check your internet connection.'

      case 'TIMEOUT_ERROR':
        return 'The request took too long to complete. Please try again.'

      case 'SERVER_ERROR':
        return 'Something went wrong on our end. Please try again later.'

      case 'UNKNOWN_ERROR':
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  /**
   * Shows error notification to the user
   */
  private showErrorNotification(message: string, errorType: ErrorType): void {
    const title = this.getErrorTitle(errorType)

    // Use our error notification function
    showErrorNotification(title, message)
  }

  /**
   * Gets appropriate title for error type
   */
  private getErrorTitle(errorType: ErrorType): string {
    switch (errorType) {
      case 'VALIDATION_ERROR':
        return 'Invalid Input'
      case 'NOT_FOUND':
        return 'Not Found'
      case 'NETWORK_ERROR':
        return 'Connection Error'
      case 'TIMEOUT_ERROR':
        return 'Request Timeout'
      case 'SERVER_ERROR':
        return 'Server Error'
      case 'UNKNOWN_ERROR':
      default:
        return 'Error'
    }
  }

  /**
   * Creates a standardized error for specific scenarios
   */
  public createTaskNotFoundError(): ApiException {
    return new ApiException(
      'Task not found',
      404,
      { message: 'Task not found', statusCode: 404 }
    )
  }

  public createValidationError(message: string): ApiException {
    return new ApiException(
      'Validation failed',
      400,
      { message, statusCode: 400 }
    )
  }
}

// Export singleton instance
export const globalErrorHandler = GlobalErrorHandler.getInstance()

// Export notification functions for use throughout the app
export const notifications = {
  success: showSuccessNotification,
  error: showErrorNotification,
  info: showInfoNotification,
  warning: showWarningNotification,
}
