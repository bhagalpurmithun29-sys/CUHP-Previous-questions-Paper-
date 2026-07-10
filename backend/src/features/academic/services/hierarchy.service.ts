import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { Course } from '../../../models/course.model';
import { Semester } from '../../../models/semester.model';
import { Subject } from '../../../models/subject.model';
import { AppError } from '../../../utils/AppError';

export class HierarchyService {
  async getTree(parentId?: string, type?: string) {
    // If no parentId is provided, return the top level (Schools)
    if (!parentId || !type) {
      const schools = await School.find({ isDeleted: false })
        .select('_id schoolName schoolCode status')
        .sort({ displayOrder: 1, schoolName: 1 })
        .lean();
      
      return schools.map(s => ({
        id: s._id,
        name: s.schoolName,
        code: s.schoolCode,
        type: 'SCHOOL',
        status: s.status,
        hasChildren: true // Assume true for lazy loading, frontend will fetch if expanded
      }));
    }

    // Lazy load children based on parent type
    switch (type.toUpperCase()) {
      case 'SCHOOL': {
        const departments = await Department.find({ schoolId: parentId, isDeleted: false })
          .select('_id departmentName departmentCode status')
          .sort({ displayOrder: 1, departmentName: 1 })
          .lean();
        return departments.map(d => ({
          id: d._id,
          name: d.departmentName,
          code: d.departmentCode,
          type: 'DEPARTMENT',
          status: d.status,
          hasChildren: true
        }));
      }
      
      case 'DEPARTMENT': {
        const courses = await Course.find({ departmentId: parentId, isDeleted: false })
          .select('_id courseName courseCode status')
          .sort({ courseName: 1 })
          .lean();
        return courses.map(c => ({
          id: c._id,
          name: c.courseName,
          code: c.courseCode,
          type: 'COURSE',
          status: c.status,
          hasChildren: true
        }));
      }

      case 'COURSE': {
        const semesters = await Semester.find({ courseId: parentId, isDeleted: false })
          .select('_id semesterNumber semesterName status')
          .sort({ semesterNumber: 1 })
          .lean();
        return semesters.map(s => ({
          id: s._id,
          name: s.semesterName || `Semester ${s.semesterNumber}`,
          code: `SEM-${s.semesterNumber}`,
          type: 'SEMESTER',
          status: s.status,
          hasChildren: true
        }));
      }

      case 'SEMESTER': {
        const subjects = await Subject.find({ semesterId: parentId, isDeleted: false })
          .select('_id subjectName subjectCode status subjectType credits')
          .sort({ subjectName: 1 })
          .lean();
        return subjects.map(s => ({
          id: s._id,
          name: s.subjectName,
          code: s.subjectCode,
          type: 'SUBJECT',
          status: s.status,
          hasChildren: false,
          metadata: { subjectType: s.subjectType, credits: s.credits }
        }));
      }

      default:
        throw new AppError('Invalid hierarchy type requested', 400);
    }
  }

  async getBreadcrumbs(nodeId: string, type: string) {
    const breadcrumbs = [];
    
    switch (type.toUpperCase()) {
      case 'SUBJECT': {
        const subject = await Subject.findById(nodeId).select('subjectName semesterId').lean();
        if (subject) {
          breadcrumbs.unshift({ id: subject._id, name: subject.subjectName, type: 'SUBJECT' });
          nodeId = subject.semesterId as any;
        } else break;
      }
      // eslint-disable-next-line no-fallthrough
      case 'SEMESTER': {
        const semester = await Semester.findById(nodeId).select('semesterNumber courseId').lean();
        if (semester) {
          breadcrumbs.unshift({ id: semester._id, name: `Semester ${semester.semesterNumber}`, type: 'SEMESTER' });
          nodeId = semester.courseId as any;
        } else break;
      }
      // eslint-disable-next-line no-fallthrough
      case 'COURSE': {
        const course = await Course.findById(nodeId).select('courseName departmentId').lean();
        if (course) {
          breadcrumbs.unshift({ id: course._id, name: course.courseName, type: 'COURSE' });
          nodeId = course.departmentId as any;
        } else break;
      }
      // eslint-disable-next-line no-fallthrough
      case 'DEPARTMENT': {
        const dept = await Department.findById(nodeId).select('departmentName schoolId').lean();
        if (dept) {
          breadcrumbs.unshift({ id: dept._id, name: dept.departmentName, type: 'DEPARTMENT' });
          nodeId = dept.schoolId as any;
        } else break;
      }
      // eslint-disable-next-line no-fallthrough
      case 'SCHOOL': {
        const school = await School.findById(nodeId).select('schoolName').lean();
        if (school) {
          breadcrumbs.unshift({ id: school._id, name: school.schoolName, type: 'SCHOOL' });
        }
        break;
      }
    }
    
    return breadcrumbs;
  }

  // Stubs for Favorites/Recents to be stored in UserProfile later
  async getRecent(userId: string) {
    return []; // Placeholder for recent items
  }

  async getFavorites(userId: string) {
    return []; // Placeholder for favorites
  }

  async addFavorite(userId: string, nodeId: string, type: string) {
    return { success: true };
  }

  async removeFavorite(userId: string, nodeId: string) {
    return { success: true };
  }
}

export const hierarchyService = new HierarchyService();
