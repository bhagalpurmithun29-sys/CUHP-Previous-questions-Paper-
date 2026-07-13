import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { feedbackService } from '../services/aiFeedback/feedback.service';
import { evaluationService } from '../services/aiFeedback/evaluation.service';
import { qualityScoringService } from '../services/aiFeedback/qualityScoring.service';
import { improvementRecommendationService } from '../services/aiFeedback/improvementRecommendation.service';

export class AIFeedbackController {
  
  submitFeedback = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const feedback = await feedbackService.submitFeedback(req.body, userId);
    res.status(201).json(new ApiResponse(201, feedback, 'Feedback submitted successfully'));
  });

  getHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const history = await feedbackService.getUserHistory(userId);
    res.status(200).json(new ApiResponse(200, history, 'Feedback history retrieved'));
  });

  evaluateFeedback = catchAsync(async (req: Request, res: Response) => {
    const reviewerId = (req as any).user.id;
    const { feedbackId, evaluation } = req.body;
    const result = await evaluationService.submitEvaluation(feedbackId, evaluation, reviewerId);
    res.status(200).json(new ApiResponse(200, result, 'Evaluation completed'));
  });

  getQualityMetrics = catchAsync(async (req: Request, res: Response) => {
    const metrics = await qualityScoringService.getQualityMetrics();
    res.status(200).json(new ApiResponse(200, metrics, 'Quality metrics retrieved'));
  });

  getReports = catchAsync(async (req: Request, res: Response) => {
    const suggestions = await improvementRecommendationService.getRecommendations();
    const stats = await improvementRecommendationService.getReports();
    res.status(200).json(new ApiResponse(200, { suggestions, stats }, 'Reports retrieved'));
  });
  
  getPendingQueue = catchAsync(async (req: Request, res: Response) => {
    const queue = await feedbackService.getPendingQueue();
    res.status(200).json(new ApiResponse(200, queue, 'Pending evaluation queue retrieved'));
  });
}

export const aiFeedbackController = new AIFeedbackController();
