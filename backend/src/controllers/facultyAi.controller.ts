import { Request, Response } from 'express';
import { facultyAIService } from '../services/ai/faculty/FacultyAIService';
import { AppError } from '../utils/AppError';

export class FacultyAIController {
  async generateQuestions(req: Request, res: Response) {
    try {
      const dto = req.body;
      const userId = req.user!.id;

      if (!dto.subject || !dto.topic) throw new AppError('Subject and topic are required', 400);

      const result = await facultyAIService.generateQuestions(dto, userId);
      
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

  async analyzePaper(req: Request, res: Response) {
    try {
      const { questions, subject } = req.body;
      const userId = req.user!.id;

      if (!questions || !subject) throw new AppError('Questions and subject are required', 400);

      const result = await facultyAIService.analyzePaper(questions, subject, userId);
      
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

  async generateRubric(req: Request, res: Response) {
    try {
      const { questions } = req.body;
      const userId = req.user!.id;

      if (!questions) throw new AppError('Questions are required', 400);

      const result = await facultyAIService.generateRubric(questions, userId);
      
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

export const facultyAIController = new FacultyAIController();
