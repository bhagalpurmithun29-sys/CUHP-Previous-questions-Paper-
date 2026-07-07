import { z } from 'zod';
import { ProgramType, CourseStatus, DurationUnit } from '../interfaces/course.interface';

export const createCourseSchema = z.object({
  body: z.object({
    courseName: z.string().min(3).max(150).trim(),
    courseCode: z.string().min(2).max(20).trim().toUpperCase(),
    shortName: z.string().max(50).trim().optional(),
    description: z.string().max(1000).trim().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID'),
    programType: z.nativeEnum(ProgramType).optional(),
    degree: z.string().max(100).trim().optional(),
    duration: z.number().min(0),
    durationUnit: z.nativeEnum(DurationUnit).optional(),
    totalSemesters: z.number().int().min(1),
    credits: z.number().min(0).optional(),
    medium: z.string().max(50).trim().optional(),
    admissionYear: z.number().int().min(1900).max(2100).optional(),
    courseCoordinator: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID').optional(),
    status: z.nativeEnum(CourseStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
    thumbnail: z.string().url().optional().or(z.literal('')),
  }),
});

export const updateCourseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID'),
  }),
  body: z.object({
    courseName: z.string().min(3).max(150).trim().optional(),
    courseCode: z.string().min(2).max(20).trim().toUpperCase().optional(),
    shortName: z.string().max(50).trim().optional(),
    description: z.string().max(1000).trim().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID').optional(),
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID').optional(),
    programType: z.nativeEnum(ProgramType).optional(),
    degree: z.string().max(100).trim().optional(),
    duration: z.number().min(0).optional(),
    durationUnit: z.nativeEnum(DurationUnit).optional(),
    totalSemesters: z.number().int().min(1).optional(),
    credits: z.number().min(0).optional(),
    medium: z.string().max(50).trim().optional(),
    admissionYear: z.number().int().min(1900).max(2100).optional(),
    courseCoordinator: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID').optional(),
    status: z.nativeEnum(CourseStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
    thumbnail: z.string().url().optional().or(z.literal('')),
  }),
});

export const getCourseSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID'),
  }),
});

export const getCoursesQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID').optional(),
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID').optional(),
    programType: z.nativeEnum(ProgramType).optional(),
    degree: z.string().optional(),
    status: z.nativeEnum(CourseStatus).optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});
