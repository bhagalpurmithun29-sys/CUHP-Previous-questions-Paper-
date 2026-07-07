import { body } from 'express-validator';
import { commonValidators } from './common.validator';

export const registerValidator = [
  commonValidators.name('firstName', 'First name'),
  commonValidators.name('lastName', 'Last name'),
  commonValidators.email('email'),
  commonValidators.password('password'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  commonValidators.mongoId('department').optional(),
  commonValidators.mongoId('course').optional(),
  commonValidators.semester('semester').optional(),
];
