import { OAuthProvider, OAuthUserInfo } from '../OAuthProvider';
import { AppError } from '../../../../utils/AppError';

export class MicrosoftProvider extends OAuthProvider {
  name = 'microsoft';
  
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.MS_CLIENT_ID || 'mock_client_id';
    const redirectUri = `${process.env.APP_URL}/api/v1/auth/oauth/microsoft/callback`;
    const scope = 'openid email profile User.Read';
    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    if (!code) throw new AppError('Authorization code missing', 400);
    return {
      providerId: `ms_${Math.random().toString(36).substr(2, 9)}`,
      email: 'student@cuhimachal.ac.in',
      firstName: 'Microsoft',
      lastName: 'User',
      emailVerified: true
    };
  }
}
