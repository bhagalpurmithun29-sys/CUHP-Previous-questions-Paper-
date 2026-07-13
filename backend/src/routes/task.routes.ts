import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', taskController.getTasks);
router.get('/workflows', taskController.getWorkflows);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.post('/:id/assign', taskController.assignTask);
router.post('/:id/status', taskController.updateStatus);

export default router;
