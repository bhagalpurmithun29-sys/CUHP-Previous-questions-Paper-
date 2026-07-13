import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { voiceSessionService } from '../services/mobile-ai/voiceSession.service';
import { conversationSyncService } from '../services/mobile-ai/conversationSync.service';
import { aiShortcutService } from '../services/mobile-ai/aiShortcut.service';

export class MobileAIController {
  
  startVoiceSession = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await voiceSessionService.initiateSession(userId);
    res.status(200).json(new ApiResponse(200, result, 'Voice session started'));
  });

  processVoice = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { sessionId, text } = req.body;
    const result = await voiceSessionService.processVoiceInput(userId, sessionId, text);
    res.status(200).json(new ApiResponse(200, result, 'Voice processed'));
  });

  executeAction = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { action, context } = req.body;
    const result = await aiShortcutService.executeAction(userId, action, context);
    res.status(200).json(new ApiResponse(200, result, 'Action executed'));
  });

  getHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await conversationSyncService.getHistory(userId);
    res.status(200).json(new ApiResponse(200, result, 'History retrieved'));
  });

  syncHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await conversationSyncService.syncHistory(userId);
    res.status(200).json(new ApiResponse(200, result, 'History synced'));
  });
}

export const mobileAIController = new MobileAIController();
