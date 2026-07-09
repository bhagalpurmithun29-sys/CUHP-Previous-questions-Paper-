import { Request, Response } from 'express';
import { aiGateway } from '../services/ai/AiGateway';
import { conversationManager } from '../services/ai/managers/ConversationManager';
import { providerFactory } from '../services/ai/providers/ProviderFactory';
import { AiUsage } from '../models/aiUsage.model';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const getProviders = catchAsync(async (req: Request, res: Response) => {
  const providers = providerFactory.getAvailableProviders();
  res.status(200).json(new ApiResponse(200, providers, 'Available AI Providers'));
});

export const chat = catchAsync(async (req: Request, res: Response) => {
  const { provider = 'openai', model, message, conversationId } = req.body;
  const userId = req.user!.id;

  // 1. Get or create session
  const conv = await conversationManager.getOrCreateSession(userId, conversationId);

  // 2. Add user message
  await conversationManager.addMessage(conv.conversationId, userId, 'user', message);

  // 3. Get Context Window
  const context = await conversationManager.getContextWindow(conv.conversationId, userId, 10);

  // 4. Call Gateway
  const response = await aiGateway.chat(provider, { messages: context, model }, userId);

  // 5. Add assistant reply to memory
  await conversationManager.addMessage(conv.conversationId, userId, 'assistant', response.content);

  res.status(200).json(new ApiResponse(200, {
    conversationId: conv.conversationId,
    reply: response.content,
    usage: response.usage
  }, 'Chat completed'));
});

export const getUsageStats = catchAsync(async (req: Request, res: Response) => {
  // Admin dashboard stats
  const pipeline = [
    {
      $group: {
        _id: '$provider',
        totalRequests: { $sum: 1 },
        totalCost: { $sum: '$estimatedCost' },
        totalTokens: { $sum: '$totalTokens' },
        avgLatency: { $avg: '$latencyMs' },
        errors: {
          $sum: { $cond: [{ $eq: ['$isSuccessful', false] }, 1, 0] }
        }
      }
    }
  ];
  
  const stats = await AiUsage.aggregate(pipeline);
  res.status(200).json(new ApiResponse(200, stats, 'AI Usage Stats'));
});

export const getConversations = catchAsync(async (req: Request, res: Response) => {
  const data = await conversationManager.getHistory(req.user!.id);
  res.status(200).json(new ApiResponse(200, data, 'Conversations fetched'));
});

export const getConversationById = catchAsync(async (req: Request, res: Response) => {
  const data = await conversationManager.getConversation(req.params.id, req.user!.id);
  res.status(200).json(new ApiResponse(200, data, 'Conversation fetched'));
});

export const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const data = await conversationManager.deleteConversation(req.params.id, req.user!.id);
  res.status(200).json(new ApiResponse(200, data, 'Conversation deleted'));
});
