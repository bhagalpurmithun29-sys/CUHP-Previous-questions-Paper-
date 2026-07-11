import { Request, Response } from 'express';
import { conversationService } from '../services/aiChat/conversation.service';
import { streamingService } from '../services/aiChat/streaming.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { conversationId, message } = req.body;

  if (!message) {
    return res.status(400).json(new ApiResponse(400, null, 'Message is required'));
  }

  const result = await conversationService.processMessage(userId, conversationId, message);
  res.status(200).json(new ApiResponse(200, result, 'Message processed successfully'));
});

export const streamMessage = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { conversationId, message } = req.body;

  if (!message) {
    return res.status(400).json(new ApiResponse(400, null, 'Message is required'));
  }

  // Setup SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await streamingService.streamResponse(res, userId, conversationId, message);
});

export const getHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const history = await conversationService.getUserConversations(userId);
  res.status(200).json(new ApiResponse(200, history, 'History fetched successfully'));
});

export const getConversation = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;
  const conversation = await conversationService.getConversation(userId, id);
  res.status(200).json(new ApiResponse(200, conversation, 'Conversation fetched successfully'));
});

export const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { id } = req.params;
  await conversationService.deleteConversation(userId, id);
  res.status(200).json(new ApiResponse(200, null, 'Conversation deleted successfully'));
});
