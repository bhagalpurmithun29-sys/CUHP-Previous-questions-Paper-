import { OAuthProvider, OAuthUserInfo } from '../OAuthProvider';
import { AppError } from '../../../../utils/AppError';

export class GitHubProvider extends OAuthProvider {
  name = 'github';
  
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.GITHUB_CLIENT_ID || 'mock_client_id';
    const redirectUri = `${process.env.APP_URL}/api/v1/auth/oauth/github/callback`;
    const scope = 'read:user user:email';
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  }

  async getUserInfo(code: string): Promise<OAuthUserInfo> {
    if (!code) throw new AppError('Authorization code missing', 400);
    return {
      providerId: `gh_${Math.random().toString(36).substr(2, 9)}`,
      email: 'developer@cuhimachal.ac.in',
      firstName: 'GitHub',
      lastName: 'Dev',
      emailVerified: true
    };
  }
}
