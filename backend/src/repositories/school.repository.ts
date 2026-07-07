import { School } from '../models/school.model';
import { ISchool } from '../interfaces/school.interface';
import { CreateSchoolDto, UpdateSchoolDto, SchoolQueryDto } from '../dtos/school.dto';

export class SchoolRepository {
  public async create(data: CreateSchoolDto & { createdBy?: string }): Promise<ISchool> {
    const school = new School(data);
    return await school.save();
  }

  public async findAll(query: SchoolQueryDto) {
    const { page = 1, limit = 10, search, status, sort = 'createdAt', order = 'desc' } = query;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { schoolName: { $regex: search, $options: 'i' } },
        { schoolCode: { $regex: search, $options: 'i' } },
        { deanName: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOption: any = { [sort]: order === 'desc' ? -1 : 1 };

    const [schools, total] = await Promise.all([
      School.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .exec(),
      School.countDocuments(filter),
    ]);

    return { schools, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async findById(id: string): Promise<ISchool | null> {
    return await School.findOne({ _id: id, isDeleted: false })
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .exec();
  }

  public async findByCode(schoolCode: string): Promise<ISchool | null> {
    return await School.findOne({ schoolCode: schoolCode.toUpperCase(), isDeleted: false }).exec();
  }
  
  public async findByName(schoolName: string): Promise<ISchool | null> {
    return await School.findOne({ schoolName, isDeleted: false }).exec();
  }

  public async update(id: string, data: UpdateSchoolDto & { updatedBy?: string }): Promise<ISchool | null> {
    return await School.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: data },
      { new: true, runValidators: true }
    ).exec();
  }

  public async delete(id: string, updatedBy?: string): Promise<ISchool | null> {
    return await School.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, updatedBy } },
      { new: true }
    ).exec();
  }
  
  public async restore(id: string, updatedBy?: string): Promise<ISchool | null> {
    return await School.findOneAndUpdate(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, updatedBy } },
      { new: true }
    ).exec();
  }
}

export const schoolRepository = new SchoolRepository();
