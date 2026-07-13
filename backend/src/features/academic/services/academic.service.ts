import { School } from '../../../models/school.model';
import { Department } from '../../../models/department.model';
import { Course } from '../../../models/course.model';
import { Semester } from '../../../models/semester.model';
import { Subject } from '../../../models/subject.model';
import { AppError } from '../../../utils/AppError';
import mongoose from 'mongoose';

export class AcademicService {
  // Tree & Hierarchy
  async getAcademicTree() {
    // Generate complete hierarchy
    const schools = await School.find({ isDeleted: false }).lean();
    const departments = await Department.find({ isDeleted: false }).lean();
    const courses = await Course.find({ isDeleted: false }).lean();
    const semesters = await Semester.find({ isDeleted: false }).lean();
    const subjects = await Subject.find({ isDeleted: false }).lean();

    const tree = schools.map(school => ({
      ...school,
      type: 'school',
      children: departments
        .filter(d => d.schoolId?.toString() === school._id.toString())
        .map(dept => ({
          ...dept,
          type: 'department',
          children: courses
            .filter(c => c.departmentId?.toString() === dept._id.toString())
            .map(course => ({
              ...course,
              type: 'course',
              children: semesters
                .filter(sem => sem.courseId?.toString() === course._id.toString())
                .map(sem => ({
                  ...sem,
                  type: 'semester',
                  children: subjects
                    .filter(sub => sub.semesterId?.toString() === sem._id.toString())
                    .map(sub => ({ ...sub, type: 'subject' }))
                }))
            }))
        }))
    }));

    return tree;
  }

  async getAcademicOverview() {
    const [schools, departments, courses, semesters, subjects] = await Promise.all([
      School.countDocuments({ isDeleted: false }),
      Department.countDocuments({ isDeleted: false }),
      Course.countDocuments({ isDeleted: false }),
      Semester.countDocuments({ isDeleted: false }),
      Subject.countDocuments({ isDeleted: false })
    ]);
    return { schools, departments, courses, semesters, subjects };
  }

  // School
  async getSchools() {
    return School.find({ isDeleted: false }).sort({ schoolName: 1 });
  }

  async createSchool(data: any, userId: string) {
    const existing = await School.findOne({ schoolCode: data.schoolCode, isDeleted: false });
    if (existing) throw new AppError('School code already exists', 400);

    const school = new School({ ...data, createdBy: userId });
    await school.save();
    return school;
  }

  // Department
  async getDepartments(schoolId?: string) {
    const filter: any = { isDeleted: false };
    if (schoolId) filter.schoolId = schoolId;
    return Department.find(filter).populate('schoolId', 'schoolName schoolCode').sort({ departmentName: 1 });
  }

  async createDepartment(data: any, userId: string) {
    const existing = await Department.findOne({ departmentCode: data.departmentCode, isDeleted: false });
    if (existing) throw new AppError('Department code already exists', 400);

    const department = new Department({ ...data, createdBy: userId });
    await department.save();
    return department;
  }

  // Course
  async getCourses(departmentId?: string) {
    const filter: any = { isDeleted: false };
    if (departmentId) filter.department = departmentId;
    return Course.find(filter).populate('department', 'departmentName departmentCode').sort({ courseName: 1 });
  }

  async createCourse(data: any, userId: string) {
    const existing = await Course.findOne({ courseCode: data.courseCode, isDeleted: false });
    if (existing) throw new AppError('Course code already exists', 400);

    const course = new Course({ ...data, createdBy: userId });
    await course.save();
    return course;
  }

  // Semester
  async getSemesters(courseId?: string) {
    const filter: any = { isDeleted: false };
    if (courseId) filter.course = courseId;
    return Semester.find(filter).populate('course', 'courseName courseCode').sort({ semesterNumber: 1 });
  }

  async createSemester(data: any, userId: string) {
    const semester = new Semester({ ...data, createdBy: userId });
    await semester.save();
    return semester;
  }

  // Subject
  async getSubjects(semesterId?: string) {
    const filter: any = { isDeleted: false };
    if (semesterId) filter.semester = semesterId;
    return Subject.find(filter).populate('semester', 'semesterNumber').sort({ subjectCode: 1 });
  }

  async createSubject(data: any, userId: string) {
    const existing = await Subject.findOne({ subjectCode: data.subjectCode, isDeleted: false });
    if (existing) throw new AppError('Subject code already exists', 400);

    const subject = new Subject({ ...data, createdBy: userId });
    await subject.save();
    return subject;
  }
}

export const academicService = new AcademicService();
