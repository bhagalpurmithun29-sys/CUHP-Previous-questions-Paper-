export const jwtConfig = {
  accessSecret: process.env.JWT_SECRET || 'fallback_access_secret_key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES || '30d',
  issuer: process.env.JWT_ISSUER || 'cuhp_question_bank',
  audience: process.env.JWT_AUDIENCE || 'cuhp_students',
  algorithm: 'HS256' as const,
};
