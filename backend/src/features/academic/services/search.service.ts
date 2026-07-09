import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { Course } from '../../../models/course.model';
import { Semester } from '../../../models/semester.model';
import { Subject } from '../../../models/subject.model';
// Assume SearchHistory model would exist for tracking (omitted for brevity, using stubs for history endpoints)

export class SearchService {
  async globalSearch(query: any) {
    const { 
      q = '', 
      type = 'ALL', 
      status, 
      schoolId, 
      departmentId, 
      courseId, 
      limit = 20, 
      page = 1 
    } = query;

    const searchTerm = String(q).trim();
    if (!searchTerm && type === 'ALL' && !schoolId && !departmentId && !courseId) {
      return { results: [], total: 0, page: 1, totalPages: 0 };
    }

    const regex = new RegExp(searchTerm, 'i');
    const results: any[] = [];
    const promises: Promise<void>[] = [];
    let totalDocs = 0;

    const skip = (Number(page) - 1) * Number(limit);

    // Apply common filters where applicable
    const buildFilter = (baseFilter: any, isSubject = false) => {
      if (status) baseFilter.status = status;
      if (schoolId) baseFilter.schoolId = schoolId;
      if (departmentId) baseFilter.departmentId = departmentId;
      if (courseId) baseFilter.courseId = courseId;
      return baseFilter;
    };

    if (type === 'ALL' || type === 'SCHOOL') {
      promises.push((async () => {
        const filter: any = { isDeleted: false, ...buildFilter({}) };
        if (searchTerm) filter.$or = [{ schoolName: regex }, { schoolCode: regex }];
        const schools = await School.find(filter).select('_id schoolName schoolCode status').limit(Number(limit)).lean();
        schools.forEach(s => results.push({ id: s._id, name: s.schoolName, code: s.schoolCode, type: 'SCHOOL', status: s.status, path: s.schoolName }));
      })());
    }

    if (type === 'ALL' || type === 'DEPARTMENT') {
      promises.push((async () => {
        const filter: any = { isDeleted: false, ...buildFilter({}) };
        if (searchTerm) filter.$or = [{ departmentName: regex }, { departmentCode: regex }];
        const depts = await Department.find(filter).populate('schoolId', 'schoolName').select('_id departmentName departmentCode status schoolId').limit(Number(limit)).lean();
        depts.forEach(d => results.push({ id: d._id, name: d.departmentName, code: d.departmentCode, type: 'DEPARTMENT', status: d.status, path: `${(d.schoolId as any)?.schoolName} > ${d.departmentName}` }));
      })());
    }

    if (type === 'ALL' || type === 'COURSE') {
      promises.push((async () => {
        const filter: any = { isDeleted: false, ...buildFilter({}) };
        if (searchTerm) filter.$or = [{ courseName: regex }, { courseCode: regex }];
        const courses = await Course.find(filter).populate('departmentId', 'departmentName').select('_id courseName courseCode status departmentId').limit(Number(limit)).lean();
        courses.forEach(c => results.push({ id: c._id, name: c.courseName, code: c.courseCode, type: 'COURSE', status: c.status, path: `${(c.departmentId as any)?.departmentName} > ${c.courseName}` }));
      })());
    }

    if (type === 'ALL' || type === 'SEMESTER') {
      promises.push((async () => {
        const filter: any = { isDeleted: false, ...buildFilter({}) };
        if (searchTerm) filter.$or = [{ semesterName: regex }, { academicSession: regex }];
        if (!isNaN(Number(searchTerm))) filter.$or.push({ semesterNumber: Number(searchTerm) });
        const semesters = await Semester.find(filter).populate('courseId', 'courseCode courseName').select('_id semesterNumber semesterName status courseId academicSession').limit(Number(limit)).lean();
        semesters.forEach(s => results.push({ id: s._id, name: s.semesterName || `Semester ${s.semesterNumber}`, code: `SEM-${s.semesterNumber}`, type: 'SEMESTER', status: s.status, path: `${(s.courseId as any)?.courseCode} > Semester ${s.semesterNumber}` }));
      })());
    }

    if (type === 'ALL' || type === 'SUBJECT') {
      promises.push((async () => {
        const filter: any = { isDeleted: false, ...buildFilter({}, true) };
        if (searchTerm) filter.$or = [{ subjectName: regex }, { subjectCode: regex }];
        const subjects = await Subject.find(filter).populate({ path: 'semesterId', select: 'semesterNumber courseId', populate: { path: 'courseId', select: 'courseCode' } }).select('_id subjectName subjectCode status subjectType credits semesterId').limit(Number(limit)).lean();
        subjects.forEach(s => {
          const sem = s.semesterId as any;
          const path = sem && sem.courseId ? `${sem.courseId.courseCode} > Sem ${sem.semesterNumber} > ${s.subjectName}` : s.subjectName;
          results.push({ id: s._id, name: s.subjectName, code: s.subjectCode, type: 'SUBJECT', status: s.status, path, metadata: { credits: s.credits, type: s.subjectType } });
        });
      })());
    }

    await Promise.all(promises);

    // Manual client-side sorting and pagination for the aggregated results
    // For a highly scalable solution, ElasticSearch/Algolia or a unified view in MongoDB is better
    results.sort((a, b) => a.name.localeCompare(b.name));
    
    totalDocs = results.length;
    const paginatedResults = results.slice(skip, skip + Number(limit));

    // Log analytics async
    if (searchTerm) {
      this.logSearch(query.userId, searchTerm, paginatedResults.length).catch(console.error);
    }

    return {
      results: paginatedResults,
      pagination: {
        total: totalDocs,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalDocs / Number(limit))
      }
    };
  }

  async autocomplete(q: string) {
    if (!q || q.length < 2) return [];
    const regex = new RegExp(q, 'i');
    const limit = 5;
    
    const [schools, depts, courses, subjects] = await Promise.all([
      School.find({ $or: [{ schoolName: regex }, { schoolCode: regex }], isDeleted: false }).select('_id schoolName schoolCode').limit(limit).lean(),
      Department.find({ $or: [{ departmentName: regex }, { departmentCode: regex }], isDeleted: false }).select('_id departmentName departmentCode').limit(limit).lean(),
      Course.find({ $or: [{ courseName: regex }, { courseCode: regex }], isDeleted: false }).select('_id courseName courseCode').limit(limit).lean(),
      Subject.find({ $or: [{ subjectName: regex }, { subjectCode: regex }], isDeleted: false }).select('_id subjectName subjectCode').limit(limit).lean()
    ]);

    const format = (items: any[], type: string) => items.map(i => ({ id: i._id, name: i[`${type.toLowerCase()}Name`] || i.subjectName, code: i[`${type.toLowerCase()}Code`] || i.subjectCode, type }));

    return [
      ...format(subjects, 'SUBJECT'),
      ...format(courses, 'COURSE'),
      ...format(depts, 'DEPARTMENT'),
      ...format(schools, 'SCHOOL')
    ].slice(0, 10);
  }

  async logSearch(userId: string, query: string, resultCount: number) {
    // Stub for tracking search analytics
  }

  // Stubs for history & saved searches
  async getHistory(userId: string) {
    return [{ id: '1', query: 'Computer Science', timestamp: new Date() }];
  }
  async clearHistory(userId: string) { return { success: true }; }
  async getSavedSearches(userId: string) { return []; }
  async saveSearch(userId: string, data: any) { return { id: 'new-saved-search', ...data }; }
}

export const searchService = new SearchService();
