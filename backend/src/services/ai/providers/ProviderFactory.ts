import { AiProviderInterface } from './ProviderInterface';
import { GeminiProvider } from './GeminiProvider';
import { OpenAiProvider } from './OpenAiProvider';
import { GroqProvider } from './GroqProvider';
import { OpenRouterProvider } from './OpenRouterProvider';
import { AppError } from '../../../utils/AppError';

export class ProviderFactory {
  private providers: Map<string, AiProviderInterface> = new Map();

  constructor() {
    this.register(new GeminiProvider());
    this.register(new OpenAiProvider());
    this.register(new GroqProvider());
    this.register(new OpenRouterProvider());
  }

  register(provider: AiProviderInterface) {
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): AiProviderInterface {
    const provider = this.providers.get(name.toLowerCase());
    if (!provider) {
      throw new AppError(`AI Provider '${name}' not found.`, 400);
    }
    if (!provider.isAvailable()) {
      throw new AppError(`AI Provider '${name}' is not configured (missing API keys).`, 500);
    }
    return provider;
  }

  getAvailableProviders(): string[] {
    const available: string[] = [];
    this.providers.forEach((provider, name) => {
      if (provider.isAvailable()) available.push(name);
    });
    return available;
  }
}

export const providerFactory = new ProviderFactory();
