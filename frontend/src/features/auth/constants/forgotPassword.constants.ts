export const FORGOT_PASSWORD_CONSTANTS = {
  MESSAGES: {
    EMAIL_REQUIRED: 'Email address is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    SUCCESS_GENERIC: 'If an account exists with this email address, a password reset link has been sent.',
    SUBMIT_BUTTON: 'Send Reset Link',
    BACK_TO_LOGIN: 'Back To Login',
    TITLE: 'Forgot Password',
    SUBTITLE: 'Enter your email address to receive password reset instructions.',
    NETWORK_ERROR: 'Network Error: Please check your connection.',
    SERVER_ERROR: 'Internal Server Error. Please contact support.',
    TIMEOUT: 'Request timed out. Please try again.',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
    OFFLINE: 'You appear to be offline. Please check your connection.',
    UNEXPECTED_ERROR: 'An unexpected error occurred.',
  },
} as const;
