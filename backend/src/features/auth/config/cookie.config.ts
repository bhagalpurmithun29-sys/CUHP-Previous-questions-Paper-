import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const cookieConfig = {
  refreshCookieName: 'cuhp_rf_token',
  sessionCookieName: 'cuhp_session',
  cookieSecret: process.env.COOKIE_SECRET || 'fallback_cookie_secret',
  
  getRefreshCookieOptions: (): CookieOptions => ({
    httpOnly: true, // Prevents client-side JS from accessing the cookie (XSS protection)
    secure: isProduction, // Ensures cookie is sent over HTTPS in production
    sameSite: isProduction ? 'strict' : 'lax', // CSRF protection
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
    path: '/api/v1/auth/refresh', // Restrict cookie to the refresh endpoint only
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }),

  getLogoutCookieOptions: (): CookieOptions => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/api/v1/auth/refresh',
    maxAge: 0, // Instantly expires the cookie
  })
};
