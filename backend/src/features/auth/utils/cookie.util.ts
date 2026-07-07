import { Response } from 'express';
import { cookieConfig } from '../config/cookie.config';

export class CookieUtil {
  /**
   * Attaches the secure HTTP-only refresh token cookie to the response
   */
  static setRefreshCookie(res: Response, token: string): void {
    res.cookie(
      cookieConfig.refreshCookieName,
      token,
      cookieConfig.getRefreshCookieOptions()
    );
  }

  /**
   * Clears the refresh token cookie (used during logout)
   */
  static clearRefreshCookie(res: Response): void {
    res.cookie(
      cookieConfig.refreshCookieName,
      '',
      cookieConfig.getLogoutCookieOptions()
    );
  }
}
