import { Semester } from '../../../models/semester.model';
import { Course } from '../../../models/course.model';
import { Subject } from '../../../models/subject.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/appError';

export class SemesterService {
  async getAllSemesters(query: any) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      courseId,
      academicSession,
      isCurrentSemester,
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    if (academicSession) filter.academicSession = academicSession;
    if (isCurrentSemester !== undefined) filter.isCurrentSemester = isCurrentSemester === 'true';

    if (search) {
      filter.$or = [
        { semesterName: { $regex: search, $options: 'i' } },
        { academicYear: { $regex: search, $options: 'i' } },
        { academicSession: { $regex: search, $options: 'i' } }
      ];
      if (!isNaN(Number(search))) {
        filter.$or.push({ semesterNumber: Number(search) });
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const semesters = await Semester.find(filter)
      .populate({
        path: 'courseId',
        select: 'courseName courseCode departmentId schoolId',
        populate: [
          { path: 'departmentId', select: 'departmentName' },
          { path: 'schoolId', select: 'schoolName' }
        ]
      })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Semester.countDocuments(filter);

    return {
      semesters,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getSemesterById(id: string) {
    const semester = await Semester.findOne({ _id: id, isDeleted: false })
      .populate({
        path: 'courseId',
        select: 'courseName courseCode departmentId schoolId',
        populate: [
          { path: 'departmentId', select: 'departmentName' },
          { path: 'schoolId', select: 'schoolName' }
        ]
      })
      .lean();
    
    if (!semester) throw new AppError('Semester not found', 404);

    const subjectsCount = await Subject.countDocuments({ semesterId: id, isDeleted: false });
    
    return { ...semester, stats: { subjectsCount } };
  }

  async createSemester(data: any, userId: string, ip: string, userAgent: string) {
    // Validate course
    const course = await Course.findOne({ _id: data.courseId, isDeleted: false });
    if (!course) throw new AppError('Invalid Course ID. Course not found or deleted.', 400);

    // Validate semester number against course's total semesters
    if (data.semesterNumber > course.totalSemesters) {
      throw new AppError(`Semester number cannot exceed course's total semesters (${course.totalSemesters})`, 400);
    }

    const existingNumber = await Semester.findOne({ 
      semesterNumber: data.semesterNumber, 
      courseId: data.courseId,
      isDeleted: false 
    });
    if (existingNumber) throw new AppError('Semester number already exists for this course', 400);

    if (data.isCurrentSemester) {
      // Unset any other current semester for this course if this one is set as current
      await Semester.updateMany(
        { courseId: data.courseId, isDeleted: false },
        { isCurrentSemester: false }
      );
    }

    const semester = new Semester({
      ...data,
      isOdd: data.semesterNumber % 2 !== 0,
      createdBy: userId,
      updatedBy: userId
    });
    
    await semester.save();

    await AuthAuditLog.create({
      userId,
      action: 'SEMESTER_CREATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { semesterId: semester._id, semesterNumber: semester.semesterNumber, courseId: course._id }
    });

    return semester;
  }

  async updateSemester(id: string, data: any, userId: string, ip: string, userAgent: string) {
    const semester = await Semester.findOne({ _id: id, isDeleted: false });
    if (!semester) throw new AppError('Semester not found', 404);

    if (data.courseId && data.courseId.toString() !== semester.courseId.toString()) {
      const course = await Course.findOne({ _id: data.courseId, isDeleted: false });
      if (!course) throw new AppError('Invalid Course ID. Course not found or deleted.', 400);
      
      if (data.semesterNumber && data.semesterNumber > course.totalSemesters) {
        throw new AppError(`Semester number cannot exceed course's total semesters (${course.totalSemesters})`, 400);
      } else if (!data.semesterNumber && semester.semesterNumber > course.totalSemesters) {
        throw new AppError(`Current semester number exceeds new course's total semesters (${course.totalSemesters})`, 400);
      }
    }

    if (data.semesterNumber && data.semesterNumber !== semester.semesterNumber) {
      const courseIdToCheck = data.courseId || semester.courseId;
      const existingNumber = await Semester.findOne({ 
        semesterNumber: data.semesterNumber, 
        courseId: courseIdToCheck,
        isDeleted: false 
      });
      if (existingNumber) throw new AppError('Semester number already exists for this course', 400);
      
      data.isOdd = data.semesterNumber % 2 !== 0;
    }

    if (data.isCurrentSemester && !semester.isCurrentSemester) {
      // Unset any other current semester for this course if this one is set as current
      const courseIdToCheck = data.courseId || semester.courseId;
      await Semester.updateMany(
        { courseId: courseIdToCheck, isDeleted: false, _id: { $ne: id } },
        { isCurrentSemester: false }
      );
    }

    Object.assign(semester, data);
    semester.updatedBy = userId as any;
    await semester.save();

    await AuthAuditLog.create({
      userId,
      action: 'SEMESTER_UPDATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { semesterId: semester._id, changes: Object.keys(data) }
    });

    return semester;
  }

  async archiveSemester(id: string, userId: string, ip: string, userAgent: string) {
    const semester = await Semester.findOne({ _id: id, isDeleted: false });
    if (!semester) throw new AppError('Semester not found', 404);

    semester.status = 'ARCHIVED' as any;
    semester.updatedBy = userId as any;
    await semester.save();

    await AuthAuditLog.create({
      userId,
      action: 'SEMESTER_ARCHIVED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { semesterId: semester._id }
    });

    return semester;
  }

  async restoreSemester(id: string, userId: string, ip: string, userAgent: string) {
    const semester = await Semester.findOne({ _id: id, isDeleted: false });
    if (!semester) throw new AppError('Semester not found', 404);

    semester.status = 'UPCOMING' as any;
    semester.updatedBy = userId as any;
    await semester.save();

    await AuthAuditLog.create({
      userId,
      action: 'SEMESTER_RESTORED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { semesterId: semester._id }
    });

    return semester;
  }

  async deleteSemester(id: string, userId: string, ip: string, userAgent: string) {
    const semester = await Semester.findOne({ _id: id, isDeleted: false });
    if (!semester) throw new AppError('Semester not found', 404);

    const activeSubjects = await Subject.countDocuments({ semesterId: id, isDeleted: false });
    if (activeSubjects > 0) {
      throw new AppError('Cannot delete semester with active subjects', 400);
    }

    semester.isDeleted = true;
    semester.updatedBy = userId as any;
    await semester.save();

    await AuthAuditLog.create({
      userId,
      action: 'SEMESTER_DELETED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { semesterId: semester._id }
    });

    return { message: 'Semester deleted successfully' };
  }
}

export const semesterService = new SemesterService();
