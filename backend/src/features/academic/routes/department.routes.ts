import { Router } from 'express';
import { departmentController } from '../controllers/department.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Publicly readable for authenticated users
router.use(protect);

router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartmentById);

// Write operations limited to Admin / Super Admin
router.use(restrictTo(UserRole.ADMIN));

router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.patch('/:id/archive', departmentController.archiveDepartment);
router.patch('/:id/restore', departmentController.restoreDepartment);
router.delete('/:id', departmentController.deleteDepartment);

export default router;
