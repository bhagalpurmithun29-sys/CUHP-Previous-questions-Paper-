import { z } from 'zod';
import { SemesterType, SemesterStatus } from '../interfaces/semester.interface';

const dateSchema = z.string().or(z.date()).transform((val) => new Date(val)).optional();

export const createSemesterSchema = z.object({
  body: z.object({
    semesterNumber: z.number().int().min(1),
    semesterName: z.string().max(100).trim().optional(),
    shortName: z.string().max(20).trim().optional(),
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID'),
    academicSession: z.string().max(50).trim().optional(),
    academicYear: z.string().max(20).trim().optional(),
    semesterType: z.nativeEnum(SemesterType).optional(),
    isOdd: z.boolean().optional(),
    displayOrder: z.number().int().min(0).optional(),
    credits: z.number().min(0).optional(),
    duration: z.number().min(0).optional(),
    startDate: dateSchema,
    endDate: dateSchema,
    registrationStart: dateSchema,
    registrationEnd: dateSchema,
    resultDeclarationDate: dateSchema,
    status: z.nativeEnum(SemesterStatus).optional(),
    isCurrentSemester: z.boolean().optional(),
  }).refine((data) => {
    if (data.startDate && data.endDate) {
      return data.startDate < data.endDate;
    }
    return true;
  }, { message: "Start date must be before end date", path: ["endDate"] })
    .refine((data) => {
    if (data.registrationStart && data.registrationEnd) {
      return data.registrationStart < data.registrationEnd;
    }
    return true;
  }, { message: "Registration start must be before registration end", path: ["registrationEnd"] })
});

export const updateSemesterSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Semester ID'),
  }),
  body: createSemesterSchema.shape.body.partial()
});

export const getSemesterSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Semester ID'),
  }),
});

export const getSemestersQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Course ID').optional(),
    academicSession: z.string().optional(),
    academicYear: z.string().optional(),
    semesterType: z.nativeEnum(SemesterType).optional(),
    isOdd: z.string().transform((val) => val === 'true').optional(),
    status: z.nativeEnum(SemesterStatus).optional(),
    isCurrentSemester: z.string().transform((val) => val === 'true').optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});
