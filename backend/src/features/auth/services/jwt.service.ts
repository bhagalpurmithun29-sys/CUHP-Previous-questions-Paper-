import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import { IJwtPayload, IDecodedToken, ITokenPair } from '../types/jwt.types';
import { UnauthorizedError } from '../../../utils/ApiError';
import { AuthErrors } from '../constants/auth.constants';
import { TokenUtil } from '../utils/token.util';

export class JwtService {
  /**
   * Generates an Access Token
   */
  static generateAccessToken(payload: IJwtPayload): string {
    return jwt.sign(payload as object, jwtConfig.accessSecret, {
      expiresIn: jwtConfig.accessExpiresIn as any,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      algorithm: jwtConfig.algorithm,
    });
  }

  /**
   * Generates a raw Refresh Token (not a JWT, just a secure random string)
   */
  static generateRefreshToken(): string {
    return TokenUtil.generateSecureToken();
  }

  /**
   * Verifies and decodes an Access Token
   */
  static verifyAccessToken(token: string): IDecodedToken {
    try {
      return jwt.verify(token, jwtConfig.accessSecret, {
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience,
        algorithms: [jwtConfig.algorithm],
      }) as IDecodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError(AuthErrors.EXPIRED_TOKEN);
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError(AuthErrors.INVALID_TOKEN);
      }
      throw new UnauthorizedError(AuthErrors.MALFORMED_TOKEN);
    }
  }

  /**
   * Decodes a token without verifying signature (useful for checking expired token contents)
   */
  static decodeToken(token: string): IDecodedToken | null {
    return jwt.decode(token) as IDecodedToken | null;
  }
}
