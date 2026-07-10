import { InsightAnalysis, IAIInsight } from '../models/insight.model';
import mongoose from 'mongoose';

export class InsightRepository {
  async getJob(paperId: string): Promise<IAIInsight | null> {
    return InsightAnalysis.findOne({ paperId: new mongoose.Types.ObjectId(paperId) });
  }

  async createOrUpdateJob(paperId: string, data: Partial<IAIInsight>): Promise<IAIInsight> {
    return InsightAnalysis.findOneAndUpdate(
      { paperId: new mongoose.Types.ObjectId(paperId) },
      { $set: data },
      { new: true, upsert: true }
    );
  }
}
