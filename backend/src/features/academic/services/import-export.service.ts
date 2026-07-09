import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { Course } from '../../../models/course.model';
import { Semester } from '../../../models/semester.model';
import { Subject } from '../../../models/subject.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/appError';
import mongoose from 'mongoose';

// Simple stub for ImportTransaction log collection
// In a real app, you would define an ImportTransactionModel
const mockImportTransactions: any[] = [];

export class ImportExportService {
  
  // 1. Export Service
  async exportData(entityType: string, format: string, filters: any = {}) {
    let data: any[] = [];
    
    // Naive fetch for all data. In production, use streams and cursors for large datasets.
    switch (entityType.toUpperCase()) {
      case 'SCHOOL':
        data = await School.find({ isDeleted: false, ...filters }).lean();
        break;
      case 'DEPARTMENT':
        data = await Department.find({ isDeleted: false, ...filters }).populate('schoolId', 'schoolCode').lean();
        break;
      case 'COURSE':
        data = await Course.find({ isDeleted: false, ...filters }).populate('departmentId', 'departmentCode').lean();
        break;
      case 'SEMESTER':
        data = await Semester.find({ isDeleted: false, ...filters }).populate('courseId', 'courseCode').lean();
        break;
      case 'SUBJECT':
        data = await Subject.find({ isDeleted: false, ...filters }).populate('semesterId').lean();
        break;
      default:
        throw new AppError('Invalid entity type for export', 400);
    }

    // Returning raw JSON data. The frontend or controller will convert this to CSV/Excel buffers.
    return { data, entityType, count: data.length };
  }

  // 2. Validation Engine (Dry Run)
  async validateImport(entityType: string, records: any[]) {
    const errors: any[] = [];
    const validRecords: any[] = [];
    let rowNum = 1;

    for (const record of records) {
      const rowErrors = [];
      try {
        switch (entityType.toUpperCase()) {
          case 'SCHOOL':
            if (!record.schoolName) rowErrors.push('Missing schoolName');
            if (!record.schoolCode) rowErrors.push('Missing schoolCode');
            const existSchool = await School.findOne({ schoolCode: record.schoolCode });
            if (existSchool) rowErrors.push(`School Code ${record.schoolCode} already exists`);
            break;
            
          case 'DEPARTMENT':
            if (!record.departmentName) rowErrors.push('Missing departmentName');
            if (!record.departmentCode) rowErrors.push('Missing departmentCode');
            if (!record.schoolCode) rowErrors.push('Missing schoolCode mapping');
            const pSchool = await School.findOne({ schoolCode: record.schoolCode });
            if (!pSchool) rowErrors.push(`Parent School Code ${record.schoolCode} not found`);
            else record.schoolId = pSchool._id;
            const existDept = await Department.findOne({ departmentCode: record.departmentCode });
            if (existDept) rowErrors.push(`Department Code ${record.departmentCode} already exists`);
            break;
            
          // Add validations for COURSE, SEMESTER, SUBJECT as needed
          default:
            rowErrors.push('Entity type validation not fully implemented');
        }

        if (rowErrors.length > 0) {
          errors.push({ row: rowNum, data: record, errors: rowErrors });
        } else {
          validRecords.push(record);
        }
      } catch (err: any) {
        errors.push({ row: rowNum, data: record, errors: [err.message] });
      }
      rowNum++;
    }

    return {
      totalProcessed: records.length,
      validCount: validRecords.length,
      errorCount: errors.length,
      errors,
      validRecords
    };
  }

