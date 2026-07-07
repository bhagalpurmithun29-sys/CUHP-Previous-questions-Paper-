export const FORGOT_PASSWORD_CONSTANTS = {
  MESSAGES: {
    EMAIL_REQUIRED: 'Email address is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    SUCCESS_GENERIC: 'If an account exists, a password reset email has been sent.',
    SUBMIT_BUTTON: 'Send Reset Link',
    BACK_TO_LOGIN: 'Back to Login',
    TITLE: 'Forgot Password',
    SUBTITLE: 'Enter your email address to receive password reset instructions.',
    NETWORK_ERROR: 'Network Error: Please check your connection.',
    SERVER_ERROR: 'Internal Server Error. Please contact support.',
    UNEXPECTED_ERROR: 'An unexpected error occurred.',
  },
} as const;
