import { Request, Response } from 'express';
import { executiveAIService } from '../services/ai/executive/ExecutiveAIService';
import { AppError } from '../utils/AppError';

export class ExecutiveController {
  async getDashboard(req: Request, res: Response) {
    try {
      const data = await executiveAIService.getDashboardData();
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async getInsights(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const data = await executiveAIService.getInsights(userId);
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async generateReport(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { format } = req.body;
      const data = await executiveAIService.generateReport(userId, format || 'PDF');
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
}

export const executiveController = new ExecutiveController();
