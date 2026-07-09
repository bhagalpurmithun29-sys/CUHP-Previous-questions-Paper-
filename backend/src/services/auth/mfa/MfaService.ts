import { User } from '../../../models/user.model';
import { AppError } from '../../../utils/AppError';
import { totpService } from './TotpService';
import { recoveryCodeService } from './RecoveryCodeService';
import { trustedDeviceService } from './TrustedDeviceService';

export class MfaService {
  /**
   * Step 1: Initiates MFA setup by generating a secret and QR code.
   * Does NOT enable MFA yet.
   */
  async setup(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    if (user.mfaEnabled) {
      throw new AppError('MFA is already enabled', 400);
    }

    const secret = totpService.generateSecret();
    const authUrl = totpService.generateAuthUrl(user.email, 'CUHP Question Bank', secret);
    const qrCode = await totpService.generateQRCode(authUrl);

    // Save temporary secret (in a real app, this might go to a cache or temporary field until verified)
    // For this implementation, we store it but keep mfaEnabled = false
    user.mfaSecret = secret;
    await user.save();

    return { secret, qrCode };
  }

  /**
   * Step 2: Verifies the token and fully enables MFA, returning backup codes.
   */
  async enable(userId: string, token: string) {
    const user = await User.findById(userId).select('+mfaSecret');
    if (!user) throw new AppError('User not found', 404);
    if (user.mfaEnabled) throw new AppError('MFA is already enabled', 400);
    if (!user.mfaSecret) throw new AppError('MFA setup not initiated', 400);

    const isValid = totpService.verifyToken(token, user.mfaSecret);
    if (!isValid) throw new AppError('Invalid verification code', 400);

    const plainBackupCodes = recoveryCodeService.generateCodes();
    user.backupCodes = await recoveryCodeService.hashCodes(plainBackupCodes);
    user.mfaEnabled = true;
    await user.save();

    return { backupCodes: plainBackupCodes };
  }

  /**
   * Verifies an MFA token during login
   */
  async verify(userId: string, token: string, userAgent: string, ip: string, rememberDevice: boolean = false) {
    const user = await User.findById(userId).select('+mfaSecret');
    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      throw new AppError('MFA is not enabled for this user', 400);
    }

    const isValid = totpService.verifyToken(token, user.mfaSecret);
    if (!isValid) throw new AppError('Invalid verification code', 400);

    let deviceId = null;
    if (rememberDevice) {
      deviceId = await trustedDeviceService.registerDevice(userId, userAgent, ip);
    }

    return { verified: true, deviceId };
  }

  /**
   * Recovers account using a backup code
   */
  async recover(userId: string, code: string) {
    const user = await User.findById(userId).select('+backupCodes');
    if (!user || !user.mfaEnabled || !user.backupCodes) {
      throw new AppError('MFA is not enabled or no backup codes available', 400);
    }

    const { isValid, remainingCodes } = await recoveryCodeService.verifyAndConsumeCode(code, user.backupCodes);
    
    if (!isValid) throw new AppError('Invalid recovery code', 400);

    user.backupCodes = remainingCodes;
    await user.save();

    return { verified: true, remainingCodesCount: remainingCodes.length };
  }

  /**
   * Disables MFA entirely
   */
  async disable(userId: string, token: string) {
    const user = await User.findById(userId).select('+mfaSecret');
    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      throw new AppError('MFA is not enabled', 400);
    }

    const isValid = totpService.verifyToken(token, user.mfaSecret);
    if (!isValid) throw new AppError('Invalid verification code', 400);

    user.mfaEnabled = false;
    user.mfaSecret = undefined;
    user.backupCodes = [];
    user.trustedDevices = [];
    await user.save();

    return { success: true };
  }
}

export const mfaService = new MfaService();
