import { IQuestionPaperRepository, IQuestionPaper, PaperApprovalStatus } from '../interfaces/paper.interface';
import { QuestionPaper } from '../models/paper.model';

export class QuestionPaperRepository implements IQuestionPaperRepository {
  async create(data: Partial<IQuestionPaper>): Promise<IQuestionPaper> {
    const paper = new QuestionPaper(data);
    return await paper.save() as unknown as IQuestionPaper;
  }

  async findById(id: string): Promise<IQuestionPaper | null> {
    return await QuestionPaper.findById(id).where({ isDeleted: false }) as unknown as IQuestionPaper;
  }

  async findByPaperId(paperId: string): Promise<IQuestionPaper | null> {
    return await QuestionPaper.findOne({ paperId, isDeleted: false }) as unknown as IQuestionPaper;
  }

  async update(id: string, data: Partial<IQuestionPaper>): Promise<IQuestionPaper | null> {
    return await QuestionPaper.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await QuestionPaper.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() });
    return !!result;
  }

  async findBySubjectId(subjectId: string, pagination = { page: 1, limit: 10 }) {
    const skip = (pagination.page - 1) * pagination.limit;
    const [data, total] = await Promise.all([
      QuestionPaper.find({ subjectId, isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED })
        .sort({ examYear: -1 })
        .skip(skip)
        .limit(pagination.limit),
      QuestionPaper.countDocuments({ subjectId, isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED })
    ]);
    return { data, total, page: pagination.page, limit: pagination.limit };
  }

  async findPendingApprovals(pagination = { page: 1, limit: 10 }) {
    const skip = (pagination.page - 1) * pagination.limit;
    const [data, total] = await Promise.all([
      QuestionPaper.find({ approvalStatus: { $in: [PaperApprovalStatus.PENDING, PaperApprovalStatus.UNDER_REVIEW] }, isDeleted: false })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(pagination.limit)
        .populate('uploaderId', 'fullName email'),
      QuestionPaper.countDocuments({ approvalStatus: { $in: [PaperApprovalStatus.PENDING, PaperApprovalStatus.UNDER_REVIEW] }, isDeleted: false })
    ]);
    return { data, total, page: pagination.page, limit: pagination.limit };
  }

  async search(query: string, filters: any, pagination = { page: 1, limit: 10 }) {
    const skip = (pagination.page - 1) * pagination.limit;
    const filterQuery: any = { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, ...filters };
    
    if (query) {
      filterQuery.$text = { $search: query };
    }

    const [data, total] = await Promise.all([
      QuestionPaper.find(filterQuery)
        .sort(query ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit),
      QuestionPaper.countDocuments(filterQuery)
    ]);
    return { data, total, page: pagination.page, limit: pagination.limit };
  }

  async incrementAnalytics(id: string, field: 'downloadCount' | 'viewCount' | 'shareCount' | 'reportCount'): Promise<void> {
    await QuestionPaper.findByIdAndUpdate(id, { $inc: { [field]: 1 } });
  }

  async updateApprovalStatus(id: string, status: PaperApprovalStatus, userId: string, reason?: string): Promise<IQuestionPaper | null> {
    return await QuestionPaper.findByIdAndUpdate(id, {
      approvalStatus: status,
      approverId: status === PaperApprovalStatus.APPROVED || status === PaperApprovalStatus.REJECTED ? userId : undefined,
      reviewerId: status === PaperApprovalStatus.UNDER_REVIEW ? userId : undefined,
      approvedAt: status === PaperApprovalStatus.APPROVED ? new Date() : undefined,
      reviewedAt: status === PaperApprovalStatus.UNDER_REVIEW ? new Date() : undefined,
      rejectedReason: reason
    }, { new: true });
  }

  // ============================================================
  // Extended methods used by Analytics & Recommendation Services
  // ============================================================

  async count(filter: any = {}): Promise<number> {
    return await QuestionPaper.countDocuments({ isDeleted: false, ...filter });
  }

  async find(filter: any = {}, limit: number = 10, page: number = 1, sort: any = { createdAt: -1 }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      QuestionPaper.find({ isDeleted: false, ...filter }).sort(sort).skip(skip).limit(limit),
      QuestionPaper.countDocuments({ isDeleted: false, ...filter })
    ]);
    return { data, total, page, limit };
  }

  async aggregate(pipeline: any[]): Promise<any[]> {
    return await QuestionPaper.aggregate(pipeline);
  }
}
