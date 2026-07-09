import { School } from '../models/school.model';
import { Department } from '../models/department.model';
import { Course } from '../models/course.model';
import { Semester } from '../models/semester.model';
import { Subject } from '../models/subject.model';
import { ActivityLog } from '../models/activityLog.model';
import { AppError } from '../utils/AppError';

export class AdminService {
  async getStatistics() {
    const [
      schools, departments, courses, semesters, subjects
    ] = await Promise.all([
      School.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Department.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Course.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Semester.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Subject.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
    ]);

    const formatStats = (aggs: any[]) => {
      const active = aggs.find(a => a._id === 'ACTIVE' || a._id === 'UPCOMING' || a._id === 'ONGOING')?.count || 0;
      const archived = aggs.find(a => a._id === 'ARCHIVED' || a._id === 'INACTIVE' || a._id === 'COMPLETED')?.count || 0;
      return { total: active + archived, active, archived };
    };

    return {
      schools: formatStats(schools),
      departments: formatStats(departments),
      courses: formatStats(courses),
      semesters: formatStats(semesters),
      subjects: formatStats(subjects),
    };
  }

  async getAcademicHierarchy() {
    // Uses aggregation to build the tree
    return await School.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: 'schoolId',
          as: 'departments',
          pipeline: [
            { $match: { isDeleted: false } },
            {
              $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: 'departmentId',
                as: 'courses',
                pipeline: [
                  { $match: { isDeleted: false } },
                  { $project: { _id: 1, courseName: 1, courseCode: 1, status: 1 } }
                ]
              }
            },
            { $project: { _id: 1, departmentName: 1, departmentCode: 1, status: 1, courses: 1 } }
          ]
        }
      },
      { $project: { _id: 1, schoolName: 1, schoolCode: 1, status: 1, departments: 1 } }
    ]);
  }

  async getAuditLogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      ActivityLog.find()
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ActivityLog.countDocuments()
    ]);

    return {
      logs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getValidationReport() {
    // Check for broken references or duplicate codes
    const missingSchoolDepartments = await Department.find({ isDeleted: false })
      .populate('schoolId')
      .then(deps => deps.filter(d => !d.schoolId || (d.schoolId as any).isDeleted));

    const missingDepartmentCourses = await Course.find({ isDeleted: false })
      .populate('departmentId')
      .then(courses => courses.filter(c => !c.departmentId || (c.departmentId as any).isDeleted));

    return {
      brokenReferences: {
        departmentsWithoutValidSchool: missingSchoolDepartments.map(d => d._id),
        coursesWithoutValidDepartment: missingDepartmentCourses.map(c => c._id),
      },
      // You can add more complex duplicate checks if needed
    };
  }
}
