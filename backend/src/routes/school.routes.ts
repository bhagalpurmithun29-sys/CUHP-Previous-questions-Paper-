import { Router } from 'express';
import { schoolController } from '../controllers/school.controller';
import { validate } from '../middlewares/validate.middleware';
import { createSchoolSchema, updateSchoolSchema, getSchoolSchema, getSchoolsQuerySchema } from '../validation/school.validation';
// import { requireAuth, requireRole } from '../middlewares/auth.middleware'; // Assuming these exist

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: School Management API
 */

/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Retrieve a list of schools
 *     tags: [Schools]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or code
 *     responses:
 *       200:
 *         description: A list of schools.
 */
router.get('/', validate(getSchoolsQuerySchema), schoolController.getSchools);

/**
 * @swagger
 * /api/schools/{id}:
 *   get:
 *     summary: Get a school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The school ID
 *     responses:
 *       200:
 *         description: The school object
 *       404:
 *         description: School not found
 */
router.get('/:id', validate(getSchoolSchema), schoolController.getSchoolById);

// Admin only routes
// router.use(requireAuth, requireRole(['ADMIN']));

/**
 * @swagger
 * /api/schools:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - schoolName
 *               - schoolCode
 *     responses:
 *       201:
 *         description: School created successfully
 *       409:
 *         description: School name or code already exists
 */
router.post('/', validate(createSchoolSchema), schoolController.createSchool);

/**
 * @swagger
 * /api/schools/{id}:
 *   put:
 *     summary: Update a school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: School updated successfully
 *       404:
 *         description: School not found
 */
router.put('/:id', validate(updateSchoolSchema), schoolController.updateSchool);

/**
 * @swagger
 * /api/schools/{id}:
 *   delete:
 *     summary: Soft delete a school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 */
router.delete('/:id', validate(getSchoolSchema), schoolController.deleteSchool);

/**
 * @swagger
 * /api/schools/{id}/restore:
 *   post:
 *     summary: Restore a deleted school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School restored successfully
 */
router.post('/:id/restore', validate(getSchoolSchema), schoolController.restoreSchool);

export default router;
