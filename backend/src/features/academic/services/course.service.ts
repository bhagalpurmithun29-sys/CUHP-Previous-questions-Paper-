import { Course } from '../../../models/course.model';
import { Department } from '../../../models/department.model';
import { Semester } from '../../../models/semester.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/appError';

export class CourseService {
  async getAllCourses(query: any) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      departmentId,
      schoolId,
      degree,
      programType,
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (departmentId) filter.departmentId = departmentId;
    if (schoolId) filter.schoolId = schoolId;
    if (degree) filter.degree = degree;
    if (programType) filter.programType = programType;

    if (search) {
      filter.$or = [
        { courseName: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
        { degree: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const courses = await Course.find(filter)
      .populate('departmentId', 'departmentName departmentCode')
      .populate('schoolId', 'schoolName schoolCode')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Course.countDocuments(filter);

    return {
      courses,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getCourseById(id: string) {
    const course = await Course.findOne({ _id: id, isDeleted: false })
      .populate('departmentId', 'departmentName departmentCode')
      .populate('schoolId', 'schoolName schoolCode')
      .lean();
    
    if (!course) throw new AppError('Course not found', 404);

    const semestersCount = await Semester.countDocuments({ courseId: id, isDeleted: false });
    
    return { ...course, stats: { semestersCount } };
  }

  async createCourse(data: any, userId: string, ip: string, userAgent: string) {
    // Validate department
    const department = await Department.findOne({ _id: data.departmentId, isDeleted: false });
    if (!department) throw new AppError('Invalid Department ID. Department not found or deleted.', 400);

    const existingCode = await Course.findOne({ courseCode: data.courseCode, isDeleted: false });
    if (existingCode) throw new AppError('Course code already exists', 400);

    const existingName = await Course.findOne({ 
      courseName: data.courseName, 
      departmentId: data.departmentId,
      isDeleted: false 
    });
    if (existingName) throw new AppError('Course name already exists in this department', 400);

    // Number of semesters validation
    if (data.totalSemesters < 1 || data.totalSemesters > 20) {
      throw new AppError('Invalid number of semesters', 400);
    }

    const course = new Course({
      ...data,
      schoolId: department.schoolId, // Derived implicitly
      createdBy: userId,
      updatedBy: userId
    });
    
    await course.save();

    await AuthAuditLog.create({
      userId,
      action: 'COURSE_CREATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { courseId: course._id, courseCode: course.courseCode, departmentId: department._id }
    });

    return course;
  }

  async updateCourse(id: string, data: any, userId: string, ip: string, userAgent: string) {
    const course = await Course.findOne({ _id: id, isDeleted: false });
    if (!course) throw new AppError('Course not found', 404);

    if (data.departmentId && data.departmentId.toString() !== course.departmentId.toString()) {
      const department = await Department.findOne({ _id: data.departmentId, isDeleted: false });
      if (!department) throw new AppError('Invalid Department ID. Department not found or deleted.', 400);
      data.schoolId = department.schoolId; // Update derived school if department changes
    }

    if (data.courseCode && data.courseCode !== course.courseCode) {
      const existingCode = await Course.findOne({ courseCode: data.courseCode, isDeleted: false });
      if (existingCode) throw new AppError('Course code already exists', 400);
    }
    
    if (data.courseName && data.courseName !== course.courseName) {
      const deptIdToCheck = data.departmentId || course.departmentId;
      const existingName = await Course.findOne({ 
        courseName: data.courseName, 
        departmentId: deptIdToCheck,
        isDeleted: false 
      });
      if (existingName) throw new AppError('Course name already exists in this department', 400);
    }

    Object.assign(course, data);
    course.updatedBy = userId as any;
    await course.save();

    await AuthAuditLog.create({
      userId,
      action: 'COURSE_UPDATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { courseId: course._id, changes: Object.keys(data) }
    });

    return course;
  }

  async archiveCourse(id: string, userId: string, ip: string, userAgent: string) {
    const course = await Course.findOne({ _id: id, isDeleted: false });
    if (!course) throw new AppError('Course not found', 404);

    course.status = 'ARCHIVED' as any;
    course.updatedBy = userId as any;
    await course.save();

    await AuthAuditLog.create({
      userId,
      action: 'COURSE_ARCHIVED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { courseId: course._id }
    });

    return course;
  }

  async restoreCourse(id: string, userId: string, ip: string, userAgent: string) {
    const course = await Course.findOne({ _id: id, isDeleted: false });
    if (!course) throw new AppError('Course not found', 404);

    course.status = 'ACTIVE' as any;
    course.updatedBy = userId as any;
    await course.save();

    await AuthAuditLog.create({
      userId,
      action: 'COURSE_RESTORED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { courseId: course._id }
    });

    return course;
  }

  async deleteCourse(id: string, userId: string, ip: string, userAgent: string) {
    const course = await Course.findOne({ _id: id, isDeleted: false });
    if (!course) throw new AppError('Course not found', 404);

    const activeSemesters = await Semester.countDocuments({ courseId: id, isDeleted: false });
    if (activeSemesters > 0) {
      throw new AppError('Cannot delete course with active semesters', 400);
    }

    course.isDeleted = true;
    course.updatedBy = userId as any;
    await course.save();

    await AuthAuditLog.create({
      userId,
      action: 'COURSE_DELETED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { courseId: course._id }
    });

    return { message: 'Course deleted successfully' };
  }
}

export const courseService = new CourseService();
