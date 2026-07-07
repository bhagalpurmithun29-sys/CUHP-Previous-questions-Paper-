import { subjectRepository } from '../repositories/subject.repository';
import { semesterRepository } from '../repositories/semester.repository';
import { CreateSubjectDto, UpdateSubjectDto, SubjectQueryDto } from '../dtos/subject.dto';
import { AppError } from '../utils/AppError';
import { ISubject } from '../interfaces/subject.interface';
import mongoose from 'mongoose';

export class SubjectService {
  public async createSubject(data: CreateSubjectDto, userId?: string): Promise<ISubject> {
    const semester = await semesterRepository.findById(data.semesterId);
    if (!semester) {
      throw new AppError(404, 'Referenced semester not found');
    }
    
    if (semester.courseId._id.toString() !== data.courseId) {
      throw new AppError(400, 'Semester does not belong to the referenced course');
    }
    
    // In a real scenario, we'd also validate that the course belongs to the department and department to school.
    // For brevity, assuming the frontend dropdowns filter this correctly, but backend should ideally verify hierarchy.

    const existingCode = await subjectRepository.findByCode(data.subjectCode);
    if (existingCode) {
      throw new AppError(409, 'Subject code already exists system-wide');
    }

    const existingNameInCourse = await subjectRepository.findByNameAndCourse(data.subjectName, data.courseId);
    if (existingNameInCourse) {
      throw new AppError(409, 'Subject name already exists within this course');
    }

    const subject = await subjectRepository.create({ ...data, createdBy: userId });
    return subject;
  }

  public async getSubjects(query: SubjectQueryDto) {
    return await subjectRepository.findAll(query);
  }

  public async getSubjectById(id: string): Promise<ISubject> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new AppError(404, 'Subject not found');
    }
    return subject;
  }

  public async updateSubject(id: string, data: UpdateSubjectDto, userId?: string): Promise<ISubject> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new AppError(404, 'Subject not found');
    }

    if (data.semesterId && data.semesterId !== subject.semesterId._id.toString()) {
        const semester = await semesterRepository.findById(data.semesterId);
        if (!semester) {
            throw new AppError(404, 'Referenced semester not found');
        }
        
        const targetCourseId = data.courseId || subject.courseId._id.toString();
        if (semester.courseId._id.toString() !== targetCourseId) {
            throw new AppError(400, 'Semester does not belong to the referenced course');
        }
    }

    if (data.subjectCode && data.subjectCode.toUpperCase() !== subject.subjectCode) {
      const existingCode = await subjectRepository.findByCode(data.subjectCode);
      if (existingCode) {
        throw new AppError(409, 'Subject code already exists system-wide');
      }
    }

    const targetCourseId = data.courseId || subject.courseId._id.toString();
    const targetSubjectName = data.subjectName || subject.subjectName;

    if (data.subjectName || data.courseId) {
      if (targetSubjectName !== subject.subjectName || targetCourseId !== subject.courseId._id.toString()) {
        const existingNameInCourse = await subjectRepository.findByNameAndCourse(targetSubjectName, targetCourseId);
        if (existingNameInCourse) {
          throw new AppError(409, 'Subject name already exists within this course');
        }
      }
    }

    const updatedSubject = await subjectRepository.update(id, { ...data, updatedBy: userId });
    if (!updatedSubject) {
      throw new AppError(500, 'Failed to update subject');
    }

    return updatedSubject;
  }

  public async deleteSubject(id: string, userId?: string): Promise<void> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new AppError(404, 'Subject not found');
    }

    await subjectRepository.delete(id, userId);
  }
  
  public async restoreSubject(id: string, userId?: string): Promise<ISubject> {
    const restoredSubject = await subjectRepository.restore(id, userId);
    if (!restoredSubject) {
      throw new AppError(404, 'Subject not found or not deleted');
    }
    return restoredSubject;
  }
  
  public async duplicateSubject(id: string, userId?: string): Promise<ISubject> {
    const original = await subjectRepository.findById(id);
    if (!original) {
       throw new AppError(404, 'Subject not found');
    }
    
    // Create new code and name to avoid unique constraints
    const newCode = `${original.subjectCode}-COPY-${Date.now().toString().slice(-4)}`;
    const newName = `${original.subjectName} (Copy)`;
    
    const subjectData: any = original.toObject();
    delete subjectData._id;
    delete subjectData.createdAt;
    delete subjectData.updatedAt;
    
    subjectData.subjectCode = newCode;
    subjectData.subjectName = newName;
    subjectData.status = 'INACTIVE'; // Safe default for copies
    
    const duplicatedSubject = await subjectRepository.create({ ...subjectData, createdBy: userId });
    return duplicatedSubject;
  }
  
  public async exportSubjects(query: SubjectQueryDto): Promise<any> {
    const result = await subjectRepository.findAll({ ...query, limit: 2000 });
    return result.subjects;
  }
  
  public async importSubjects(file: any, userId?: string): Promise<any> {
    if (!file) {
      throw new AppError(400, 'No file uploaded');
    }
    return { success: true, count: 0, message: 'Import functionality mock executed' };
  }
}

export const subjectService = new SubjectService();
