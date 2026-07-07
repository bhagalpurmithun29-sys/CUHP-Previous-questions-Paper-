import { Request, Response } from 'express';
import { semesterService } from '../services/semester.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class SemesterController {
  public createSemester = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const semester = await semesterService.createSemester(req.body, userId);
    
    return res.status(201).json(new ApiResponse(201, semester, 'Semester created successfully'));
  });

  public getSemesters = catchAsync(async (req: Request, res: Response) => {
    const result = await semesterService.getSemesters(req.query);
    return res.status(200).json(new ApiResponse(200, result, 'Semesters retrieved successfully'));
  });

  public getSemestersByCourse = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, courseId: req.params.courseId };
    const result = await semesterService.getSemesters(query);
    return res.status(200).json(new ApiResponse(200, result, 'Semesters retrieved successfully'));
  });

  public getSemesterById = catchAsync(async (req: Request, res: Response) => {
    const semester = await semesterService.getSemesterById(req.params.id);
    return res.status(200).json(new ApiResponse(200, semester, 'Semester retrieved successfully'));
  });

  public updateSemester = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const semester = await semesterService.updateSemester(req.params.id, req.body, userId);
    
    return res.status(200).json(new ApiResponse(200, semester, 'Semester updated successfully'));
  });

  public deleteSemester = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    await semesterService.deleteSemester(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, null, 'Semester deleted successfully'));
  });
  
  public restoreSemester = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const semester = await semesterService.restoreSemester(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, semester, 'Semester restored successfully'));
  });
  
  public activateSemester = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const semester = await semesterService.activateSemester(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, semester, 'Semester activated successfully'));
  });
  
  public importSemesters = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const result = await semesterService.importSemesters(req.file, userId);
    
    return res.status(200).json(new ApiResponse(200, result, 'Semesters imported successfully'));
  });
  
  public exportSemesters = catchAsync(async (req: Request, res: Response) => {
    const semesters = await semesterService.exportSemesters(req.query);
    
    // Minimal mock for download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=semesters.csv');
    return res.status(200).send(JSON.stringify(semesters));
  });
}

export const semesterController = new SemesterController();
