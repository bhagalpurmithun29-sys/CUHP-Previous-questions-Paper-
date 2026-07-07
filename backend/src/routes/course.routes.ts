import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCourseSchema, updateCourseSchema, getCourseSchema, getCoursesQuerySchema } from '../validation/course.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course Management API
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses.
 */
router.get('/', validate(getCoursesQuerySchema), courseController.getCourses);

/**
 * @swagger
 * /api/courses/export:
 *   get:
 *     summary: Export courses to CSV/Excel
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: File downloaded
 */
router.get('/export', validate(getCoursesQuerySchema), courseController.exportCourses);

/**
 * @swagger
 * /api/courses/import:
 *   post:
 *     summary: Import courses from CSV/Excel
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Courses imported
 */
router.post('/import', courseController.importCourses);

/**
 * @swagger
 * /api/schools/{schoolId}/courses:
 *   get:
 *     summary: Retrieve courses by school ID
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses in the school.
 */
router.get('/school/:schoolId', validate(getCoursesQuerySchema), courseController.getCoursesBySchool);

/**
 * @swagger
 * /api/departments/{departmentId}/courses:
 *   get:
 *     summary: Retrieve courses by department ID
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses in the department.
 */
router.get('/department/:departmentId', validate(getCoursesQuerySchema), courseController.getCoursesByDepartment);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The course object
 */
router.get('/:id', validate(getCourseSchema), courseController.getCourseById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post('/', validate(createCourseSchema), courseController.createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/:id', validate(updateCourseSchema), courseController.updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Soft delete a course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/:id', validate(getCourseSchema), courseController.deleteCourse);

/**
 * @swagger
 * /api/courses/{id}/restore:
 *   post:
 *     summary: Restore a deleted course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Course restored successfully
 */
router.post('/:id/restore', validate(getCourseSchema), courseController.restoreCourse);

export default router;
