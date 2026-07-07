import { Subject } from '../models/subject.model';
import { ISubject } from '../interfaces/subject.interface';
import { CreateSubjectDto, UpdateSubjectDto, SubjectQueryDto } from '../dtos/subject.dto';
import mongoose from 'mongoose';

export class SubjectRepository {
  public async create(data: CreateSubjectDto & { createdBy?: string }): Promise<ISubject> {
    const subject = new Subject(data);
    return await subject.save();
  }

  public async findAll(query: SubjectQueryDto) {
    const { page = 1, limit = 10, search, status, schoolId, departmentId, courseId, semesterId, subjectType, deliveryMode, sort = 'subjectCode', order = 'asc' } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (schoolId) filter.schoolId = new mongoose.Types.ObjectId(schoolId);
    if (departmentId) filter.departmentId = new mongoose.Types.ObjectId(departmentId);
    if (courseId) filter.courseId = new mongoose.Types.ObjectId(courseId);
    if (semesterId) filter.semesterId = new mongoose.Types.ObjectId(semesterId);
    if (subjectType) filter.subjectType = subjectType;
    if (deliveryMode) {
      if (Array.isArray(deliveryMode)) {
        filter.deliveryMode = { $in: deliveryMode };
      } else {
        filter.deliveryMode = deliveryMode;
      }
    }

    if (search) {
      filter.$or = [
        { subjectName: { $regex: search, $options: 'i' } },
        { subjectCode: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = { [sort]: order === 'desc' ? -1 : 1 };

    const [subjects, total] = await Promise.all([
      Subject.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('courseId', 'courseName courseCode')
        .populate('semesterId', 'semesterNumber semesterName')
        .populate('departmentId', 'departmentName')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .exec(),
      Subject.countDocuments(filter),
    ]);

    return { subjects, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async findById(id: string): Promise<ISubject | null> {
    return await Subject.findOne({ _id: id, isDeleted: false })
      .populate('schoolId', 'schoolName schoolCode')
      .populate('departmentId', 'departmentName departmentCode')
      .populate('courseId', 'courseName courseCode')
      .populate('semesterId', 'semesterNumber semesterName')
      .populate('prerequisiteSubjects', 'subjectName subjectCode')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .exec();
  }

  public async findByCode(subjectCode: string): Promise<ISubject | null> {
    return await Subject.findOne({ subjectCode: subjectCode.toUpperCase(), isDeleted: false }).exec();
  }
  
  public async findByNameAndCourse(subjectName: string, courseId: string): Promise<ISubject | null> {
    return await Subject.findOne({ subjectName, courseId: new mongoose.Types.ObjectId(courseId), isDeleted: false }).exec();
  }

  public async update(id: string, data: UpdateSubjectDto & { updatedBy?: string }): Promise<ISubject | null> {
    return await Subject.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
  }

  public async delete(id: string, updatedBy?: string): Promise<ISubject | null> {
    return await Subject.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, updatedBy } },
      { new: true }
    ).exec();
  }
  
  public async restore(id: string, updatedBy?: string): Promise<ISubject | null> {
    return await Subject.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, updatedBy } },
      { new: true }
    ).exec();
  }
}

export const subjectRepository = new SubjectRepository();
