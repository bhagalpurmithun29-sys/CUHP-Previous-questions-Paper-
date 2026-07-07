import { body, query } from 'express-validator';
import { commonValidators } from './common.validator';

export const verifyEmailValidator = [
  query('token')
    .trim()
    .notEmpty().withMessage('Verification token is required')
    .isString().withMessage('Invalid token format')
    .escape(),
];

export const resendVerificationValidator = [
  commonValidators.email('email'),
];
