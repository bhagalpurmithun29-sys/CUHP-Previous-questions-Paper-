import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/appError';
import { SchoolStatus } from '../../../interfaces/school.interface';
import { AuthAction } from '../../../enums/auth.enum';

export class SchoolService {
  async getAllSchools(query: any) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const filter: any = { isDeleted: false };
    
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { schoolName: { $regex: search, $options: 'i' } },
        { schoolCode: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const schools = await School.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await School.countDocuments(filter);

    return {
      schools,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getSchoolById(id: string) {
    const school = await School.findOne({ _id: id, isDeleted: false }).lean();
    if (!school) throw new AppError('School not found', 404);

    const departmentsCount = await Department.countDocuments({ schoolId: id, isDeleted: false });
    // Assuming we want more stats, we'd add courses, subjects here, but keeping it simple for now based on relations
    
    return { ...school, stats: { departmentsCount } };
  }

  async createSchool(data: any, userId: string, ip: string, userAgent: string) {
    const existingCode = await School.findOne({ schoolCode: data.schoolCode, isDeleted: false });
    if (existingCode) throw new AppError('School code already exists', 400);

    const existingName = await School.findOne({ schoolName: data.schoolName, isDeleted: false });
    if (existingName) throw new AppError('School name already exists', 400);

    const school = new School({
      ...data,
      createdBy: userId,
      updatedBy: userId
    });
    
    await school.save();

    await AuthAuditLog.create({
      userId,
      action: 'SCHOOL_CREATED' as any, // Adding custom action
      ipAddress: ip,
      userAgent,
      metadata: { schoolId: school._id, schoolCode: school.schoolCode }
    });

    return school;
  }

  async updateSchool(id: string, data: any, userId: string, ip: string, userAgent: string) {
    const school = await School.findOne({ _id: id, isDeleted: false });
    if (!school) throw new AppError('School not found', 404);

    if (data.schoolCode && data.schoolCode !== school.schoolCode) {
      const existingCode = await School.findOne({ schoolCode: data.schoolCode, isDeleted: false });
      if (existingCode) throw new AppError('School code already exists', 400);
    }
    
    if (data.schoolName && data.schoolName !== school.schoolName) {
      const existingName = await School.findOne({ schoolName: data.schoolName, isDeleted: false });
      if (existingName) throw new AppError('School name already exists', 400);
    }

    Object.assign(school, data);
    school.updatedBy = userId as any;
    await school.save();

    await AuthAuditLog.create({
      userId,
      action: 'SCHOOL_UPDATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { schoolId: school._id, changes: Object.keys(data) }
    });

    return school;
  }

  async archiveSchool(id: string, userId: string, ip: string, userAgent: string) {
    const school = await School.findOne({ _id: id, isDeleted: false });
    if (!school) throw new AppError('School not found', 404);

    school.status = SchoolStatus.ARCHIVED;
    school.updatedBy = userId as any;
    await school.save();

    await AuthAuditLog.create({
      userId,
      action: 'SCHOOL_ARCHIVED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { schoolId: school._id }
    });

    return school;
  }

  async restoreSchool(id: string, userId: string, ip: string, userAgent: string) {
    const school = await School.findOne({ _id: id, isDeleted: false });
    if (!school) throw new AppError('School not found', 404);

    school.status = SchoolStatus.ACTIVE;
    school.updatedBy = userId as any;
    await school.save();

    await AuthAuditLog.create({
      userId,
      action: 'SCHOOL_RESTORED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { schoolId: school._id }
    });

    return school;
  }

  async deleteSchool(id: string, userId: string, ip: string, userAgent: string) {
    const school = await School.findOne({ _id: id, isDeleted: false });
    if (!school) throw new AppError('School not found', 404);

    const activeDepartments = await Department.countDocuments({ schoolId: id, isDeleted: false });
    if (activeDepartments > 0) {
      throw new AppError('Cannot delete school with active departments', 400);
    }

    // Soft delete
    school.isDeleted = true;
    school.updatedBy = userId as any;
    await school.save();

    await AuthAuditLog.create({
      userId,
      action: 'SCHOOL_DELETED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { schoolId: school._id }
    });

    return { message: 'School deleted successfully' };
  }
}

export const schoolService = new SchoolService();
