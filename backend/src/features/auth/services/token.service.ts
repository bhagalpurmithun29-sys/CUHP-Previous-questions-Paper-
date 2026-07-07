import { JwtService } from './jwt.service';
import { RefreshTokenService } from './refresh-token.service';
import { SessionService } from './session.service';
import { ITokenPair } from '../types/jwt.types';
import { UserRole } from '../../../enums/auth.enum';
import { Request } from 'express';

export class TokenService {
  /**
   * Generates a complete token pair (Access + Refresh) for a user
   * and binds them to a newly created session.
   */
  static async generateTokenPair(userId: string, role: UserRole, tokenVersion: number, req: Request): Promise<ITokenPair> {
    // 1. Create a session for device tracking
    const sessionId = await SessionService.createSession(userId, req);

    // 2. Generate Access Token
    const accessToken = JwtService.generateAccessToken({
      userId,
      role,
      tokenVersion,
      sessionId
    });

    // 3. Issue Refresh Token
    const refreshToken = await RefreshTokenService.issueRefreshToken(userId, req);

    return { accessToken, refreshToken };
  }
}
