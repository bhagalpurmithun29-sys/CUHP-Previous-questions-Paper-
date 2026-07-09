import { Request, Response } from 'express';
import { revisionService } from '../services/ai/RevisionService';
import { AppError } from '../utils/AppError';

export class RevisionController {
  async getDashboard(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { subjectId } = req.query;

      if (!subjectId) throw new AppError('Subject ID is required', 400);

      const revision = await revisionService.initializeRevision(userId, subjectId as string);
      
      res.status(200).json({
        status: 'success',
        data: revision
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async updateProgress(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { subjectId, topicName, confidence, isCompleted } = req.body;

      const revision = await revisionService.updateProgress(userId, subjectId, topicName, confidence, isCompleted);
      
      res.status(200).json({
        status: 'success',
        data: revision
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async generateLastMinutePlan(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { subjectId, mode } = req.body;

      const plan = await revisionService.generateLastMinutePlan(userId, subjectId, mode);
      
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
      const { subjectId } = req.query;

      if (!subjectId) throw new AppError('Subject ID is required', 400);

      const recommendations = await revisionService.getRecommendations(userId, subjectId as string);
      
      res.status(200).json({
        status: 'success',
        data: recommendations
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export const revisionController = new RevisionController();
