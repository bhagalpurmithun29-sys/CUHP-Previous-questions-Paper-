import { Request } from 'express';
import { AuthConstants } from '../constants/auth.constants';

export class JwtUtil {
  /**
   * Extracts the Bearer token from the authorization header
   */
  static extractTokenFromHeader(req: Request): string | null {
    const authHeader = req.headers[AuthConstants.HEADER_AUTHORIZATION.toLowerCase()] as string || req.headers[AuthConstants.HEADER_AUTHORIZATION];
    
    if (!authHeader) {
      return null;
    }
    
    if (authHeader.startsWith(AuthConstants.TOKEN_PREFIX)) {
      return authHeader.substring(AuthConstants.TOKEN_PREFIX.length);
    }
    
    return null;
  }
}
