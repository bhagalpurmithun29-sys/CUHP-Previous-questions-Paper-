export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  jsonMode?: boolean;
}

export interface ChatResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AiProviderInterface {
  name: string;
  isAvailable(): boolean;
  chat(request: ChatRequest): Promise<ChatResponse>;
  chatStream(request: ChatRequest): AsyncGenerator<string, void, unknown>;
  // Placeholders for future capabilities
  generateEmbeddings?(texts: string[]): Promise<number[][]>;
  analyzeImage?(imageUrl: string, prompt: string): Promise<string>;
}
