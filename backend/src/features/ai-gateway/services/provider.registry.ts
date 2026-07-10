import { IProviderAdapter } from '../adapters/provider.interface';
import { OpenAIAdapter } from '../adapters/openai.adapter';
import { GeminiAdapter } from '../adapters/gemini.adapter';
import { ClaudeAdapter } from '../adapters/claude.adapter';

export class ProviderRegistry {
  private adapters: Map<string, IProviderAdapter> = new Map();

  constructor() {
    this.register(new OpenAIAdapter());
    this.register(new GeminiAdapter());
    this.register(new ClaudeAdapter());
  }

  register(adapter: IProviderAdapter) {
    this.adapters.set(adapter.name.toLowerCase(), adapter);
  }

  getAdapter(name: string): IProviderAdapter {
    const adapter = this.adapters.get(name.toLowerCase());
    if (!adapter) throw new Error(`Provider ${name} not found`);
    return adapter;
  }

  getAllProviders() {
    return Array.from(this.adapters.values()).map(a => ({
      name: a.name,
      models: a.getSupportedModels()
    }));
  }
}
