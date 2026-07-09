import { QuestionPaper } from '../models/paper.model';
import { User } from '../models/user.model';
import { Department } from '../models/department.model';
import { Course } from '../models/course.model';
import { Semester } from '../models/semester.model';
import { Subject } from '../models/subject.model';
import { ActivityLog } from '../models/activityLog.model';
import { PaperApprovalStatus, PaperVisibility } from '../interfaces/paper.interface';

export class PublicStatsService {
  async getStatistics() {
    const [
      totalPapers,
      approvedPapers,
      totalDepartments,
      totalCourses,
      totalSemesters,
      totalSubjects,
      registeredUsers,
      totalDownloads,
      totalBookmarks
    ] = await Promise.all([
      QuestionPaper.countDocuments({ isDeleted: false }),
      QuestionPaper.countDocuments({ isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC }),
      Department.countDocuments({ isDeleted: false }),
      Course.countDocuments({ isDeleted: false }),
      Semester.countDocuments({ isDeleted: false }),
      Subject.countDocuments({ isDeleted: false }),
      User.countDocuments({ isDeleted: false }),
      QuestionPaper.aggregate([{ $match: { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED } }, { $group: { _id: null, total: { $sum: '$downloadCount' } } }]),
      QuestionPaper.aggregate([{ $match: { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED } }, { $group: { _id: null, total: { $sum: '$bookmarkCount' } } }])
    ]);

    const contributors = await User.countDocuments({ isDeleted: false, contributionScore: { $gt: 0 } });

    return {
      totalQuestionPapers: totalPapers,
      approvedPapers,
      departments: totalDepartments,
      courses: totalCourses,
      semesters: totalSemesters,
      subjects: totalSubjects,
      registeredUsers,
      contributors,
      downloads: totalDownloads[0]?.total || 0,
      bookmarks: totalBookmarks[0]?.total || 0
    };
  }

  async getCoverage() {
    // A simplified coverage overview using aggregations
    // Percentage of subjects that have at least one approved paper
    const subjectsWithPapers = await QuestionPaper.distinct('subjectId', { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC });
    const totalSubjects = await Subject.countDocuments({ isDeleted: false });
    const coveragePercentage = totalSubjects > 0 ? (subjectsWithPapers.length / totalSubjects) * 100 : 0;

    const coverageByDepartment = await QuestionPaper.aggregate([
      { $match: { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC } },
      { $group: { _id: '$departmentId', count: { $sum: 1 } } },
      { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
      { $project: { name: '$department.name', count: 1 } },
      { $sort: { count: -1 } }
    ]);

    const coverageByCourse = await QuestionPaper.aggregate([
      { $match: { isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC } },
      { $group: { _id: '$courseId', count: { $sum: 1 } } },
      { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
      { $unwind: '$course' },
      { $project: { name: '$course.name', count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Subjects with no papers (Missing Papers)
    const allSubjectIds = await Subject.find({ isDeleted: false }).distinct('_id');
    const missingSubjectIds = allSubjectIds.filter(id => !subjectsWithPapers.map(s => s.toString()).includes(id.toString()));
    const subjectsWithNoPapers = await Subject.find({ _id: { $in: missingSubjectIds } }).limit(10).select('name code');

    return {
      coveragePercentage: Math.round(coveragePercentage * 10) / 10,
      coverageByDepartment,
      coverageByCourse,
      missingPapers: {
        subjectsWithNoPapers
      }
    };
  }

  async getTrending() {
    const trendingPapers = await QuestionPaper.find({ isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC })
      .sort({ downloadCount: -1, viewCount: -1 })
      .limit(10)
      .select('title subjectId paperId downloadCount viewCount createdAt')
      .populate('subjectId', 'name code');

    const topContributors = await User.find({ isDeleted: false, contributionScore: { $gt: 0 } })
      .sort({ contributionScore: -1 })
      .limit(5)
      .select('firstName lastName avatarUrl contributionScore');

    return {
      trendingPapers,
      topContributors
    };
  }

  async getActivity() {
    // Latest public-safe moderation activity and contributions
    const recentActivity = await ActivityLog.find({ 
      action: { $in: ['UPLOAD', 'VERIFY'] },
      visibility: { $ne: 'PRIVATE' } // assuming logic allows safe exposure
    })
      .sort({ createdAt: -1 })
      .limit(15)
      .populate('userId', 'firstName lastName avatarUrl')
      .lean();

    const recentApprovedPapers = await QuestionPaper.find({ isDeleted: false, approvalStatus: PaperApprovalStatus.APPROVED, visibility: PaperVisibility.PUBLIC })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title subjectId createdAt')
      .populate('subjectId', 'name code');

    return {
      recentActivity,
      recentApprovedPapers
    };
  }

  async generateReportBuffer(format: string): Promise<any> {
    // Placeholder for report generation. In production, this would use a library like PDFKit, exceljs or fast-csv.
    return { message: `Report generated in ${format} format.` };
  }
}

export const publicStatsService = new PublicStatsService();
