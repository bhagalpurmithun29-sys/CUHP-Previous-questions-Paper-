import { AiProviderInterface, ChatRequest, ChatResponse } from './ProviderInterface';
import axios from 'axios';

export class OpenRouterProvider implements AiProviderInterface {
  name = 'openrouter';
  private apiKey = process.env.OPENROUTER_API_KEY || '';

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const model = request.model || 'openai/gpt-3.5-turbo';
    const payload: any = {
      model,
      messages: request.messages,
      temperature: request.temperature || 0.7,
    };
    
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    
    const response = await axios.post(url, payload, {
      headers: { 
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://cuhp-qb.edu.in',
        'X-Title': 'CUHP Question Bank'
      }
    });

    const choice = response.data.choices[0];
    const usage = response.data.usage;

    return {
      content: choice.message.content,
      usage: {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      }
    };
  }

  async *chatStream(request: ChatRequest): AsyncGenerator<string, void, unknown> {
    const response = await this.chat(request);
    const chunks = response.content.split(' ');
    for (const chunk of chunks) {
      yield chunk + ' ';
    }
  }
}
