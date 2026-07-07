import { Semester } from '../models/semester.model';
import { ISemester } from '../interfaces/semester.interface';
import { CreateSemesterDto, UpdateSemesterDto, SemesterQueryDto } from '../dtos/semester.dto';
import mongoose from 'mongoose';

export class SemesterRepository {
  public async create(data: CreateSemesterDto & { createdBy?: string }): Promise<ISemester> {
    const semester = new Semester(data);
    return await semester.save();
  }

  public async findAll(query: SemesterQueryDto) {
    const { page = 1, limit = 10, search, status, courseId, academicSession, academicYear, semesterType, isOdd, isCurrentSemester, sort = 'semesterNumber', order = 'asc' } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (courseId) filter.courseId = new mongoose.Types.ObjectId(courseId);
    if (academicSession) filter.academicSession = academicSession;
    if (academicYear) filter.academicYear = academicYear;
    if (semesterType) filter.semesterType = semesterType;
    if (isOdd !== undefined) filter.isOdd = isOdd;
    if (isCurrentSemester !== undefined) filter.isCurrentSemester = isCurrentSemester;

    if (search) {
      filter.$or = [
        { semesterName: { $regex: search, $options: 'i' } },
        { shortName: { $regex: search, $options: 'i' } },
        { academicYear: { $regex: search, $options: 'i' } },
        { academicSession: { $regex: search, $options: 'i' } },
      ];
      // Search by semester number if search is numeric
      const searchNum = parseInt(search);
      if (!isNaN(searchNum)) {
        filter.$or.push({ semesterNumber: searchNum });
      }
    }

    const sortOption: any = { [sort]: order === 'desc' ? -1 : 1 };

    const [semesters, total] = await Promise.all([
      Semester.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('courseId', 'courseName courseCode programType degree')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .exec(),
      Semester.countDocuments(filter),
    ]);

    return { semesters, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async findById(id: string): Promise<ISemester | null> {
    return await Semester.findOne({ _id: id, isDeleted: false })
      .populate('courseId', 'courseName courseCode programType degree')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .exec();
  }

  public async findByNumberAndCourse(semesterNumber: number, courseId: string): Promise<ISemester | null> {
    return await Semester.findOne({ semesterNumber, courseId: new mongoose.Types.ObjectId(courseId), isDeleted: false }).exec();
  }
  
  public async unsetCurrentSemestersForCourse(courseId: string): Promise<void> {
    await Semester.updateMany({ courseId: new mongoose.Types.ObjectId(courseId), isDeleted: false }, { $set: { isCurrentSemester: false } });
  }

  public async update(id: string, data: UpdateSemesterDto & { updatedBy?: string }): Promise<ISemester | null> {
    return await Semester.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
  }

  public async delete(id: string, updatedBy?: string): Promise<ISemester | null> {
    return await Semester.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, updatedBy } },
      { new: true }
    ).exec();
  }
  
  public async restore(id: string, updatedBy?: string): Promise<ISemester | null> {
    return await Semester.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, updatedBy } },
      { new: true }
    ).exec();
  }
}

export const semesterRepository = new SemesterRepository();
