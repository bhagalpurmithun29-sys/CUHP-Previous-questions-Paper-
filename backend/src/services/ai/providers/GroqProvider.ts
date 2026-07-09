import { AiProviderInterface, ChatRequest, ChatResponse } from './ProviderInterface';
import axios from 'axios';

export class GroqProvider implements AiProviderInterface {
  name = 'groq';
  private apiKey = process.env.GROQ_API_KEY || '';

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const model = request.model || 'llama3-8b-8192';
    const payload: any = {
      model,
      messages: request.messages,
      temperature: request.temperature || 0.7,
    };
    if (request.jsonMode) payload.response_format = { type: 'json_object' };

    const url = 'https://api.groq.com/openai/v1/chat/completions';
    
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });

    const choice = response.data.choices[0];
    const usage = response.data.usage;

    return {
      content: choice.message.content,
      usage: {
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        totalTokens: usage.total_tokens,
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
