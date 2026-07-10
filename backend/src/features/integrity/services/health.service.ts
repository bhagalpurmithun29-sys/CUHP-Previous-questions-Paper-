import { IntegrityService } from './integrity.service';
import { QuestionPaper } from '../../../models/paper.model';

export class RepositoryHealthService {
  private integrityService = new IntegrityService();

  async getHealthScore() {
    const totalPapers = await QuestionPaper.countDocuments({ isDeleted: { $ne: true } });
    if (totalPapers === 0) return { score: 100, status: 'HEALTHY', metrics: { totalPapers: 0, orphans: 0, missingFiles: 0, unresolvedDuplicates: 0 } };

    const issues = await this.integrityService.scanRepository();
    
    const totalIssues = issues.orphans + issues.missingFiles + issues.unresolvedDuplicates;
    const penalty = (totalIssues / totalPapers) * 100;
    const score = Math.max(0, 100 - penalty);

    let status = 'HEALTHY';
    if (score < 70) status = 'CRITICAL';
    else if (score < 90) status = 'WARNING';

    return {
      score: Math.round(score),
      status,
      metrics: {
        totalPapers,
        ...issues
      }
    };
  }
}
