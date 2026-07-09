import { Request, Response } from 'express';
import { studyPlannerService } from '../services/studyPlanner.service';

export class StudyPlannerController {
  async generatePlan(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const plan = await studyPlannerService.generatePlan(userId, req.body);
      
      res.status(201).json({
        status: 'success',
        data: plan
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getActivePlan(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const plan = await studyPlannerService.getActivePlan(userId);
      
      res.status(200).json({
        status: 'success',
        data: plan
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async updateTaskProgress(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { planId, taskId, status } = req.body;
      const plan = await studyPlannerService.updateTaskStatus(userId, planId, taskId, status);
      
      res.status(200).json({
        status: 'success',
        data: plan
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getRecommendations(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const papers = await studyPlannerService.getRecommendations(userId);
      
      res.status(200).json({
        status: 'success',
        data: papers
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export const studyPlannerController = new StudyPlannerController();
