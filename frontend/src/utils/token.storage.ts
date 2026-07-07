/**
 * Utility to manage the access token in memory or local storage.
 * Note: Refresh tokens are stored in HTTP-only cookies by the backend, 
 * so the frontend never directly interacts with them.
 */

const ACCESS_TOKEN_KEY = 'cuhp_access_token';

export const tokenStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  
  setToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  
  clearToken: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
