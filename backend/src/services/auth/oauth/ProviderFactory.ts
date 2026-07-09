import { OAuthProvider } from './OAuthProvider';
import { GoogleProvider } from './providers/GoogleProvider';
import { MicrosoftProvider } from './providers/MicrosoftProvider';
import { GitHubProvider } from './providers/GitHubProvider';
import { AppError } from '../../../utils/AppError';

export class ProviderFactory {
  private static providers: Record<string, OAuthProvider> = {
    google: new GoogleProvider(),
    microsoft: new MicrosoftProvider(),
    github: new GitHubProvider(),
  };

  static getProvider(name: string): OAuthProvider {
    const provider = this.providers[name.toLowerCase()];
    if (!provider) {
      throw new AppError(`OAuth provider '${name}' is not supported`, 400);
    }
    return provider;
  }

  static getSupportedProviders(): string[] {
    return Object.keys(this.providers);
  }
}
