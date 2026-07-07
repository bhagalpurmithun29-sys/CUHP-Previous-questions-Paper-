import { Department } from '../models/department.model';
import { IDepartment } from '../interfaces/department.interface';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentQueryDto } from '../dtos/department.dto';
import mongoose from 'mongoose';

export class DepartmentRepository {
  public async create(data: CreateDepartmentDto & { createdBy?: string }): Promise<IDepartment> {
    const department = new Department(data);
    return await department.save();
  }

  public async findAll(query: DepartmentQueryDto) {
    const { page = 1, limit = 10, search, status, schoolId, sort = 'createdAt', order = 'desc' } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (status) filter.status = status;
    if (schoolId) filter.schoolId = new mongoose.Types.ObjectId(schoolId);

    if (search) {
      filter.$or = [
        { departmentName: { $regex: search, $options: 'i' } },
        { departmentCode: { $regex: search, $options: 'i' } },
        { hodName: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = { [sort]: order === 'desc' ? -1 : 1 };

    const [departments, total] = await Promise.all([
      Department.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('schoolId', 'schoolName schoolCode')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .exec(),
      Department.countDocuments(filter),
    ]);

    return { departments, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async findById(id: string): Promise<IDepartment | null> {
    return await Department.findOne({ _id: id, isDeleted: false })
      .populate('schoolId', 'schoolName schoolCode')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .exec();
  }

  public async findByCode(departmentCode: string): Promise<IDepartment | null> {
    return await Department.findOne({ departmentCode: departmentCode.toUpperCase(), isDeleted: false }).exec();
  }
  
  public async findByNameAndSchool(departmentName: string, schoolId: string): Promise<IDepartment | null> {
    return await Department.findOne({ departmentName, schoolId: new mongoose.Types.ObjectId(schoolId), isDeleted: false }).exec();
  }

  public async update(id: string, data: UpdateDepartmentDto & { updatedBy?: string }): Promise<IDepartment | null> {
    return await Department.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
  }

  public async delete(id: string, updatedBy?: string): Promise<IDepartment | null> {
    return await Department.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, updatedBy } },
      { new: true }
    ).exec();
  }
  
  public async restore(id: string, updatedBy?: string): Promise<IDepartment | null> {
    return await Department.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, updatedBy } },
      { new: true }
    ).exec();
  }
}

export const departmentRepository = new DepartmentRepository();
