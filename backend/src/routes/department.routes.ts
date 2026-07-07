import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';
import { validate } from '../middlewares/validate.middleware';
import { createDepartmentSchema, updateDepartmentSchema, getDepartmentSchema, getDepartmentsQuerySchema, getDepartmentsBySchoolSchema } from '../validation/department.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department Management API
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Retrieve a list of departments
 *     tags: [Departments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: schoolId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of departments.
 */
router.get('/', validate(getDepartmentsQuerySchema), departmentController.getDepartments);

/**
 * @swagger
 * /api/schools/{schoolId}/departments:
 *   get:
 *     summary: Retrieve departments by school ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of departments in the school.
 */
router.get('/school/:schoolId', validate(getDepartmentsBySchoolSchema), departmentController.getDepartmentsBySchool);

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The department object
 */
router.get('/:id', validate(getDepartmentSchema), departmentController.getDepartmentById);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentName
 *               - departmentCode
 *               - schoolId
 *     responses:
 *       201:
 *         description: Department created successfully
 */
router.post('/', validate(createDepartmentSchema), departmentController.createDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update a department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Department updated successfully
 */
router.put('/:id', validate(updateDepartmentSchema), departmentController.updateDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Soft delete a department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Department deleted successfully
 */
router.delete('/:id', validate(getDepartmentSchema), departmentController.deleteDepartment);

/**
 * @swagger
 * /api/departments/{id}/restore:
 *   post:
 *     summary: Restore a deleted department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Department restored successfully
 */
router.post('/:id/restore', validate(getDepartmentSchema), departmentController.restoreDepartment);

export default router;
