import { Request, Response } from 'express';
import { subjectService } from '../services/subject.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class SubjectController {
  public createSubject = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const subject = await subjectService.createSubject(req.body, userId);
    
    return res.status(201).json(new ApiResponse(201, subject, 'Subject created successfully'));
  });

  public getSubjects = catchAsync(async (req: Request, res: Response) => {
    const result = await subjectService.getSubjects(req.query);
    return res.status(200).json(new ApiResponse(200, result, 'Subjects retrieved successfully'));
  });

  public getSubjectsByCourse = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, courseId: req.params.courseId };
    const result = await subjectService.getSubjects(query);
    return res.status(200).json(new ApiResponse(200, result, 'Subjects retrieved successfully'));
  });
  
  public getSubjectsBySemester = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, semesterId: req.params.semesterId };
    const result = await subjectService.getSubjects(query);
    return res.status(200).json(new ApiResponse(200, result, 'Subjects retrieved successfully'));
  });

  public getSubjectById = catchAsync(async (req: Request, res: Response) => {
    const subject = await subjectService.getSubjectById(req.params.id);
    return res.status(200).json(new ApiResponse(200, subject, 'Subject retrieved successfully'));
  });

  public updateSubject = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const subject = await subjectService.updateSubject(req.params.id, req.body, userId);
    
    return res.status(200).json(new ApiResponse(200, subject, 'Subject updated successfully'));
  });

  public deleteSubject = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    await subjectService.deleteSubject(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, null, 'Subject deleted successfully'));
  });
  
  public restoreSubject = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const subject = await subjectService.restoreSubject(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, subject, 'Subject restored successfully'));
  });
  
  public duplicateSubject = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const subject = await subjectService.duplicateSubject(req.params.id, userId);
    
    return res.status(201).json(new ApiResponse(201, subject, 'Subject duplicated successfully'));
  });
  
  public importSubjects = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const result = await subjectService.importSubjects(req.file, userId);
    
    return res.status(200).json(new ApiResponse(200, result, 'Subjects imported successfully'));
  });
  
  public exportSubjects = catchAsync(async (req: Request, res: Response) => {
    const subjects = await subjectService.exportSubjects(req.query);
    
    // Minimal mock for download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subjects.csv');
    return res.status(200).send(JSON.stringify(subjects));
  });
}

export const subjectController = new SubjectController();
