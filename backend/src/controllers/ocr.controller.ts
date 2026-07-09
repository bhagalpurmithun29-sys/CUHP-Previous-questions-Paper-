import { Request, Response } from 'express';
import { ocrService } from '../services/ai/OcrService';
import { AppError } from '../utils/AppError';

export class OcrController {
  async processPaper(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const userId = req.user!.id;
      
      const job = await ocrService.processPaper(paperId, userId);
      
      res.status(202).json({
        status: 'success',
        message: 'OCR Processing initiated',
        data: job
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getStatus(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const status = await ocrService.getStatus(paperId);
      
      res.status(200).json({
        status: 'success',
        data: status
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getResult(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const result = await ocrService.getResult(paperId);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async updateReview(req: Request, res: Response) {
    try {
      const { paperId } = req.params;
      const moderatorId = req.user!.id;
      
      const result = await ocrService.updateReview(paperId, moderatorId, req.body);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

export const ocrController = new OcrController();
