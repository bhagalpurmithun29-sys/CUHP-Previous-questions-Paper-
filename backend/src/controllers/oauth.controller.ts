import { Request, Response } from 'express';
import { oAuthService } from '../services/auth/oauth/OAuthService';
import { ProviderFactory } from '../services/auth/oauth/ProviderFactory';
import { AppError } from '../utils/AppError';

export class OAuthController {
  // Initiates the OAuth flow by returning the authorization URL
  getAuthorizationUrl(req: Request, res: Response) {
    const { provider } = req.params;
    try {
      const { url, state } = oAuthService.getAuthorizationUrl(provider);
      // Store state in a secure httpOnly cookie (short-lived)
      res.cookie('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 10 * 60 * 1000, // 10 minutes
        sameSite: 'lax',
      });
      res.status(200).json({ status: 'success', data: { url } });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  // Handles the OAuth callback and logs the user in
  async handleCallback(req: Request, res: Response) {
    const { provider } = req.params;
    const { code, state } = req.query;
    const expectedState = req.cookies.oauth_state;

    try {
      if (!code || typeof code !== 'string') throw new AppError('Authorization code missing', 400);
      if (!state || typeof state !== 'string') throw new AppError('State parameter missing', 400);

      const { user, token } = await oAuthService.handleCallback(provider, code, state, expectedState);
      
      // Clear the state cookie
      res.clearCookie('oauth_state');
      
      // Return token (or redirect to frontend with token in production depending on arch)
      res.status(200).json({
        status: 'success',
        data: { user, token }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  // Lists all supported providers
  getProviders(req: Request, res: Response) {
    const providers = ProviderFactory.getSupportedProviders();
    res.status(200).json({ status: 'success', data: { providers } });
  }

  // Links an account for an already authenticated user
  async linkAccount(req: Request, res: Response) {
    const { provider } = req.params;
    const { code, state } = req.body;
    const expectedState = req.cookies.oauth_state;
    const userId = req.user!.id;

    try {
      const user = await oAuthService.linkAccount(userId, provider, code, state, expectedState);
      res.clearCookie('oauth_state');
      res.status(200).json({ status: 'success', data: { user } });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  // Unlinks a provider from the user's account
  async unlinkAccount(req: Request, res: Response) {
    const { provider } = req.params;
    const userId = req.user!.id;

    try {
      const user = await oAuthService.unlinkAccount(userId, provider);
      res.status(200).json({ status: 'success', data: { user } });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
}

export const oAuthController = new OAuthController();
