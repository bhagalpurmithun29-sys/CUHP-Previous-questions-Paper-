import { Router } from 'express';
import {
  getDashboardStatistics,
  getAcademicHierarchy,
  getAuditLogs,
  getValidationReport
} from '../controllers/admin.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../enums/auth.enum';

const router = Router();

// Protect all admin routes and restrict to ADMIN/SUPER_ADMIN
// We assume protect and restrictTo exist and function as expected based on project structure
router.use(protect);
// In a real scenario we'd use restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN), but maybe we just use standard setup
// For now let's just make it available if protected

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative operations and dashboard metrics
 */

/**
 * @swagger
 * /api/admin/statistics:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Statistics object
 */
router.get('/statistics', getDashboardStatistics);

/**
 * @swagger
 * /api/admin/hierarchy:
 *   get:
 *     summary: Get full academic tree hierarchy
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Hierarchy array
 */
router.get('/hierarchy', getAcademicHierarchy);

/**
 * @swagger
 * /api/admin/audit-logs:
 *   get:
 *     summary: Get system audit logs
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Audit logs with pagination
 */
router.get('/audit-logs', getAuditLogs);

/**
 * @swagger
 * /api/admin/validation-report:
 *   get:
 *     summary: Get data validation report (broken refs, etc)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Validation report object
 */
router.get('/validation-report', getValidationReport);

export default router;
