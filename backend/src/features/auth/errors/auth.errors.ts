import { BadRequestError } from '../../../utils/ApiError';

export class WeakPasswordError extends BadRequestError {
  constructor(message = 'Password does not meet security requirements', errors?: any[]) {
    super(message, errors);
  }
}

export class PasswordMismatchError extends BadRequestError {
  constructor(message = 'Passwords do not match') {
    super(message);
  }
}

export class InvalidEmailError extends BadRequestError {
  constructor(message = 'Invalid email format') {
    super(message);
  }
}

export class ValidationError extends BadRequestError {
  constructor(message = 'Validation failed', errors?: any[]) {
    super(message, errors);
  }
}
