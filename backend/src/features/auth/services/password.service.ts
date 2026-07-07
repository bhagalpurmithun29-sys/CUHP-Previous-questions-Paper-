import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { passwordConfig } from '../config/password.config';
import { WeakPasswordError } from '../errors/auth.errors';

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export class PasswordService {
  /**
   * Hashes a plain text password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(passwordConfig.saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain text password against a stored bcrypt hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generates a secure, random temporary password that satisfies the policy
   */
  static generateTemporaryPassword(): string {
    const length = passwordConfig.minLength;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
    let password = '';
    
    // Ensure we meet all requirements by forcibly inserting at least one of each
    password += 'A'; // Uppercase
    password += 'a'; // Lowercase
    password += '1'; // Number
    password += '@'; // Special

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }
    
    // Shuffle the string
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  /**
   * Validates a password against the strict security policy
   */
  static validatePasswordStrength(password: string, email?: string): PasswordValidationResult {
    const errors: string[] = [];

    if (password.length < passwordConfig.minLength) {
      errors.push(`Password must be at least ${passwordConfig.minLength} characters long`);
    }

    if (password.length > passwordConfig.maxLength) {
      errors.push(`Password cannot exceed ${passwordConfig.maxLength} characters`);
    }

    if (passwordConfig.rules.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (passwordConfig.rules.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (passwordConfig.rules.requireNumber && !/\\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (passwordConfig.rules.requireSpecialChar && !/[@$!%*?&]/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }

    if (passwordConfig.rules.noRepeatingChars.test(password)) {
      errors.push('Password cannot contain 3 or more repeating identical characters');
    }

    // Check if password contains the user's email prefix
    if (email) {
      const emailPrefix = email.split('@')[0].toLowerCase();
      if (emailPrefix.length > 3 && password.toLowerCase().includes(emailPrefix)) {
        errors.push('Password cannot contain your email prefix');
      }
    }

    // Common passwords list (placeholder for a real dictionary check)
    const commonPasswords = ['password123', 'admin123', 'qwerty123456'];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('This password is too common and easily guessed');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Checks if the password exists in the user's password history (Future implementation)
   */
  static async checkPasswordReuse(newPassword: string, previousHashes: string[]): Promise<boolean> {
    for (const oldHash of previousHashes) {
      const isMatch = await this.comparePassword(newPassword, oldHash);
      if (isMatch) return true; // Reuse detected
    }
    return false;
  }
}
