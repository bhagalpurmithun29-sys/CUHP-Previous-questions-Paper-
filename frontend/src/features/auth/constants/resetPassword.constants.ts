export const RESET_PASSWORD_CONSTANTS = {
  MESSAGES: {
    PASSWORD_REQUIRED: 'Password is required.',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your new password.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    SUBMIT_BUTTON: 'Reset Password',
    BACK_TO_LOGIN: 'Back To Login',
    TITLE: 'Reset Your Password',
    SUBTITLE: 'Please enter your new password below.',
    SUCCESS_TITLE: 'Password Changed Successfully',
    SUCCESS_MESSAGE: 'Your password has been successfully updated. You can now login with your new credentials.',
    MISSING_TOKEN: 'Invalid or missing reset token. Please request a new password reset link.',
    NETWORK_ERROR: 'Network Error: Please check your connection.',
    SERVER_ERROR: 'Internal Server Error. Please contact support.',
    TIMEOUT: 'Request timed out. Please try again.',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
    OFFLINE: 'You appear to be offline. Please check your connection.',
    UNEXPECTED_ERROR: 'An unexpected error occurred.',
  },
  VALIDATION: {
    MIN_LENGTH: 12,
    MAX_LENGTH: 128,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,128}$/,
    REGEX_MESSAGE: 'Password must be at least 12 characters, include uppercase, lowercase, number, and special character.',
  }
} as const;
