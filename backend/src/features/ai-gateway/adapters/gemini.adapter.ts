import { IProviderAdapter, LLMRequest, LLMResponse } from './provider.interface';

export class GeminiAdapter implements IProviderAdapter {
  name = 'Gemini';

  async isAvailable(): Promise<boolean> { return true; }
  getSupportedModels(): string[] { return ['gemini-1.5-pro', 'gemini-1.5-flash']; }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    return {
      text: `[Gemini ${request.model}] Simulated response to: ${request.prompt.substring(0, 20)}...`,
      provider: this.name,
      model: request.model
    };
  }
}
