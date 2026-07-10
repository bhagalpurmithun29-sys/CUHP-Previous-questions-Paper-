import { Paper } from '../../../models/paper.model';
import { Subject } from '../../../models/subject.model';
import { PaperMetadataHistory } from '../../../models/paperMetadataHistory.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AppError } from '../../../utils/AppError';
import mongoose from 'mongoose';

export class MetadataService {
  
  // Scrutinize the quality of the metadata
  calculateQualityScore(paper: any) {
    let score = 100;
    const missing = [];
    
    // Check mandatory fields
    if (!paper.tags || paper.tags.length === 0) { score -= 15; missing.push('Keywords/Tags'); }
    if (!paper.academicYear) { score -= 20; missing.push('Academic Year'); }
    if (!paper.language) { score -= 5; missing.push('Language'); }
    if (!paper.durationMinutes) { score -= 10; missing.push('Duration'); }
    
    return {
      score: Math.max(0, score),
      missingFields: missing,
      consistency: score > 80 ? 'HIGH' : score > 50 ? 'MEDIUM' : 'LOW'
    };
  }

  async getMetadata(paperId: string) {
    const paper = await Paper.findById(paperId)
      .populate('subjectId', 'subjectName subjectCode')
      .populate('semesterId', 'semesterName')
      .populate('courseId', 'courseName')
      .lean();

    if (!paper) throw new AppError('Paper not found', 404);
    
    const quality = this.calculateQualityScore(paper);
    return { paper, quality };
  }

  async updateMetadata(paperId: string, updates: any, editorId: string, ip: string, userAgent: string) {
    const paper = await Paper.findById(paperId);
    if (!paper) throw new AppError('Paper not found', 404);

    // If subject changes, re-map hierarchy
    if (updates.subjectId && String(updates.subjectId) !== String(paper.subjectId)) {
      const subject = await Subject.findById(updates.subjectId).populate({
        path: 'semesterId', select: 'courseId', populate: { path: 'courseId', select: 'departmentId schoolId' }
      });
      if (!subject) throw new AppError('Invalid Subject ID provided', 400);
      
      const sem = subject.semesterId as any;
      const course = sem.courseId;
      
      updates.schoolId = course.schoolId;
      updates.departmentId = course.departmentId;
      updates.courseId = course._id;
      updates.semesterId = sem._id;
    }

    // Determine what changed for history logging
    const changes: any[] = [];
    const fieldsToTrack = ['title', 'paperCode', 'academicYear', 'examSession', 'examType', 'maximumMarks', 'durationMinutes', 'language', 'tags', 'subjectId'];
    
    fieldsToTrack.forEach(field => {
      if (updates[field] !== undefined && JSON.stringify(updates[field]) !== JSON.stringify(paper.get(field))) {
        changes.push({
          field,
          oldValue: paper.get(field),
          newValue: updates[field]
        });
        paper.set(field, updates[field]);
      }
    });

    if (changes.length > 0) {
      paper.version += 1;
      
      // Revert status to pending review if edited by faculty
      // Assuming caller determines role, but we'll flag it
      paper.status = 'PENDING_REVIEW';

      await paper.save();

      // Log to strict Metadata History collection
      await PaperMetadataHistory.create({
        paperId, editorId, changes
      });

      // Log to central Audit
      await AuthAuditLog.create({
        userId: editorId, action: 'UPDATE' as any, ipAddress: ip, userAgent,
        metadata: { targetId: paperId, entity: 'PaperMetadata', changes: changes.length }
      });
    }

    const quality = this.calculateQualityScore(paper.toObject());
    return { paper, quality, changes };
  }

  async getHistory(paperId: string) {
    return await PaperMetadataHistory.find({ paperId })
      .populate('editorId', 'name email role')
      .sort({ timestamp: -1 })
      .lean();
  }
}

export const metadataService = new MetadataService();
