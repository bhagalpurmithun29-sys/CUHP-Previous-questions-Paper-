import { Router } from 'express';
import { semesterController } from '../controllers/semester.controller';
import { validate } from '../middlewares/validate.middleware';
import { createSemesterSchema, updateSemesterSchema, getSemesterSchema, getSemestersQuerySchema } from '../validation/semester.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Semesters
 *   description: Semester Management API
 */

/**
 * @swagger
 * /api/semesters:
 *   get:
 *     summary: Retrieve a list of semesters
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: A list of semesters.
 */
router.get('/', validate(getSemestersQuerySchema), semesterController.getSemesters);

/**
 * @swagger
 * /api/semesters/export:
 *   get:
 *     summary: Export semesters to CSV/Excel
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: File downloaded
 */
router.get('/export', validate(getSemestersQuerySchema), semesterController.exportSemesters);

/**
 * @swagger
 * /api/semesters/import:
 *   post:
 *     summary: Import semesters from CSV/Excel
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: Semesters imported
 */
router.post('/import', semesterController.importSemesters);

/**
 * @swagger
 * /api/courses/{courseId}/semesters:
 *   get:
 *     summary: Retrieve semesters by course ID
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: A list of semesters in the course.
 */
router.get('/course/:courseId', validate(getSemestersQuerySchema), semesterController.getSemestersByCourse);

/**
 * @swagger
 * /api/semesters/{id}:
 *   get:
 *     summary: Get a semester by ID
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: The semester object
 */
router.get('/:id', validate(getSemesterSchema), semesterController.getSemesterById);

/**
 * @swagger
 * /api/semesters:
 *   post:
 *     summary: Create a new semester
 *     tags: [Semesters]
 *     responses:
 *       201:
 *         description: Semester created successfully
 */
router.post('/', validate(createSemesterSchema), semesterController.createSemester);

/**
 * @swagger
 * /api/semesters/{id}:
 *   put:
 *     summary: Update a semester
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: Semester updated successfully
 */
router.put('/:id', validate(updateSemesterSchema), semesterController.updateSemester);

/**
 * @swagger
 * /api/semesters/{id}:
 *   delete:
 *     summary: Soft delete a semester
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: Semester deleted successfully
 */
router.delete('/:id', validate(getSemesterSchema), semesterController.deleteSemester);

/**
 * @swagger
 * /api/semesters/{id}/restore:
 *   post:
 *     summary: Restore a deleted semester
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: Semester restored successfully
 */
router.post('/:id/restore', validate(getSemesterSchema), semesterController.restoreSemester);

/**
 * @swagger
 * /api/semesters/{id}/activate:
 *   post:
 *     summary: Activate a semester
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: Semester activated successfully
 */
router.post('/:id/activate', validate(getSemesterSchema), semesterController.activateSemester);


export default router;
