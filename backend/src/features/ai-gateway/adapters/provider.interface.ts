export interface LLMRequest {
  prompt: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMResponse {
  text: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  provider: string;
  model: string;
}

export interface IProviderAdapter {
  name: string;
  isAvailable(): Promise<boolean>;
  getSupportedModels(): string[];
  generate(request: LLMRequest): Promise<LLMResponse>;
  stream?(request: LLMRequest, onChunk: (chunk: string) => void): Promise<void>;
}
