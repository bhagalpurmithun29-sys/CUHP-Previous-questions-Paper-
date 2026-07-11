import { Router } from 'express';
import { academicController } from '../controllers/academic.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Public / Read-Only (Accessible by any authenticated user for browsing)
router.use(protect);

router.get('/', academicController.getOverview);
router.get('/tree', academicController.getTree);
router.get('/schools', academicController.getSchools);
router.get('/departments', academicController.getDepartments);
router.get('/courses', academicController.getCourses);
router.get('/semesters', academicController.getSemesters);
router.get('/subjects', academicController.getSubjects);

// Admin / Write Operations
router.use(restrictTo(UserRole.ADMIN));

router.post('/school', academicController.createSchool);
router.post('/department', academicController.createDepartment);
router.post('/course', academicController.createCourse);
router.post('/semester', academicController.createSemester);
router.post('/subject', academicController.createSubject);

export default router;
