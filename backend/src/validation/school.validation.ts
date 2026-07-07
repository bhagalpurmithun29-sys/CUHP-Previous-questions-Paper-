import { z } from 'zod';
import { SchoolStatus } from '../interfaces/school.interface';

export const createSchoolSchema = z.object({
  body: z.object({
    schoolName: z.string().min(3).max(100).trim(),
    shortName: z.string().max(20).trim().optional(),
    schoolCode: z.string().min(2).max(10).trim().toUpperCase(),
    description: z.string().max(1000).trim().optional(),
    deanName: z.string().max(100).trim().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().max(20).trim().optional(),
    website: z.string().url().max(200).optional().or(z.literal('')),
    logo: z.string().url().optional().or(z.literal('')),
    status: z.nativeEnum(SchoolStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
  }),
});

export const updateSchoolSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
  }),
  body: z.object({
    schoolName: z.string().min(3).max(100).trim().optional(),
    shortName: z.string().max(20).trim().optional(),
    schoolCode: z.string().min(2).max(10).trim().toUpperCase().optional(),
    description: z.string().max(1000).trim().optional(),
    deanName: z.string().max(100).trim().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().max(20).trim().optional(),
    website: z.string().url().max(200).optional().or(z.literal('')),
    logo: z.string().url().optional().or(z.literal('')),
    status: z.nativeEnum(SchoolStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
  }),
});

export const getSchoolSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
  }),
});

export const getSchoolsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    status: z.nativeEnum(SchoolStatus).optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});
