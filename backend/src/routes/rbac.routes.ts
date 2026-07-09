import { Router } from 'express';
import { rbacController } from '../controllers/rbac.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: RBAC
 *   description: Enterprise User, Role & Permission Management APIs
 */

// Super Admin Only
router.use(protect);
router.use(restrictTo('SUPER_ADMIN'));

// Permissions
router.get('/permissions', rbacController.getPermissions);
router.post('/permissions', rbacController.createPermission);
router.delete('/permissions/:id', rbacController.deletePermission);

// Roles
router.get('/roles', rbacController.getRoles);
router.post('/roles', rbacController.createRole);
router.put('/roles/:id', rbacController.updateRole);
router.delete('/roles/:id', rbacController.deleteRole);

// User Matrix
router.get('/matrix', rbacController.getUserMatrix);
router.post('/users/:userId/roles', rbacController.assignRoles);
router.delete('/users/:userId/roles/:roleId', rbacController.removeRole);

export default router;
