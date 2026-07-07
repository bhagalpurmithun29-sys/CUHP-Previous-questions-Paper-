import { Course } from '../models/course.model';
import { ICourse } from '../interfaces/course.interface';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from '../dtos/course.dto';
import mongoose from 'mongoose';

export class CourseRepository {
  public async create(data: CreateCourseDto & { createdBy?: string }): Promise<ICourse> {
    const course = new Course(data);
    return await course.save();
  }

  public async findAll(query: CourseQueryDto) {
    const { page = 1, limit = 10, search, status, schoolId, departmentId, programType, degree, sort = 'createdAt', order = 'desc' } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (schoolId) filter.schoolId = new mongoose.Types.ObjectId(schoolId);
    if (departmentId) filter.departmentId = new mongoose.Types.ObjectId(departmentId);
    if (programType) filter.programType = programType;
    if (degree) filter.degree = degree;

    if (search) {
      filter.$or = [
        { courseName: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
        { degree: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = { [sort]: order === 'desc' ? -1 : 1 };

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('schoolId', 'schoolName schoolCode')
        .populate('departmentId', 'departmentName departmentCode')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .exec(),
      Course.countDocuments(filter),
    ]);

    return { courses, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async findById(id: string): Promise<ICourse | null> {
    return await Course.findOne({ _id: id, isDeleted: false })
      .populate('schoolId', 'schoolName schoolCode')
      .populate('departmentId', 'departmentName departmentCode')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .exec();
  }

  public async findByCode(courseCode: string): Promise<ICourse | null> {
    return await Course.findOne({ courseCode: courseCode.toUpperCase(), isDeleted: false }).exec();
  }
  
  public async findByNameAndDepartment(courseName: string, departmentId: string): Promise<ICourse | null> {
    return await Course.findOne({ courseName, departmentId: new mongoose.Types.ObjectId(departmentId), isDeleted: false }).exec();
  }

  public async update(id: string, data: UpdateCourseDto & { updatedBy?: string }): Promise<ICourse | null> {
    return await Course.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
  }

  public async delete(id: string, updatedBy?: string): Promise<ICourse | null> {
    return await Course.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, updatedBy } },
      { new: true }
    ).exec();
  }
  
  public async restore(id: string, updatedBy?: string): Promise<ICourse | null> {
    return await Course.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, updatedBy } },
      { new: true }
    ).exec();
  }
}

export const courseRepository = new CourseRepository();
