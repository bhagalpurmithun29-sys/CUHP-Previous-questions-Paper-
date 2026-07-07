import { Router } from 'express';
import { subjectController } from '../controllers/subject.controller';
import { validate } from '../middlewares/validate.middleware';
import { createSubjectSchema, updateSubjectSchema, getSubjectSchema, getSubjectsQuerySchema } from '../validation/subject.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject Management API
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Retrieve a list of subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects.
 */
router.get('/', validate(getSubjectsQuerySchema), subjectController.getSubjects);

/**
 * @swagger
 * /api/subjects/export:
 *   get:
 *     summary: Export subjects to CSV/Excel
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: File downloaded
 */
router.get('/export', validate(getSubjectsQuerySchema), subjectController.exportSubjects);

/**
 * @swagger
 * /api/subjects/import:
 *   post:
 *     summary: Import subjects from CSV/Excel
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subjects imported
 */
router.post('/import', subjectController.importSubjects);

/**
 * @swagger
 * /api/courses/{courseId}/subjects:
 *   get:
 *     summary: Retrieve subjects by course ID
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects in the course.
 */
router.get('/course/:courseId', validate(getSubjectsQuerySchema), subjectController.getSubjectsByCourse);

/**
 * @swagger
 * /api/semesters/{semesterId}/subjects:
 *   get:
 *     summary: Retrieve subjects by semester ID
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects in the semester.
 */
router.get('/semester/:semesterId', validate(getSubjectsQuerySchema), subjectController.getSubjectsBySemester);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: The subject object
 */
router.get('/:id', validate(getSubjectSchema), subjectController.getSubjectById);

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     responses:
 *       201:
 *         description: Subject created successfully
 */
router.post('/', validate(createSubjectSchema), subjectController.createSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Update a subject
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subject updated successfully
 */
router.put('/:id', validate(updateSubjectSchema), subjectController.updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Soft delete a subject
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 */
router.delete('/:id', validate(getSubjectSchema), subjectController.deleteSubject);

/**
 * @swagger
 * /api/subjects/{id}/restore:
 *   post:
 *     summary: Restore a deleted subject
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subject restored successfully
 */
router.post('/:id/restore', validate(getSubjectSchema), subjectController.restoreSubject);

/**
 * @swagger
 * /api/subjects/{id}/duplicate:
 *   post:
 *     summary: Duplicate a subject
 *     tags: [Subjects]
 *     responses:
 *       201:
 *         description: Subject duplicated successfully
 */
router.post('/:id/duplicate', validate(getSubjectSchema), subjectController.duplicateSubject);

export default router;
