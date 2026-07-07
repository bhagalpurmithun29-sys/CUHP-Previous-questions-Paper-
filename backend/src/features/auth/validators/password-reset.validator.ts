import { body, query } from 'express-validator';
import { commonValidators } from './common.validator';

export const forgotPasswordValidator = [
  commonValidators.email('email'),
];

export const resetPasswordValidator = [
  body('token')
    .trim()
    .notEmpty().withMessage('Reset token is required')
    .isString().withMessage('Invalid token format')
    .escape(),
    
  commonValidators.password('password'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];
