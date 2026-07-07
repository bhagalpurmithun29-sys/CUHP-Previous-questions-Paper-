import { z } from 'zod';
import { DepartmentStatus } from '../interfaces/department.interface';

export const createDepartmentSchema = z.object({
  body: z.object({
    departmentName: z.string().min(3).max(150).trim(),
    departmentCode: z.string().min(2).max(20).trim().toUpperCase(),
    shortName: z.string().max(50).trim().optional(),
    description: z.string().max(1000).trim().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
    hodName: z.string().max(100).trim().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().max(20).trim().optional(),
    website: z.string().url().max(200).optional().or(z.literal('')),
    logo: z.string().url().optional().or(z.literal('')),
    officeLocation: z.string().max(200).trim().optional(),
    status: z.nativeEnum(DepartmentStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
  }),
});

export const updateDepartmentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID'),
  }),
  body: z.object({
    departmentName: z.string().min(3).max(150).trim().optional(),
    departmentCode: z.string().min(2).max(20).trim().toUpperCase().optional(),
    shortName: z.string().max(50).trim().optional(),
    description: z.string().max(1000).trim().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID').optional(),
    hodName: z.string().max(100).trim().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().max(20).trim().optional(),
    website: z.string().url().max(200).optional().or(z.literal('')),
    logo: z.string().url().optional().or(z.literal('')),
    officeLocation: z.string().max(200).trim().optional(),
    status: z.nativeEnum(DepartmentStatus).optional(),
    displayOrder: z.number().int().min(0).optional(),
  }),
});

export const getDepartmentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Department ID'),
  }),
});

export const getDepartmentsBySchoolSchema = z.object({
  params: z.object({
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID'),
  }),
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
  })
});

export const getDepartmentsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    schoolId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid School ID').optional(),
    status: z.nativeEnum(DepartmentStatus).optional(),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});
