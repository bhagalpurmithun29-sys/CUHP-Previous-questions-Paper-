import { Request, Response } from 'express';
import { courseService } from '../services/course.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class CourseController {
  public createCourse = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const course = await courseService.createCourse(req.body, userId);
    
    return res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
  });

  public getCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await courseService.getCourses(req.query);
    return res.status(200).json(new ApiResponse(200, result, 'Courses retrieved successfully'));
  });

  public getCoursesBySchool = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, schoolId: req.params.schoolId };
    const result = await courseService.getCourses(query);
    return res.status(200).json(new ApiResponse(200, result, 'Courses retrieved successfully'));
  });

  public getCoursesByDepartment = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, departmentId: req.params.departmentId };
    const result = await courseService.getCourses(query);
    return res.status(200).json(new ApiResponse(200, result, 'Courses retrieved successfully'));
  });

  public getCourseById = catchAsync(async (req: Request, res: Response) => {
    const course = await courseService.getCourseById(req.params.id);
    return res.status(200).json(new ApiResponse(200, course, 'Course retrieved successfully'));
  });

  public updateCourse = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const course = await courseService.updateCourse(req.params.id, req.body, userId);
    
    return res.status(200).json(new ApiResponse(200, course, 'Course updated successfully'));
  });

  public deleteCourse = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    await courseService.deleteCourse(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, null, 'Course deleted successfully'));
  });
  
  public restoreCourse = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const course = await courseService.restoreCourse(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, course, 'Course restored successfully'));
  });
  
  public importCourses = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const result = await courseService.importCourses(req.file, userId);
    
    return res.status(200).json(new ApiResponse(200, result, 'Courses imported successfully'));
  });
  
  public exportCourses = catchAsync(async (req: Request, res: Response) => {
    const courses = await courseService.exportCourses(req.query);
    
    // Minimal mock for download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=courses.csv');
    return res.status(200).send(JSON.stringify(courses));
  });
}

export const courseController = new CourseController();
