import { Router } from 'express';
import { workspaceController } from '../controllers/workspace.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', workspaceController.getWorkspaces);
router.post('/', workspaceController.createWorkspace);
router.get('/:id', workspaceController.getWorkspaceById);
router.post('/:id/members', workspaceController.addMember);
router.get('/:id/activity', workspaceController.getActivityFeed);

export default router;
