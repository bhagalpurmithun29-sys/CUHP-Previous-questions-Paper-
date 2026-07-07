import { Request, Response } from 'express';
import { schoolService } from '../services/school.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class SchoolController {
  public createSchool = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore - Assuming req.user is set by auth middleware
    const userId = req.user?.id;
    const school = await schoolService.createSchool(req.body, userId);
    
    return res.status(201).json(new ApiResponse(201, school, 'School created successfully'));
  });

  public getSchools = catchAsync(async (req: Request, res: Response) => {
    const result = await schoolService.getSchools(req.query);
    return res.status(200).json(new ApiResponse(200, result, 'Schools retrieved successfully'));
  });

  public getSchoolById = catchAsync(async (req: Request, res: Response) => {
    const school = await schoolService.getSchoolById(req.params.id);
    return res.status(200).json(new ApiResponse(200, school, 'School retrieved successfully'));
  });

  public updateSchool = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const school = await schoolService.updateSchool(req.params.id, req.body, userId);
    
    return res.status(200).json(new ApiResponse(200, school, 'School updated successfully'));
  });

  public deleteSchool = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    await schoolService.deleteSchool(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, null, 'School deleted successfully'));
  });
  
  public restoreSchool = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const school = await schoolService.restoreSchool(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, school, 'School restored successfully'));
  });
}

export const schoolController = new SchoolController();
