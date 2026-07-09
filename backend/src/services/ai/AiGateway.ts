import { providerFactory } from './providers/ProviderFactory';
import { ChatRequest } from './providers/ProviderInterface';
import { AiUsage } from '../../models/aiUsage.model';
import { AppError } from '../../utils/AppError';

export class AiGateway {
  /**
   * Helper to estimate cost based on provider/model rates.
   * In a real enterprise system, this is managed via DB or config.
   */
  private calculateEstimatedCost(provider: string, promptTokens: number, completionTokens: number): number {
    // Simplified placeholder cost logic
    const rates: Record<string, { prompt: number, completion: number }> = {
      'openai': { prompt: 0.000005, completion: 0.000015 },
      'gemini': { prompt: 0.0000005, completion: 0.0000015 },
      'groq': { prompt: 0.0000001, completion: 0.0000001 }
    };
    
    const rate = rates[provider] || { prompt: 0, completion: 0 };
    return (promptTokens * rate.prompt) + (completionTokens * rate.completion);
  }

  async chat(providerName: string, request: ChatRequest, userId?: string) {
    const startTime = Date.now();
    const provider = providerFactory.getProvider(providerName);

    try {
      const response = await provider.chat(request);
      const latencyMs = Date.now() - startTime;
      
      const pTokens = response.usage?.promptTokens || 0;
      const cTokens = response.usage?.completionTokens || 0;
      const tTokens = response.usage?.totalTokens || (pTokens + cTokens);
      const estCost = this.calculateEstimatedCost(providerName, pTokens, cTokens);

      // Track usage asynchronously
      AiUsage.create({
        userId,
        provider: providerName,
        modelId: request.model || 'default',
        endpoint: 'chat',
        promptTokens: pTokens,
        completionTokens: cTokens,
        totalTokens: tTokens,
        estimatedCost: estCost,
        latencyMs,
        isSuccessful: true
      }).catch((err: any) => console.error('AiUsage track error:', err));

      return response;
    } catch (error: any) {
      const latencyMs = Date.now() - startTime;
      AiUsage.create({
        userId,
        provider: providerName,
        modelId: request.model || 'default',
        endpoint: 'chat',
        latencyMs,
        isSuccessful: false,
        errorMessage: error.message
      }).catch((err: any) => console.error('AiUsage track error:', err));

      throw new AppError(`AI Gateway Error (${providerName}): ${error.message}`, 502);
    }
  }
}

export const aiGateway = new AiGateway();
