import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';
import courseRoutes from './course.routes';
import semesterRoutes from './semester.routes';
import subjectRoutes from './subject.routes';
// import departmentRoutes from './department.routes'; // Example of existing routes if they were here

const router = Router();

// v1 API Routes
router.get('/health', healthCheck);

// Mount module routers here
router.use('/courses', courseRoutes);
router.use('/semesters', semesterRoutes);
router.use('/subjects', subjectRoutes);

export default router;
