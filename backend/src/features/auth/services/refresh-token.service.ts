import { Types } from 'mongoose';
import { RefreshToken } from '../../../models/refreshToken.model';
import { AuthConstants, AuthErrors } from '../constants/auth.constants';
import { TokenUtil } from '../utils/token.util';
import { UnauthorizedError } from '../../../utils/ApiError';
import { SessionService } from './session.service';

export class RefreshTokenService {
  /**
   * Issues a new Refresh Token and saves its hash in the database
   */
  static async issueRefreshToken(userId: string, req: any): Promise<string> {
    const rawToken = TokenUtil.generateSecureToken();
    const hashedToken = TokenUtil.hashToken(rawToken);
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AuthConstants.REFRESH_TOKEN_EXPIRES_DAYS);

    await RefreshToken.create({
      userId: new Types.ObjectId(userId),
      hashedToken,
      expiresAt,
      ipAddress: req.ip,
      browser: req.headers['user-agent']
    });

    return rawToken;
  }

  /**
   * Verifies the given raw refresh token against the DB
   * Implements Reuse Detection (Rotation Security)
   */
  static async verifyAndRotateToken(rawToken: string, req: any): Promise<{ userId: string, newRefreshToken: string }> {
    const hashedToken = TokenUtil.hashToken(rawToken);
    
    const tokenDoc = await RefreshToken.findOne({ hashedToken });
    
    if (!tokenDoc) {
      throw new UnauthorizedError(AuthErrors.INVALID_REFRESH_TOKEN);
    }

    if (tokenDoc.expiresAt.getTime() < Date.now()) {
      await RefreshToken.deleteOne({ _id: tokenDoc._id });
      throw new UnauthorizedError(AuthErrors.EXPIRED_TOKEN);
    }

    // Token Reuse Detection
    if (tokenDoc.revoked) {
      // Security Breach Detected: A revoked token is being used.
      // This implies someone's token was stolen and they already used the new one,
      // or the attacker used the new one and the victim is using the old one.
      // Action: Wipe ALL refresh tokens for this user and force re-login.
      await RefreshToken.deleteMany({ userId: tokenDoc.userId });
      await SessionService.endAllSessions(tokenDoc.userId.toString());
      throw new UnauthorizedError(AuthErrors.TOKEN_REUSE_DETECTED);
    }

    // Rotate Token: Revoke the current one and issue a new one
    tokenDoc.revoked = true;
    tokenDoc.revokedAt = new Date();
    await tokenDoc.save();

    const newRefreshToken = await this.issueRefreshToken(tokenDoc.userId.toString(), req);

    return { userId: tokenDoc.userId.toString(), newRefreshToken };
  }

  /**
   * Revokes a specific refresh token (Logout)
   */
  static async revokeToken(rawToken: string): Promise<void> {
    const hashedToken = TokenUtil.hashToken(rawToken);
    await RefreshToken.updateOne(
      { hashedToken },
      { $set: { revoked: true, revokedAt: new Date() } }
    );
  }

  /**
   * Revokes all refresh tokens for a user (Logout All Devices)
   */
  static async revokeAllForUser(userId: string): Promise<void> {
    await RefreshToken.updateMany(
      { userId: new Types.ObjectId(userId), revoked: false },
      { $set: { revoked: true, revokedAt: new Date() } }
    );
  }
}
