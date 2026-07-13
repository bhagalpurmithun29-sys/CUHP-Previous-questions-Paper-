import { Request, Response } from 'express';
import { learningPlanService } from '../services/studyPlanner/learningPlan.service';
import { revisionService } from '../services/studyPlanner/revision.service';
import { goalManagementService } from '../services/studyPlanner/goalManagement.service';
import { recommendationService } from '../services/studyPlanner/recommendation.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class StudyPlannerController {
  getDashboard = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await learningPlanService.getDashboardData(userId);
    res.status(200).json(new ApiResponse(200, data, 'Dashboard data retrieved'));
  });

  getWeekly = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await learningPlanService.getWeeklyPlan(userId);
    res.status(200).json(new ApiResponse(200, data, 'Weekly plan retrieved'));
  });

  getMonthly = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await learningPlanService.getMonthlyPlan(userId);
    res.status(200).json(new ApiResponse(200, data, 'Monthly plan retrieved'));
  });

  getRevision = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await revisionService.getRevisionPlan(userId);
    res.status(200).json(new ApiResponse(200, data, 'Revision plan retrieved'));
  });

  createGoal = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await goalManagementService.createGoal(userId, req.body);
    res.status(201).json(new ApiResponse(201, data, 'Goal created'));
  });

  updateGoal = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { goalId } = req.params;
    const data = await goalManagementService.updateGoal(userId, goalId, req.body);
    res.status(200).json(new ApiResponse(200, data, 'Goal updated'));
  });

  deleteGoal = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { goalId } = req.params;
    await goalManagementService.deleteGoal(userId, goalId);
    res.status(200).json(new ApiResponse(200, null, 'Goal deleted'));
  });

  getRecommendations = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await recommendationService.getRecommendations(userId);
    res.status(200).json(new ApiResponse(200, data, 'Recommendations retrieved'));
  });
}

export const studyPlannerController = new StudyPlannerController();
