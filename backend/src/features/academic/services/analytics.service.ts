import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { Course } from '../../../models/course.model';
import { Semester } from '../../../models/semester.model';
import { Subject } from '../../../models/subject.model';

export class AnalyticsService {
  async getOverview() {
    const [schools, departments, courses, semesters, subjects] = await Promise.all([
      School.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Department.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Course.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Semester.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Subject.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    ]);

    const formatCounts = (agg: any[]) => {
      let active = 0, archived = 0;
      agg.forEach(a => {
        if (a._id === 'ACTIVE') active += a.count;
        if (a._id === 'ARCHIVED') archived += a.count;
      });
      return { total: active + archived, active, archived };
    };

    return {
      schools: formatCounts(schools),
      departments: formatCounts(departments),
      courses: formatCounts(courses),
      semesters: formatCounts(semesters),
      subjects: formatCounts(subjects)
    };
  }

  async getGrowth() {
    // Group by month created using aggregation
    const pipeline = [
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 }
    ];

    const [schools, subjects] = await Promise.all([
      School.aggregate(pipeline),
      Subject.aggregate(pipeline)
    ]);

    const formatGrowth = (data: any[]) => data.map(d => ({
      name: `${d._id.year}-${String(d._id.month).padStart(2, '0')}`,
      value: d.count
    }));

    return {
      schools: formatGrowth(schools),
      subjects: formatGrowth(subjects)
    };
  }

  async getDataQuality() {
    // Find entities with missing or malformed codes
    const brokenDepartments = await Department.countDocuments({ schoolId: { $exists: false } });
    const brokenCourses = await Course.countDocuments({ departmentId: { $exists: false } });
    const brokenSubjects = await Subject.countDocuments({ credits: { $exists: false } });

    return {
      brokenRelationships: brokenDepartments + brokenCourses,
      missingMetadata: brokenSubjects,
      score: 100 - Math.min((brokenDepartments + brokenCourses + brokenSubjects) * 2, 100) // Dummy score
    };
  }

  async getDistribution() {
    // Get count of subjects per school (Requires lookup)
    const subjectDistribution = await School.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: 'schoolId',
          as: 'depts'
        }
      },
      {
        $project: {
          name: '$schoolName',
          deptCount: { $size: '$depts' }
        }
      }
    ]);

    return {
      departmentsPerSchool: subjectDistribution.map(d => ({ name: d.name, value: d.deptCount }))
    };
  }

  async generateReport(options: any) {
    // Generate a downloadable JSON snapshot of current stats
    const overview = await this.getOverview();
    const quality = await this.getDataQuality();
    
    return {
      reportDate: new Date(),
      options,
      overview,
      quality
    };
  }
}

export const analyticsService = new AnalyticsService();
