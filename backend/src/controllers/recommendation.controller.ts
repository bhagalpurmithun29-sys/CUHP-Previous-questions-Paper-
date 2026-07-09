import { Request, Response } from 'express';
import { recommendationService } from '../services/recommendation/recommendation.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class RecommendationController {

  public getHomeRecommendations = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id; // Allow undefined for anonymous
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await recommendationService.getHomeRecommendations(userId, limit);
    res.status(200).json(new ApiResponse(200, result, 'Home recommendations retrieved'));
  });

  public getTrending = catchAsync(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await recommendationService.getTrending(limit);
    res.status(200).json(new ApiResponse(200, result, 'Trending papers retrieved'));
  });

  public getRelated = catchAsync(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 5;
    const result = await recommendationService.getRelatedPapers(req.params.paperId, limit);
    res.status(200).json(new ApiResponse(200, result, 'Related papers retrieved'));
  });

  public getCollaborative = catchAsync(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 5;
    const result = await recommendationService.getCollaborativeRecommendations(req.params.paperId, limit);
    res.status(200).json(new ApiResponse(200, result, 'Collaborative recommendations retrieved'));
  });

  public trackClick = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const { source } = req.body;
    
    await recommendationService.trackClick(userId, req.params.paperId, source);
    res.status(200).json(new ApiResponse(200, null, 'Click tracked'));
  });

}

export const recommendationController = new RecommendationController();
