import { ProviderFactory } from './ProviderFactory';
import { User } from '../../../models/user.model';
import { AppError } from '../../../utils/AppError';
import { JwtService } from '../../../features/auth/services/jwt.service';
import crypto from 'crypto';

export class OAuthService {
  /**
   * Generates authorization URL for the selected provider
   */
  getAuthorizationUrl(providerName: string): { url: string; state: string } {
    const provider = ProviderFactory.getProvider(providerName);
    const state = crypto.randomBytes(16).toString('hex'); // Prevent CSRF/Replay
    return { url: provider.getAuthorizationUrl(state), state };
  }

  /**
   * Handles the OAuth callback, user creation/linking, and returns JWT
   */
  async handleCallback(providerName: string, code: string, state: string, expectedState: string) {
    if (!code || state !== expectedState) {
      throw new AppError('Invalid state or missing authorization code. Possible CSRF attack.', 401);
    }

    const provider = ProviderFactory.getProvider(providerName);
    const userInfo = await provider.getUserInfo(code);

    if (!userInfo.emailVerified) {
      throw new AppError('Social account email must be verified to continue.', 403);
    }

    // Check if user exists by email
    let user = await User.findOne({ email: userInfo.email });

    if (user) {
      // Check if provider is already linked
      const isLinked = user.authProviders?.some((p: any) => p.provider === providerName && p.providerId === userInfo.providerId);
      
      if (!isLinked) {
        // Automatically link this provider if the email matches (trust based on emailVerified)
        user.authProviders = user.authProviders || [];
        user.authProviders.push({ provider: providerName, providerId: userInfo.providerId });
        await user.save();
      }
    } else {
      // Create new user via OAuth
      user = await User.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        isEmailVerified: true, // Trusted from provider
        authProviders: [{ provider: providerName, providerId: userInfo.providerId }],
        // Generate random secure password for database constraints
        password: crypto.randomBytes(32).toString('hex'), 
      });
    }

    const token = JwtService.generateAccessToken({ userId: user._id.toString(), role: user.role, tokenVersion: user.refreshTokenVersion || 0, sessionId: crypto.randomUUID() });
    return { user, token };
  }

  /**
   * Links an additional provider to an existing authenticated user
   */
  async linkAccount(userId: string, providerName: string, code: string, state: string, expectedState: string) {
    if (state !== expectedState) throw new AppError('Invalid OAuth state', 401);

    const provider = ProviderFactory.getProvider(providerName);
    const userInfo = await provider.getUserInfo(code);

    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const alreadyLinked = user.authProviders?.some((p: any) => p.provider === providerName);
    if (alreadyLinked) {
      throw new AppError(`Account is already linked to ${providerName}`, 400);
    }

    user.authProviders = user.authProviders || [];
    user.authProviders.push({ provider: providerName, providerId: userInfo.providerId });
    await user.save();

    return user;
  }

  /**
   * Unlinks a provider from the account
   */
  async unlinkAccount(userId: string, providerName: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    if (!user.authProviders || user.authProviders.length === 0) {
      throw new AppError('No linked accounts to remove', 400);
    }

    // Ensure the user has a password before removing the last provider
    if (user.authProviders.length === 1 && !user.password) {
      throw new AppError('Cannot unlink last provider without a set password', 400);
    }

    user.authProviders = user.authProviders.filter((p: any) => p.provider !== providerName);
    await user.save();

    return user;
  }
}

export const oAuthService = new OAuthService();
