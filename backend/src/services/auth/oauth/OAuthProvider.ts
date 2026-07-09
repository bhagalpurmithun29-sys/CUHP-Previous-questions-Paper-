export interface OAuthUserInfo {
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  emailVerified: boolean;
}

export abstract class OAuthProvider {
  abstract name: string;
  
  /**
   * Generates the authorization URL to redirect the user to.
   */
  abstract getAuthorizationUrl(state: string): string;

  /**
   * Exchanges an authorization code for user information.
   */
  abstract getUserInfo(code: string): Promise<OAuthUserInfo>;
}
