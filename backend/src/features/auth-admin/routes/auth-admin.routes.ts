import { Router } from 'express';
import { authAdminController } from '../controllers/auth-admin.controller';
// Re-using existing auth middleware assuming it's available
import { protect, restrictTo } from '../../auth/middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Secure all routes - only accessible by Admin and Super Admin
router.use(protect);
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

// Dashboard & Overview
router.get('/dashboard', authAdminController.getDashboard);

// Audit Logs
router.get('/audit', authAdminController.getAuditLogs);

// Security Analytics
router.get('/security', authAdminController.getSecurityEvents);

// Identity Providers
router.get('/providers', authAdminController.getIdentityProviders);

// Policies
router.get('/policies/password', authAdminController.getPasswordPolicy);
router.put('/policies/password', authAdminController.updatePasswordPolicy);

// Reporting
router.get('/reports', authAdminController.generateReport);

export default router;
