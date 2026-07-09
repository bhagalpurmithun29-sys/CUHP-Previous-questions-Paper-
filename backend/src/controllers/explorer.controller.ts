import { Request, Response, NextFunction } from 'express';
import { explorerService } from '../services/explorer.service';
import { GetPapersDto } from '../dtos/explorer.dto';

export const explorerController = {
  getPapers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: GetPapersDto = {
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 12,
        search: req.query.search as string,
        schoolId: req.query.schoolId as string,
        departmentId: req.query.departmentId as string,
        courseId: req.query.courseId as string,
        semesterId: req.query.semesterId as string,
        subjectId: req.query.subjectId as string,
        academicYear: req.query.academicYear as string,
        examType: req.query.examType as string,
        language: req.query.language as string,
        sort: req.query.sort as string,
      };

      const result = await explorerService.getPublicPapers(filters);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getPaperDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paperId = req.params.id;
      const paper = await explorerService.getPaperDetails(paperId);
      res.status(200).json(paper);
    } catch (error) {
      res.status(404).json({ message: 'Paper not found' });
    }
  }
};
