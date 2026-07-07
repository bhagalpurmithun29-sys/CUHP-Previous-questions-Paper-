export const AuthConstants = {
  TOKEN_PREFIX: 'Bearer ',
  HEADER_AUTHORIZATION: 'Authorization',
  REFRESH_TOKEN_EXPIRES_DAYS: 30,
  ACCESS_TOKEN_EXPIRES_MINS: 15,
};

export const AuthErrors = {
  INVALID_TOKEN: 'Invalid authentication token',
  EXPIRED_TOKEN: 'Authentication token has expired',
  MALFORMED_TOKEN: 'Malformed authentication token',
  MISSING_TOKEN: 'Authentication token is missing',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  REVOKED_TOKEN: 'Token has been revoked',
  SESSION_EXPIRED: 'Session has expired',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'You do not have permission to perform this action',
  TOKEN_REUSE_DETECTED: 'Security alert: Token reuse detected'
};
