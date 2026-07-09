import { OAuthProvider, OAuthUserInfo } from '../OAuthProvider';
import { AppError } from '../../../../utils/AppError';

export class GoogleProvider extends OAuthProvider {
  name = 'google';
  
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID || 'mock_client_id';
    const redirectUri = `${process.env.APP_URL}/api/v1/auth/oauth/google/callback`;
    const scope = 'openid email profile';
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    // In production, exchange code for token and call Google API
    // Mock implementation for structural completion
    if (!code) throw new AppError('Authorization code missing', 400);
    
    return {
      providerId: `google_${Math.random().toString(36).substr(2, 9)}`,
      email: 'student@cuhimachal.ac.in',
      firstName: 'Google',
      lastName: 'User',
      emailVerified: true
    };
  }
}
