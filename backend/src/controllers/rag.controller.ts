import { Request, Response } from 'express';
import { knowledgeService } from '../services/rag/KnowledgeService';
import { AppError } from '../utils/AppError';

export class RagController {
  async query(req: Request, res: Response) {
    try {
      const { question } = req.body;
      const userId = req.user!.id;

      if (!question) throw new AppError('Question is required', 400);

      const result = await knowledgeService.query(question, userId);
      
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

  async reindex(req: Request, res: Response) {
    try {
      const { paperId } = req.body;
      if (!paperId) throw new AppError('Paper ID is required', 400);

      const result = await knowledgeService.reindexPaper(paperId);
      
      res.status(200).json({
        status: 'success',
        message: 'Reindexing triggered',
        data: result
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
      const status = await knowledgeService.getStatus();
      
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
}

export const ragController = new RagController();
