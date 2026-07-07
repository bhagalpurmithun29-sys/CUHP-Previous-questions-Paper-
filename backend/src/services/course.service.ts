import { courseRepository } from '../repositories/course.repository';
import { departmentRepository } from '../repositories/department.repository';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from '../dtos/course.dto';
import { AppError } from '../utils/AppError';
import { ICourse } from '../interfaces/course.interface';

export class CourseService {
  public async createCourse(data: CreateCourseDto, userId?: string): Promise<ICourse> {
    const department = await departmentRepository.findById(data.departmentId);
    if (!department) {
      throw new AppError(404, 'Referenced department not found');
    }
    
    if (department.schoolId._id.toString() !== data.schoolId) {
      throw new AppError(400, 'Department does not belong to the referenced school');
    }

    const existingCode = await courseRepository.findByCode(data.courseCode);
    if (existingCode) {
      throw new AppError(409, 'Course code already exists system-wide');
    }

    const existingNameInDept = await courseRepository.findByNameAndDepartment(data.courseName, data.departmentId);
    if (existingNameInDept) {
      throw new AppError(409, 'Course name already exists within this department');
    }

    const course = await courseRepository.create({ ...data, createdBy: userId });
    
    return course;
  }

  public async getCourses(query: CourseQueryDto) {
    return await courseRepository.findAll(query);
  }

  public async getCourseById(id: string): Promise<ICourse> {
    const course = await courseRepository.findById(id);
    if (!course) {
      throw new AppError(404, 'Course not found');
    }
    return course;
  }

  public async updateCourse(id: string, data: UpdateCourseDto, userId?: string): Promise<ICourse> {
    const course = await courseRepository.findById(id);
    if (!course) {
      throw new AppError(404, 'Course not found');
    }

    if (data.departmentId && data.departmentId !== course.departmentId._id.toString()) {
        const department = await departmentRepository.findById(data.departmentId);
        if (!department) {
            throw new AppError(404, 'Referenced department not found');
        }
        
        const targetSchoolId = data.schoolId || course.schoolId._id.toString();
        if (department.schoolId._id.toString() !== targetSchoolId) {
            throw new AppError(400, 'Department does not belong to the referenced school');
        }
    }

    if (data.courseCode && data.courseCode.toUpperCase() !== course.courseCode) {
      const existingCode = await courseRepository.findByCode(data.courseCode);
      if (existingCode) {
        throw new AppError(409, 'Course code already exists system-wide');
      }
    }

    const targetDepartmentId = data.departmentId || course.departmentId._id.toString();
    const targetCourseName = data.courseName || course.courseName;

    if (data.courseName || data.departmentId) {
      if (targetCourseName !== course.courseName || targetDepartmentId !== course.departmentId._id.toString()) {
        const existingNameInDept = await courseRepository.findByNameAndDepartment(targetCourseName, targetDepartmentId);
        if (existingNameInDept) {
          throw new AppError(409, 'Course name already exists within this department');
        }
      }
    }

    const updatedCourse = await courseRepository.update(id, { ...data, updatedBy: userId });
    if (!updatedCourse) {
      throw new AppError(500, 'Failed to update course');
    }

    return updatedCourse;
  }

  public async deleteCourse(id: string, userId?: string): Promise<void> {
    const course = await courseRepository.findById(id);
    if (!course) {
      throw new AppError(404, 'Course not found');
    }

    await courseRepository.delete(id, userId);
  }
  
  public async restoreCourse(id: string, userId?: string): Promise<ICourse> {
    const restoredCourse = await courseRepository.restore(id, userId);
    if (!restoredCourse) {
      throw new AppError(404, 'Course not found or not deleted');
    }
    return restoredCourse;
  }
  
  public async exportCourses(query: CourseQueryDto): Promise<any> {
    // In a real scenario, this would generate a CSV/Excel buffer
    // For now we'll fetch the filtered courses
    const result = await courseRepository.findAll({ ...query, limit: 1000 });
    return result.courses;
  }
  
  public async importCourses(file: any, userId?: string): Promise<any> {
    // Dummy implementation for file parsing
    if (!file) {
      throw new AppError(400, 'No file uploaded');
    }
    return { success: true, count: 0, message: 'Import functionality mock executed' };
  }
}

export const courseService = new CourseService();
