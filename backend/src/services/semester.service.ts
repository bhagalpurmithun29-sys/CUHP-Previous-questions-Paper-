import { semesterRepository } from '../repositories/semester.repository';
import { courseRepository } from '../repositories/course.repository';
import { CreateSemesterDto, UpdateSemesterDto, SemesterQueryDto } from '../dtos/semester.dto';
import { AppError } from '../utils/AppError';
import { ISemester, SemesterStatus } from '../interfaces/semester.interface';

export class SemesterService {
  public async createSemester(data: CreateSemesterDto, userId?: string): Promise<ISemester> {
    const course = await courseRepository.findById(data.courseId);
    if (!course) {
      throw new AppError(404, 'Referenced course not found');
    }
    
    const existingNumInCourse = await semesterRepository.findByNumberAndCourse(data.semesterNumber, data.courseId);
    if (existingNumInCourse) {
      throw new AppError(409, 'Semester number already exists within this course');
    }
    
    // Automatically set isOdd based on semesterNumber if not provided
    if (data.isOdd === undefined) {
      data.isOdd = data.semesterNumber % 2 !== 0;
    }
    
    if (data.isCurrentSemester) {
      await semesterRepository.unsetCurrentSemestersForCourse(data.courseId);
    }

    const semester = await semesterRepository.create({ ...data, createdBy: userId });
    return semester;
  }

  public async getSemesters(query: SemesterQueryDto) {
    return await semesterRepository.findAll(query);
  }

  public async getSemesterById(id: string): Promise<ISemester> {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new AppError(404, 'Semester not found');
    }
    return semester;
  }

  public async updateSemester(id: string, data: UpdateSemesterDto, userId?: string): Promise<ISemester> {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new AppError(404, 'Semester not found');
    }

    if (data.courseId && data.courseId !== semester.courseId._id.toString()) {
        const course = await courseRepository.findById(data.courseId);
        if (!course) {
            throw new AppError(404, 'Referenced course not found');
        }
    }

    const targetCourseId = data.courseId || semester.courseId._id.toString();
    const targetSemesterNumber = data.semesterNumber !== undefined ? data.semesterNumber : semester.semesterNumber;

    if (data.semesterNumber !== undefined || data.courseId) {
      if (targetSemesterNumber !== semester.semesterNumber || targetCourseId !== semester.courseId._id.toString()) {
        const existingNumInCourse = await semesterRepository.findByNumberAndCourse(targetSemesterNumber, targetCourseId);
        if (existingNumInCourse) {
          throw new AppError(409, 'Semester number already exists within this course');
        }
      }
    }
    
    // Update isOdd if semesterNumber is updated and isOdd is not explicitly provided
    if (data.semesterNumber !== undefined && data.isOdd === undefined) {
      data.isOdd = data.semesterNumber % 2 !== 0;
    }

    if (data.isCurrentSemester && !semester.isCurrentSemester) {
      await semesterRepository.unsetCurrentSemestersForCourse(targetCourseId);
    }

    const updatedSemester = await semesterRepository.update(id, { ...data, updatedBy: userId });
    if (!updatedSemester) {
      throw new AppError(500, 'Failed to update semester');
    }

    return updatedSemester;
  }

  public async deleteSemester(id: string, userId?: string): Promise<void> {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new AppError(404, 'Semester not found');
    }

    await semesterRepository.delete(id, userId);
  }
  
  public async restoreSemester(id: string, userId?: string): Promise<ISemester> {
    const restoredSemester = await semesterRepository.restore(id, userId);
    if (!restoredSemester) {
      throw new AppError(404, 'Semester not found or not deleted');
    }
    return restoredSemester;
  }
  
  public async activateSemester(id: string, userId?: string): Promise<ISemester> {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new AppError(404, 'Semester not found');
    }
    
    // Deactivate others
    await semesterRepository.unsetCurrentSemestersForCourse(semester.courseId._id.toString());
    
    const activatedSemester = await semesterRepository.update(id, { 
      status: SemesterStatus.ACTIVE, 
      isCurrentSemester: true,
      updatedBy: userId 
    });
    
    if (!activatedSemester) {
        throw new AppError(500, 'Failed to activate semester');
    }
    return activatedSemester;
  }
  
  public async exportSemesters(query: SemesterQueryDto): Promise<any> {
    const result = await semesterRepository.findAll({ ...query, limit: 1000 });
    return result.semesters;
  }
  
  public async importSemesters(file: any, userId?: string): Promise<any> {
    if (!file) {
      throw new AppError(400, 'No file uploaded');
    }
    return { success: true, count: 0, message: 'Import functionality mock executed' };
  }
}

export const semesterService = new SemesterService();
