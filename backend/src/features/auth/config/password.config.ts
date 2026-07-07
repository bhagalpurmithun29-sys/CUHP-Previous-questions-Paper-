export const passwordConfig = {
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
  minLength: 12,
  maxLength: 128,
  rules: {
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    // Minimum 1 uppercase, 1 lowercase, 1 number, 1 special character
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$/,
    noRepeatingChars: /(.)\\1{2,}/, // Matches 3 or more identical consecutive characters
  },
  // Future implementation
  passwordExpiryDays: 90,
  historyCount: 3 // Number of previous passwords to remember and prevent reuse
};
