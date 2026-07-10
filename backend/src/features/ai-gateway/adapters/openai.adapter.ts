import { IProviderAdapter, LLMRequest, LLMResponse } from './provider.interface';

export class OpenAIAdapter implements IProviderAdapter {
  name = 'OpenAI';

  async isAvailable(): Promise<boolean> { return true; }
  getSupportedModels(): string[] { return ['gpt-4o', 'gpt-3.5-turbo']; }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    return {
      text: `[OpenAI ${request.model}] Simulated response to: ${request.prompt.substring(0, 20)}...`,
      provider: this.name,
      model: request.model
    };
  }
}
