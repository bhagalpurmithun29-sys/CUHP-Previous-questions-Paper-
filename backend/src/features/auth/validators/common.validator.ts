import { body, param, query, ValidationChain } from 'express-validator';
import { PasswordService } from '../services/password.service';

export const commonValidators = {
  email: (field = 'email'): ValidationChain =>
    body(field)
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail()
      .escape(),

  password: (field = 'password'): ValidationChain =>
    body(field)
      .notEmpty().withMessage('Password is required')
      .custom((value, { req }) => {
        const email = req.body.email;
        const result = PasswordService.validatePasswordStrength(value, email);
        if (!result.isValid) {
          throw new Error(result.errors.join(', '));
        }
        return true;
      }),

  name: (field: string, label: string): ValidationChain =>
    body(field)
      .trim()
      .notEmpty().withMessage(`${label} is required`)
      .isLength({ min: 2, max: 50 }).withMessage(`${label} must be between 2 and 50 characters`)
      .matches(/^[a-zA-Z\\s]+$/).withMessage(`${label} can only contain letters and spaces`)
      .escape(),

  mongoId: (field: string, location: 'body' | 'param' | 'query' = 'body'): ValidationChain => {
    let check;
    if (location === 'param') check = param(field);
    else if (location === 'query') check = query(field);
    else check = body(field);

    return check
      .notEmpty().withMessage(`${field} is required`)
      .isMongoId().withMessage(`Invalid ${field} format`);
  },

  semester: (field = 'semester'): ValidationChain =>
    body(field)
      .optional()
      .isInt({ min: 1, max: 10 }).withMessage('Semester must be a number between 1 and 10')
      .toInt(),

  role: (field = 'role'): ValidationChain =>
    body(field)
      .optional()
      .isIn(['STUDENT', 'MODERATOR', 'ADMIN']).withMessage('Invalid role provided')
      .trim()
      .escape(),
};