  // 3. Import Service (Commit)
  async commitImport(entityType: string, validRecords: any[], userId: string, ip: string, userAgent: string) {
    if (validRecords.length === 0) throw new AppError('No valid records to import', 400);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const insertedDocs = [];
      const transactionId = new mongoose.Types.ObjectId().toString();

      switch (entityType.toUpperCase()) {
        case 'SCHOOL':
          for (const r of validRecords) {
            const doc = new School({ ...r, createdBy: userId });
            await doc.save({ session });
            insertedDocs.push(doc._id);
          }
          break;
        case 'DEPARTMENT':
          for (const r of validRecords) {
            const doc = new Department({ ...r, createdBy: userId });
            await doc.save({ session });
            insertedDocs.push(doc._id);
          }
          break;
        // Other entities...
        default:
          throw new Error('Unsupported entity import');
      }

      await session.commitTransaction();

      // Log transaction for rollback support
      mockImportTransactions.push({
        transactionId,
        entityType,
        insertedIds: insertedDocs,
        userId,
        timestamp: new Date()
      });

      await AuthAuditLog.create({
        userId,
        action: 'BULK_IMPORT' as any,
        ipAddress: ip,
        userAgent,
        metadata: { entityType, count: insertedDocs.length, transactionId }
      });

      return { success: true, count: insertedDocs.length, transactionId };
    } catch (error) {
      await session.abortTransaction();
      throw new AppError('Import transaction failed. Rolled back.', 500);
    } finally {
      session.endSession();
    }
  }

  // 4. Bulk Operations
  async executeBulkAction(action: string, entityType: string, ids: string[], updateData: any, userId: string, ip: string, userAgent: string) {
    if (!ids || ids.length === 0) throw new AppError('No IDs provided for bulk action', 400);

    let Model: any;
    switch (entityType.toUpperCase()) {
      case 'SCHOOL': Model = School; break;
      case 'DEPARTMENT': Model = Department; break;
      case 'COURSE': Model = Course; break;
      case 'SEMESTER': Model = Semester; break;
      case 'SUBJECT': Model = Subject; break;
      default: throw new AppError('Invalid entity type', 400);
    }

    let result;
    switch (action.toUpperCase()) {
      case 'DELETE':
        // Soft delete
        result = await Model.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true, updatedBy: userId } });
        break;
      case 'ARCHIVE':
        result = await Model.updateMany({ _id: { $in: ids } }, { $set: { status: 'ARCHIVED', updatedBy: userId } });
        break;
      case 'RESTORE':
        result = await Model.updateMany({ _id: { $in: ids } }, { $set: { status: 'ACTIVE', isDeleted: false, updatedBy: userId } });
        break;
      case 'UPDATE':
        result = await Model.updateMany({ _id: { $in: ids } }, { $set: { ...updateData, updatedBy: userId } });
        break;
      default:
        throw new AppError('Invalid bulk action', 400);
    }

    await AuthAuditLog.create({
      userId,
      action: `BULK_${action.toUpperCase()}` as any,
      ipAddress: ip,
      userAgent,
      metadata: { entityType, count: result.modifiedCount, ids }
    });

    return { success: true, modifiedCount: result.modifiedCount };
  }

  // 5. History & Rollback
  async getImportHistory() {
    return mockImportTransactions.sort((a, b) => b.timestamp - a.timestamp);
  }

  async rollbackImport(transactionId: string, userId: string, ip: string, userAgent: string) {
    const transaction = mockImportTransactions.find(t => t.transactionId === transactionId);
    if (!transaction) throw new AppError('Transaction not found', 404);

    let Model: any;
    switch (transaction.entityType.toUpperCase()) {
      case 'SCHOOL': Model = School; break;
      case 'DEPARTMENT': Model = Department; break;
      default: throw new AppError('Unsupported entity type for rollback', 400);
    }

    // Hard delete rolled-back items
    const result = await Model.deleteMany({ _id: { $in: transaction.insertedIds } });

    await AuthAuditLog.create({
      userId,
      action: 'IMPORT_ROLLBACK' as any,
      ipAddress: ip,
      userAgent,
      metadata: { transactionId, count: result.deletedCount }
    });

    return { success: true, rolledBackCount: result.deletedCount };
  }
}

export const importExportService = new ImportExportService();
