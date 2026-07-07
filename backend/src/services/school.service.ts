import { schoolRepository } from '../repositories/school.repository';
import { CreateSchoolDto, UpdateSchoolDto, SchoolQueryDto } from '../dtos/school.dto';
import { AppError } from '../utils/AppError';
import { ISchool } from '../interfaces/school.interface';

export class SchoolService {
  public async createSchool(data: CreateSchoolDto, userId?: string): Promise<ISchool> {
    // Check if code exists
    const existingCode = await schoolRepository.findByCode(data.schoolCode);
    if (existingCode) {
      throw new AppError(409, 'School code already exists');
    }

    // Check if name exists
    const existingName = await schoolRepository.findByName(data.schoolName);
    if (existingName) {
      throw new AppError(409, 'School name already exists');
    }

    return await schoolRepository.create({ ...data, createdBy: userId });
  }

  public async getSchools(query: SchoolQueryDto) {
    return await schoolRepository.findAll(query);
  }

  public async getSchoolById(id: string): Promise<ISchool> {
    const school = await schoolRepository.findById(id);
    if (!school) {
      throw new AppError(404, 'School not found');
    }
    return school;
  }

  public async updateSchool(id: string, data: UpdateSchoolDto, userId?: string): Promise<ISchool> {
    const school = await schoolRepository.findById(id);
    if (!school) {
      throw new AppError(404, 'School not found');
    }

    // If updating code, check uniqueness
    if (data.schoolCode && data.schoolCode.toUpperCase() !== school.schoolCode) {
      const existingCode = await schoolRepository.findByCode(data.schoolCode);
      if (existingCode) {
        throw new AppError(409, 'School code already exists');
      }
    }

    // If updating name, check uniqueness
    if (data.schoolName && data.schoolName !== school.schoolName) {
      const existingName = await schoolRepository.findByName(data.schoolName);
      if (existingName) {
        throw new AppError(409, 'School name already exists');
      }
    }

    const updatedSchool = await schoolRepository.update(id, { ...data, updatedBy: userId });
    if (!updatedSchool) {
      throw new AppError(500, 'Failed to update school');
    }
    return updatedSchool;
  }

  public async deleteSchool(id: string, userId?: string): Promise<void> {
    const school = await schoolRepository.findById(id);
    if (!school) {
      throw new AppError(404, 'School not found');
    }

    await schoolRepository.delete(id, userId);
  }
  
  public async restoreSchool(id: string, userId?: string): Promise<ISchool> {
    const restoredSchool = await schoolRepository.restore(id, userId);
    if (!restoredSchool) {
      throw new AppError(404, 'School not found or not deleted');
    }
    return restoredSchool;
  }
}

export const schoolService = new SchoolService();
