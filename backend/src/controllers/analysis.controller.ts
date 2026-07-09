import { Request, Response } from 'express';
import { analysisService } from '../services/ai/AnalysisService';
import { AppError } from '../utils/AppError';

export class AnalysisController {
  async getAnalysis(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const analysis = await analysisService.getAnalysis(paperId);

      if (!analysis) {
        return res.status(200).json({
          status: 'success',
          data: null,
          message: 'Analysis not found'
        });
      }

      res.status(200).json({
        status: 'success',
        data: analysis
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async triggerReanalysis(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const analysis = await analysisService.triggerAnalysis(paperId);

      res.status(202).json({
        status: 'success',
        message: 'Analysis triggered successfully',
        data: analysis
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getSubjectAnalysis(req: Request, res: Response) {
    try {
      const { subjectId } = req.params;
      const data = await analysisService.getSubjectAnalysis(subjectId);

      res.status(200).json({
        status: 'success',
        data
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export const analysisController = new AnalysisController();
