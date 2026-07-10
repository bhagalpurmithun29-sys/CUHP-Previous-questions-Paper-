import { Subject } from '../../../models/subject.model';
import { Semester } from '../../../models/semester.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/AppError';
import mongoose from 'mongoose';

export class SubjectService {
  async getAllSubjects(query: any) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      semesterId,
      courseId,
      departmentId,
      schoolId,
      subjectType,
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (semesterId) filter.semesterId = semesterId;
    if (courseId) filter.courseId = courseId;
    if (departmentId) filter.departmentId = departmentId;
    if (schoolId) filter.schoolId = schoolId;
    if (subjectType) filter.subjectType = subjectType;

    if (search) {
      filter.$or = [
        { subjectName: { $regex: search, $options: 'i' } },
        { subjectCode: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const subjects = await Subject.find(filter)
      .populate({
        path: 'semesterId',
        select: 'semesterNumber semesterName courseId',
        populate: {
          path: 'courseId',
          select: 'courseName courseCode departmentId schoolId',
          populate: [
            { path: 'departmentId', select: 'departmentName' },
            { path: 'schoolId', select: 'schoolName' }
          ]
        }
      })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Subject.countDocuments(filter);

    return {
      subjects,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getSubjectById(id: string) {
    const subject = await Subject.findOne({ _id: id, isDeleted: false })
      .populate({
        path: 'semesterId',
        select: 'semesterNumber semesterName courseId',
        populate: {
          path: 'courseId',
          select: 'courseName courseCode departmentId schoolId',
          populate: [
            { path: 'departmentId', select: 'departmentName' },
            { path: 'schoolId', select: 'schoolName' }
          ]
        }
      })
      .populate('prerequisiteSubjects', 'subjectName subjectCode')
      .lean();
    
    if (!subject) throw new AppError('Subject not found', 404);

    // Question Papers integration placeholder
    // const questionPapersCount = await QuestionPaper.countDocuments({ subjectId: id, isDeleted: false });
    const questionPapersCount = 0; 
    
    return { ...subject, stats: { questionPapersCount } };
  }

  async createSubject(data: any, userId: string, ip: string, userAgent: string) {
    // Validate semester
    const semester = await Semester.findOne({ _id: data.semesterId, isDeleted: false })
      .populate({
        path: 'courseId',
        select: 'departmentId schoolId'
      });
      
    if (!semester) throw new AppError('Invalid Semester ID. Semester not found or deleted.', 400);

    const existingCode = await Subject.findOne({ subjectCode: data.subjectCode, isDeleted: false });
    if (existingCode) throw new AppError('Subject code already exists', 400);

    const existingName = await Subject.findOne({ 
      subjectName: data.subjectName, 
      courseId: semester.courseId._id,
      isDeleted: false 
    });
    if (existingName) throw new AppError('Subject name already exists within this course', 400);

    // Validate circular prerequisites natively before insert (prevent self-reference here)
    if (data.prerequisiteSubjects && data.prerequisiteSubjects.includes(data.subjectCode)) {
      throw new AppError('A subject cannot be a prerequisite of itself', 400);
    }

    const course = semester.courseId as any;

    const totalCalculatedHours = (data.lectureHours || 0) + (data.tutorialHours || 0) + (data.practicalHours || 0);

    const subject = new Subject({
      ...data,
      courseId: course._id,
      departmentId: course.departmentId,
      schoolId: course.schoolId,
      totalHours: data.totalHours || totalCalculatedHours,
      createdBy: userId,
      updatedBy: userId
    });
    
    await subject.save();

    await AuthAuditLog.create({
      userId,
      action: 'SUBJECT_CREATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { subjectId: subject._id, subjectCode: subject.subjectCode, semesterId: semester._id }
    });

    return subject;
  }

  async updateSubject(id: string, data: any, userId: string, ip: string, userAgent: string) {
    const subject = await Subject.findOne({ _id: id, isDeleted: false });
    if (!subject) throw new AppError('Subject not found', 404);

    if (data.semesterId && data.semesterId.toString() !== subject.semesterId.toString()) {
      const semester = await Semester.findOne({ _id: data.semesterId, isDeleted: false })
        .populate({ path: 'courseId', select: 'departmentId schoolId' });
      if (!semester) throw new AppError('Invalid Semester ID.', 400);
      
      const course = semester.courseId as any;
      data.courseId = course._id;
      data.departmentId = course.departmentId;
      data.schoolId = course.schoolId;
    }

    if (data.subjectCode && data.subjectCode !== subject.subjectCode) {
      const existingCode = await Subject.findOne({ subjectCode: data.subjectCode, isDeleted: false });
      if (existingCode) throw new AppError('Subject code already exists', 400);
    }

    if (data.subjectName && data.subjectName !== subject.subjectName) {
      const courseIdToCheck = data.courseId || subject.courseId;
      const existingName = await Subject.findOne({ 
        subjectName: data.subjectName, 
        courseId: courseIdToCheck,
        isDeleted: false 
      });
      if (existingName) throw new AppError('Subject name already exists within this course', 400);
    }

    if (data.prerequisiteSubjects) {
       // Validate against self
       if (data.prerequisiteSubjects.some((pid: string) => pid === id)) {
           throw new AppError('A subject cannot be a prerequisite of itself', 400);
       }
       // Note: Deep circular check would require a graph traversal helper. For now, we block self-assignment.
    }

    const lec = data.lectureHours !== undefined ? data.lectureHours : subject.lectureHours;
    const tut = data.tutorialHours !== undefined ? data.tutorialHours : subject.tutorialHours;
    const prac = data.practicalHours !== undefined ? data.practicalHours : subject.practicalHours;
    data.totalHours = data.totalHours || (lec + tut + prac);

    Object.assign(subject, data);
    subject.updatedBy = userId as any;
    await subject.save();

    await AuthAuditLog.create({
      userId,
      action: 'SUBJECT_UPDATED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { subjectId: subject._id, changes: Object.keys(data) }
    });

    return subject;
  }

  async archiveSubject(id: string, userId: string, ip: string, userAgent: string) {
    const subject = await Subject.findOne({ _id: id, isDeleted: false });
    if (!subject) throw new AppError('Subject not found', 404);

    subject.status = 'ARCHIVED' as any;
    subject.updatedBy = userId as any;
    await subject.save();

    await AuthAuditLog.create({
      userId,
      action: 'SUBJECT_ARCHIVED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { subjectId: subject._id }
    });

    return subject;
  }

  async restoreSubject(id: string, userId: string, ip: string, userAgent: string) {
    const subject = await Subject.findOne({ _id: id, isDeleted: false });
    if (!subject) throw new AppError('Subject not found', 404);

    subject.status = 'ACTIVE' as any;
    subject.updatedBy = userId as any;
    await subject.save();

    await AuthAuditLog.create({
      userId,
      action: 'SUBJECT_RESTORED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { subjectId: subject._id }
    });

    return subject;
  }

  async deleteSubject(id: string, userId: string, ip: string, userAgent: string) {
    const subject = await Subject.findOne({ _id: id, isDeleted: false });
    if (!subject) throw new AppError('Subject not found', 404);

    // Placeholder: check if active question papers exist
    // const activeQPs = await QuestionPaper.countDocuments({ subjectId: id, isDeleted: false });
    // if (activeQPs > 0) throw new AppError('Cannot delete subject with active question papers', 400);

    subject.isDeleted = true;
    subject.updatedBy = userId as any;
    await subject.save();

    await AuthAuditLog.create({
      userId,
      action: 'SUBJECT_DELETED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { subjectId: subject._id }
    });

    return { message: 'Subject deleted successfully' };
  }
}

export const subjectService = new SubjectService();
