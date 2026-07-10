import { ReadingHistory, IReadingHistory } from '../../../models/readingHistory.model';
import { Paper, IPaper } from '../../../models/paper.model';

export class ViewerRepository {
  async getPaperDetails(paperId: string): Promise<IPaper | null> {
    return Paper.findById(paperId).populate('schoolId departmentId courseId semesterId subjectId');
  }

  async getReadingHistory(userId: string, paperId: string): Promise<IReadingHistory | null> {
    return ReadingHistory.findOne({ userId, paperId });
  }

  async updateReadingProgress(
    userId: string, 
    paperId: string, 
    progress: { lastPageRead: number; progressPercentage: number; timeSpent: number }
  ): Promise<IReadingHistory> {
    const history = await ReadingHistory.findOneAndUpdate(
      { userId, paperId },
      { 
        $set: { 
          lastPageRead: progress.lastPageRead, 
          progressPercentage: progress.progressPercentage,
          lastReadAt: new Date()
        },
        $inc: { totalTimeSpent: progress.timeSpent }
      },
      { new: true, upsert: true }
    );
    return history;
  }
  
  async getUserHistory(userId: string): Promise<IReadingHistory[]> {
      return ReadingHistory.find({ userId }).populate('paperId').sort({ lastReadAt: -1 }).limit(20);
  }
}
