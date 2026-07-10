import { IProviderAdapter, LLMRequest, LLMResponse } from './provider.interface';

export class ClaudeAdapter implements IProviderAdapter {
  name = 'Claude';

  async isAvailable(): Promise<boolean> { return true; }
  getSupportedModels(): string[] { return ['claude-3-opus', 'claude-3-sonnet']; }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    return {
      text: `[Claude ${request.model}] Simulated response to: ${request.prompt.substring(0, 20)}...`,
      provider: this.name,
      model: request.model
    };
  }
}
