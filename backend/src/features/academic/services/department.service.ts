import { Department } from '../../../models/department.model';
import { School } from '../../../models/school.model';
import { Course } from '../../../models/course.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/AppError';
import { SchoolStatus } from '../../../interfaces/school.interface'; // Re-use enum if available or use string literals
import mongoose from 'mongoose';

export class DepartmentService {
  async getAllDepartments(query: any) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      schoolId,
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (schoolId) filter.schoolId = schoolId;

    if (search) {
      filter.$or = [
        { departmentName: { $regex: search, $options: 'i' } },
        { departmentCode: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const departments = await Department.find(filter)
      .populate('schoolId', 'schoolName schoolCode status')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Department.countDocuments(filter);

    return {
      departments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getDepartmentById(id: string) {
    const department = await Department.findOne({ _id: id, isDeleted: false })
      .populate('schoolId', 'schoolName schoolCode')
      .lean();
    if (!department) throw new AppError('Department not found', 404);

    const coursesCount = await Course.countDocuments({ department: id, isDeleted: false });
    
    return { ...department, stats: { coursesCount } };
  }

  async createDepartment(data: any, userId: string, ip: string, userAgent: string) {
    // Validate school
    const school = await School.findOne({ _id: data.schoolId, isDeleted: false });
    if (!school) throw new AppError('Invalid School ID. School not found or deleted.', 400);

    const existingCode = await Department.findOne({ departmentCode: data.departmentCode, isDeleted: false });
    if (existingCode) throw new AppError('Department code already exists', 400);

    const existingName = await Department.findOne({ 
      departmentName: data.departmentName, 
      schoolId: data.schoolId,
      isDeleted: false 
    });
    if (existingName) throw new AppError('Department name already exists in this school', 400);

    const department = new Department({
      ...data,
      createdBy: userId,
      updatedBy: userId
    });
    
    await department.save();

    await AuthAuditLog.create({
      userId,
      action: 'DEPARTMENT_CREATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { departmentId: department._id, departmentCode: department.departmentCode, schoolId: school._id }
    });

    return department;
  }

  async updateDepartment(id: string, data: any, userId: string, ip: string, userAgent: string) {
    const department = await Department.findOne({ _id: id, isDeleted: false });
    if (!department) throw new AppError('Department not found', 404);

    if (data.schoolId && data.schoolId.toString() !== department.schoolId.toString()) {
      const school = await School.findOne({ _id: data.schoolId, isDeleted: false });
      if (!school) throw new AppError('Invalid School ID. School not found or deleted.', 400);
    }

    if (data.departmentCode && data.departmentCode !== department.departmentCode) {
      const existingCode = await Department.findOne({ departmentCode: data.departmentCode, isDeleted: false });
      if (existingCode) throw new AppError('Department code already exists', 400);
    }
    
    if (data.departmentName && data.departmentName !== department.departmentName) {
      const schoolIdToCheck = data.schoolId || department.schoolId;
      const existingName = await Department.findOne({ 
        departmentName: data.departmentName, 
        schoolId: schoolIdToCheck,
        isDeleted: false 
      });
      if (existingName) throw new AppError('Department name already exists in this school', 400);
    }

    Object.assign(department, data);
    department.updatedBy = userId as any;
    await department.save();

    await AuthAuditLog.create({
      userId,
      action: 'DEPARTMENT_UPDATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { departmentId: department._id, changes: Object.keys(data) }
    });

    return department;
  }

  async archiveDepartment(id: string, userId: string, ip: string, userAgent: string) {
    const department = await Department.findOne({ _id: id, isDeleted: false });
    if (!department) throw new AppError('Department not found', 404);

    department.status = 'ARCHIVED' as any;
    department.updatedBy = userId as any;
    await department.save();

    await AuthAuditLog.create({
      userId,
      action: 'DEPARTMENT_ARCHIVED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { departmentId: department._id }
    });

    return department;
  }

  async restoreDepartment(id: string, userId: string, ip: string, userAgent: string) {
    const department = await Department.findOne({ _id: id, isDeleted: false });
    if (!department) throw new AppError('Department not found', 404);

    department.status = 'ACTIVE' as any;
    department.updatedBy = userId as any;
    await department.save();

    await AuthAuditLog.create({
      userId,
      action: 'DEPARTMENT_RESTORED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { departmentId: department._id }
    });

    return department;
  }

  async deleteDepartment(id: string, userId: string, ip: string, userAgent: string) {
    const department = await Department.findOne({ _id: id, isDeleted: false });
    if (!department) throw new AppError('Department not found', 404);

    const activeCourses = await Course.countDocuments({ department: id, isDeleted: false });
    if (activeCourses > 0) {
      throw new AppError('Cannot delete department with active courses', 400);
    }

    department.isDeleted = true;
    department.updatedBy = userId as any;
    await department.save();

    await AuthAuditLog.create({
      userId,
      action: 'DEPARTMENT_DELETED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { departmentId: department._id }
    });

    return { message: 'Department deleted successfully' };
  }
}

export const departmentService = new DepartmentService();
