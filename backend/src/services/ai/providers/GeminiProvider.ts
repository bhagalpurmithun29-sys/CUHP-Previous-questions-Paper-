import { AiProviderInterface, ChatRequest, ChatResponse } from './ProviderInterface';
import axios from 'axios';

export class GeminiProvider implements AiProviderInterface {
  name = 'gemini';
  private apiKey = process.env.GEMINI_API_KEY || '';

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  private mapMessages(messages: any[]) {
    // Gemini uses 'model' instead of 'assistant', and maps 'system' differently
    let systemInstruction = '';
    const contents = messages.filter(m => {
      if (m.role === 'system') {
        systemInstruction += m.content + '\n';
        return false;
      }
      return true;
    }).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    return { contents, systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined };
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const { contents, systemInstruction } = this.mapMessages(request.messages);
    const model = request.model || 'gemini-1.5-flash';
    
    const payload: any = { contents };
    if (systemInstruction) payload.systemInstruction = systemInstruction;
    if (request.jsonMode) payload.generationConfig = { responseMimeType: 'application/json' };
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
    
    const response = await axios.post(url, payload);
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Naive token estimation for Gemini (they provide metadata but let's simulate if missing)
    const usageMetadata = response.data.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0, totalTokenCount: 0 };

    return {
      content: text,
      usage: {
        promptTokens: usageMetadata.promptTokenCount,
        completionTokens: usageMetadata.candidatesTokenCount,
        totalTokens: usageMetadata.totalTokenCount,
      }
    };
  }

  async *chatStream(request: ChatRequest): AsyncGenerator<string, void, unknown> {
    // Simplified stream generation simulation
    const response = await this.chat(request);
    const chunks = response.content.match(/.{1,20}/g) || [];
    for (const chunk of chunks) {
      yield chunk;
    }
  }
}
