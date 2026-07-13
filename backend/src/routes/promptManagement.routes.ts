import { Router } from 'express';
import { promptManagementController } from '../controllers/promptManagement.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('admin')); // AI Administrator, Prompt Engineer

router.route('/')
  .get(promptManagementController.getAllPrompts)
  .post(promptManagementController.createPrompt);

router.post('/test', promptManagementController.testPrompt);
router.post('/extract-variables', promptManagementController.extractVariables);

router.route('/:id')
  .get(promptManagementController.getPromptById)
  .put(promptManagementController.updatePrompt);

router.post('/:id/publish', promptManagementController.publishVersion);
router.post('/:id/rollback', promptManagementController.rollbackVersion);
router.post('/:id/request-approval', promptManagementController.requestApproval);
router.post('/:id/approve', promptManagementController.approveVersion);

export default router;
