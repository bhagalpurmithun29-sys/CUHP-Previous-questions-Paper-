import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { guardrailEngine } from '../services/aiSafety/guardrailEngine.service';
import { moderationService } from '../services/aiSafety/moderation.service';
import { policyRepository } from '../repositories/policy.repository';

export class AISafetyController {
  
  validateRequest = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { prompt, documentIds } = req.body;

    const result = await guardrailEngine.evaluateRequest(prompt, userId, documentIds || []);
    
    if (!result.allowed) {
       res.status(403).json(new ApiResponse(403, null, result.error));
       return;
    }

    res.status(200).json(new ApiResponse(200, { allowed: true }, 'Request passed safety checks'));
  });

  validateResponse = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { responseText, context } = req.body;

    const result = await guardrailEngine.evaluateResponse(responseText, context, userId);
    
    if (!result.allowed) {
       if (result.requiresModeration) {
         await moderationService.addToQueue(responseText, 'OUTPUT', userId, result.error || 'Validation failed');
       }
       res.status(403).json(new ApiResponse(403, null, result.error));
       return;
    }

    res.status(200).json(new ApiResponse(200, { allowed: true }, 'Response passed safety checks'));
  });

  getPolicies = catchAsync(async (req: Request, res: Response) => {
    const policies = await policyRepository.findAll();
    res.status(200).json(new ApiResponse(200, policies, 'Policies retrieved'));
  });

  getEvents = catchAsync(async (req: Request, res: Response) => {
    const events = await policyRepository.getEvents();
    res.status(200).json(new ApiResponse(200, events, 'Safety events retrieved'));
  });

  getModerationQueue = catchAsync(async (req: Request, res: Response) => {
    const queue = await moderationService.getQueue();
    res.status(200).json(new ApiResponse(200, queue, 'Moderation queue retrieved'));
  });

  moderateItem = catchAsync(async (req: Request, res: Response) => {
    const moderatorId = (req as any).user.id;
    const { itemId, resolution } = req.body;
    
    const result = await moderationService.resolveItem(itemId, resolution, moderatorId);
    res.status(200).json(new ApiResponse(200, result, 'Item moderated'));
  });
}

export const aiSafetyController = new AISafetyController();
