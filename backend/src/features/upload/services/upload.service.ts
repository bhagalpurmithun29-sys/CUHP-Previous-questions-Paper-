import { Paper } from '../../../models/paper.model';
import { Subject } from '../../../models/subject.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/AppError';
import { storageService } from '../../../services/storage/storage.service';
import crypto from 'crypto';

// In a real implementation, this would connect to BullMQ / RabbitMQ
// and execute workers for Cloudinary, OCR, and AI metadata extraction.
const mockBackgroundQueue: any[] = [];

export class UploadService {
  
  async processUpload(data: any, file: any, userId: string, ip: string, userAgent: string) {
    // 1. Initial Validation
    if (!data.subjectId) throw new AppError('Subject mapping is required', 400);
    if (!data.title) throw new AppError('Paper title is required', 400);
    if (!file) throw new AppError('Paper PDF file is required', 400);
    
    // Simulate duplicate detection (checking if paper code already exists)
    const duplicate = await Paper.findOne({ paperCode: data.paperCode, isDeleted: false });
    if (duplicate) throw new AppError(`Paper with code ${data.paperCode} already exists`, 409);

    // 2. Fetch full hierarchy
    const subject = await Subject.findById(data.subjectId).populate({
      path: 'semesterId', select: 'courseId', populate: { path: 'courseId', select: 'departmentId schoolId' }
    });
    if (!subject) throw new AppError('Invalid academic mapping', 400);

    const sem = subject.semesterId as any;
    const course = sem.courseId;

    // Upload to configured storage
    const storageMetadata = await storageService.uploadFile(
      file.buffer, 
      file.originalname, 
      file.mimetype
    );

    // 3. Construct Initial Pending Paper Record
    const newPaper = new Paper({
      title: data.title,
      paperCode: data.paperCode || `QP-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      schoolId: course.schoolId,
      departmentId: course.departmentId,
      courseId: course._id,
      semesterId: sem._id,
      subjectId: subject._id,
      academicYear: data.academicYear,
      examSession: data.examSession,
      examType: data.examType,
      maximumMarks: data.maximumMarks,
      durationMinutes: data.durationMinutes,
      language: data.language || 'English',
      fileUrl: storageMetadata.publicUrl,
      fileSize: storageMetadata.sizeBytes,
      pageCount: data.pageCount || 1,
      uploaderId: userId,
      status: 'PENDING_REVIEW', // MUST enter moderation workflow
      ocrStatus: 'PENDING',
      aiAnalysisStatus: 'PENDING',
      tags: []
    });

    await newPaper.save();

    // 4. Enqueue Background Tasks
    // In production, dispatch to Redis/BullMQ
    mockBackgroundQueue.push({
      jobId: `ocr_${newPaper._id}`,
      type: 'OCR_EXTRACTION',
      targetId: newPaper._id,
      status: 'QUEUED'
    });

    mockBackgroundQueue.push({
      jobId: `ai_${newPaper._id}`,
      type: 'AI_METADATA_EXTRACTION',
      targetId: newPaper._id,
      status: 'QUEUED'
    });

    // 5. Audit Logging
    await AuthAuditLog.create({
      userId,
      action: 'UPLOAD_STARTED' as any,
      ipAddress: ip,
      userAgent,
      metadata: { paperId: newPaper._id, fileName: file?.originalname || data.title }
    });

    return newPaper;
  }

  async getUploadHistory(userId: string) {
    // Only return uploads by this specific user
    const uploads = await Paper.find({ uploaderId: userId })
      .select('title paperCode status createdAt ocrStatus aiAnalysisStatus')
      .sort({ createdAt: -1 })
      .lean();
    return uploads;
  }
}

export const uploadService = new UploadService();
