import { Report } from '../../../models/report.model';
import { Types } from 'mongoose';

export class ModerationRepository {
  async getReports(filters: any, limit: number, skip: number) {
    return Report.find(filters)
      .populate('reporterId', 'firstName lastName email role')
      .populate('assigneeId', 'firstName lastName email role')
      .populate('paperId', 'title subjectId')
      .sort({ priority: -1, createdAt: 1 })
      .skip(skip)
      .limit(limit);
  }

  async getReportCount(filters: any) {
    return Report.countDocuments(filters);
  }

  async getReportById(id: string) {
    return Report.findById(id)
      .populate('reporterId', 'firstName lastName email')
      .populate('assigneeId', 'firstName lastName email')
      .populate('paperId', 'title subjectId originalFileName');
  }

  async createReport(data: any) {
    return Report.create(data);
  }

  async updateReport(id: string, data: any) {
    return Report.findByIdAndUpdate(id, data, { new: true })
      .populate('reporterId', 'firstName lastName email')
      .populate('assigneeId', 'firstName lastName email')
      .populate('paperId', 'title subjectId');
  }
}
