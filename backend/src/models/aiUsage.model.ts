import mongoose, { Schema, Document } from 'mongoose';

export interface IAiUsage extends Document {
  userId?: mongoose.Types.ObjectId;
  provider: string; // e.g., 'gemini', 'openai'
  modelId: string;
  endpoint: string; // 'chat', 'stream', 'embedding'
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number; // in USD
  latencyMs: number;
  isSuccessful: boolean;
  errorMessage?: string;
  createdAt: Date;
}

const AiUsageSchema = new Schema<IAiUsage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // null for system calls
    provider: { type: String, required: true },
    modelId: { type: String, required: true },
    endpoint: { type: String, required: true },
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
    estimatedCost: { type: Number, default: 0 },
    latencyMs: { type: Number, default: 0 },
    isSuccessful: { type: Boolean, default: true },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

AiUsageSchema.index({ userId: 1, createdAt: -1 });
AiUsageSchema.index({ provider: 1, createdAt: -1 });

export const AiUsage = mongoose.model<IAiUsage>('AiUsage', AiUsageSchema);
