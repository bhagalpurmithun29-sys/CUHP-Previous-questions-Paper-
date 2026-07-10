import { QuestionPaper as Paper } from '../../../models/paper.model';
import { User } from '../../../models/user.model';

export class RecommendationService {
  async getRecommendations(userId: string) {
    const user = await User.findById(userId);
    const query: any = { status: 'PUBLISHED' };
    
    if (user?.departmentId) query.departmentId = user.departmentId;
    if (user?.semester) query.semester = user.semester;
    
    return Paper.find(query)
      .sort({ views: -1, downloads: -1 })
      .limit(10)
      .select('title format schoolId departmentId subjectId views downloads');
  }
}
