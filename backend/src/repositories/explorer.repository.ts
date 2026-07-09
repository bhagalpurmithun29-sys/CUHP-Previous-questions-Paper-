import { QuestionPaper } from '../models/paper.model';
import { PaperApprovalStatus, PaperVisibility } from '../interfaces/paper.interface';
import { GetPapersDto } from '../dtos/explorer.dto';

export class ExplorerRepository {
  async findPapers(filters: GetPapersDto) {
    const { page = 1, limit = 12, sort = 'newest', search, ...exactFilters } = filters;
    const skip = (page - 1) * limit;

    const query: any = {
      approvalStatus: PaperApprovalStatus.APPROVED,
      visibility: PaperVisibility.PUBLIC,
      isDeleted: false,
    };

    if (search) {
      query.$text = { $search: search };
    }

    Object.keys(exactFilters).forEach(key => {
      // @ts-ignore
      if (exactFilters[key]) {
        // @ts-ignore
        query[key] = exactFilters[key];
      }
    });

    let sortObj: any = { createdAt: -1 };
    switch (sort) {
      case 'oldest': sortObj = { createdAt: 1 }; break;
      case 'most_downloaded': sortObj = { downloadCount: -1 }; break;
      case 'most_viewed': sortObj = { viewCount: -1 }; break;
      case 'most_bookmarked': sortObj = { bookmarkCount: -1 }; break;
      case 'alphabetical': sortObj = { title: 1 }; break;
      case 'newest':
      default:
        sortObj = { createdAt: -1 }; break;
    }

    // Only text score sort if searching
    if (search && sort === 'relevance') {
      sortObj = { score: { $meta: 'textScore' } };
    }

    const [papers, total] = await Promise.all([
      QuestionPaper.find(query)
        .populate('subjectId', 'name code')
        .populate('departmentId', 'name')
        .populate('courseId', 'name')
        .populate('semesterId', 'number')
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      QuestionPaper.countDocuments(query)
    ]);

    return { papers, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findPaperById(id: string) {
    return QuestionPaper.findOne({
      _id: id,
      approvalStatus: PaperApprovalStatus.APPROVED,
      visibility: PaperVisibility.PUBLIC,
      isDeleted: false,
    })
    .populate('subjectId', 'name code')
    .populate('departmentId', 'name')
    .populate('courseId', 'name')
    .populate('semesterId', 'number')
    .populate('schoolId', 'name')
    .populate('uploaderId', 'firstName lastName avatarUrl')
    .lean();
  }

  async incrementViewCount(id: string) {
    await QuestionPaper.updateOne({ _id: id }, { $inc: { viewCount: 1 } });
  }
}

export const explorerRepository = new ExplorerRepository();
