import { departmentRepository } from '../repositories/department.repository';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentQueryDto } from '../dtos/department.dto';
import { AppError } from '../utils/AppError';
import { IDepartment } from '../interfaces/department.interface';
import { schoolRepository } from '../repositories/school.repository';
// import { activityLogService } from '../services/activityLog.service'; // Assuming Audit Logs

export class DepartmentService {
  public async createDepartment(data: CreateDepartmentDto, userId?: string): Promise<IDepartment> {
    const school = await schoolRepository.findById(data.schoolId);
    if (!school) {
      throw new AppError(404, 'Referenced school not found');
    }

    const existingCode = await departmentRepository.findByCode(data.departmentCode);
    if (existingCode) {
      throw new AppError(409, 'Department code already exists system-wide');
    }

    const existingNameInSchool = await departmentRepository.findByNameAndSchool(data.departmentName, data.schoolId);
    if (existingNameInSchool) {
      throw new AppError(409, 'Department name already exists within this school');
    }

    const department = await departmentRepository.create({ ...data, createdBy: userId });
    
    // Log activity
    // await activityLogService.log('DEPARTMENT_CREATED', `Created department ${department.departmentName}`, userId, department._id);

    return department;
  }

  public async getDepartments(query: DepartmentQueryDto) {
    return await departmentRepository.findAll(query);
  }

  public async getDepartmentById(id: string): Promise<IDepartment> {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new AppError(404, 'Department not found');
    }
    return department;
  }

  public async updateDepartment(id: string, data: UpdateDepartmentDto, userId?: string): Promise<IDepartment> {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new AppError(404, 'Department not found');
    }

    if (data.schoolId && data.schoolId !== department.schoolId.toString()) {
        const school = await schoolRepository.findById(data.schoolId);
        if (!school) {
            throw new AppError(404, 'Referenced school not found');
        }
    }

    if (data.departmentCode && data.departmentCode.toUpperCase() !== department.departmentCode) {
      const existingCode = await departmentRepository.findByCode(data.departmentCode);
      if (existingCode) {
        throw new AppError(409, 'Department code already exists system-wide');
      }
    }

    const targetSchoolId = data.schoolId || department.schoolId.toString();
    const targetDepartmentName = data.departmentName || department.departmentName;

    if (data.departmentName || data.schoolId) {
      if (targetDepartmentName !== department.departmentName || targetSchoolId !== department.schoolId.toString()) {
        const existingNameInSchool = await departmentRepository.findByNameAndSchool(targetDepartmentName, targetSchoolId);
        if (existingNameInSchool) {
          throw new AppError(409, 'Department name already exists within this school');
        }
      }
    }

    const updatedDepartment = await departmentRepository.update(id, { ...data, updatedBy: userId });
    if (!updatedDepartment) {
      throw new AppError(500, 'Failed to update department');
    }

    // await activityLogService.log('DEPARTMENT_UPDATED', `Updated department ${updatedDepartment.departmentName}`, userId, updatedDepartment._id);

    return updatedDepartment;
  }

  public async deleteDepartment(id: string, userId?: string): Promise<void> {
    const department = await departmentRepository.findById(id);
    if (!department) {
      throw new AppError(404, 'Department not found');
    }

    await departmentRepository.delete(id, userId);
    // await activityLogService.log('DEPARTMENT_DELETED', `Deleted department ${department.departmentName}`, userId, department._id);
  }
  
  public async restoreDepartment(id: string, userId?: string): Promise<IDepartment> {
    const restoredDepartment = await departmentRepository.restore(id, userId);
    if (!restoredDepartment) {
      throw new AppError(404, 'Department not found or not deleted');
    }
    // await activityLogService.log('DEPARTMENT_RESTORED', `Restored department ${restoredDepartment.departmentName}`, userId, restoredDepartment._id);
    return restoredDepartment;
  }
}

export const departmentService = new DepartmentService();
