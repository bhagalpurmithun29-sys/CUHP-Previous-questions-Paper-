import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { conversationService } from '../services/messaging/conversation.service';
import { messageService } from '../services/messaging/message.service';

export class MessagingController {
  
  getConversations = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await conversationService.getConversations(userId, req.query);
    res.status(200).json(new ApiResponse(200, result, 'Conversations retrieved'));
  });

  getConversationMessages = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await messageService.getMessages(userId, req.params.conversationId, req.query);
    res.status(200).json(new ApiResponse(200, result, 'Messages retrieved'));
  });

  sendMessage = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await messageService.sendMessage(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Message sent'));
  });

  markAsRead = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await messageService.markAsRead(userId, req.params.conversationId, req.params.messageId);
    res.status(200).json(new ApiResponse(200, result, 'Message read'));
  });

  searchMessages = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await messageService.searchMessages(userId, req.query.q as string);
    res.status(200).json(new ApiResponse(200, result, 'Search results'));
  });
}

export const messagingController = new MessagingController();
