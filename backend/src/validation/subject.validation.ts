import { z } from 'zod';
import { SubjectType, DeliveryMode, SubjectStatus } from '../interfaces/subject.interface';

export const createSubjectSchema = z.object({
  body: z.object({
    subjectName: z.string().min(2).max(150).trim(),
    subjectCode: z.string().min(2).max(30).trim().toUpperCase(),
    shortName: z.string().max(50).trim().optional(),
    description: z.string().max(1500).trim().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID'),
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID'),
    semesterId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Semester ID'),
    credits: z.number().min(0),
    lectureHours: z.number().min(0).optional(),
    tutorialHours: z.number().min(0).optional(),
    practicalHours: z.number().min(0).optional(),
    totalHours: z.number().min(0),
    subjectType: z.nativeEnum(SubjectType),
    deliveryMode: z.array(z.nativeEnum(DeliveryMode)).min(1, 'At least one delivery mode is required'),
    language: z.string().max(50).trim().optional(),
    prerequisiteSubjects: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID')).optional(),
    status: z.nativeEnum(SubjectStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
    syllabusPdf: z.string().url().optional().or(z.literal('')),
    referenceBooks: z.array(z.string().trim()).optional(),
  }),
});

export const updateSubjectSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID'),
  }),
  body: createSubjectSchema.shape.body.partial(),
});

export const getSubjectSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID'),
  }),
});

export const getSubjectsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID').optional(),
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID').optional(),
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID').optional(),
    semesterId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Semester ID').optional(),
    credits: z.string().regex(/^\d+$/).optional().transform(Number),
    subjectType: z.nativeEnum(SubjectType).optional(),
    deliveryMode: z.union([z.nativeEnum(DeliveryMode), z.array(z.nativeEnum(DeliveryMode))]).optional(),
    status: z.nativeEnum(SubjectStatus).optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});
