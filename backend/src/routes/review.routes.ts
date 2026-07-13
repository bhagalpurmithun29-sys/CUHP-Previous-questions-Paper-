import { Router } from 'express';
import { reviewController } from '../controllers/review.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/threads/:resourceId', reviewController.getThreads);
router.post('/thread', reviewController.createThread);
router.get('/comments/:threadId', reviewController.getComments);
router.post('/comment', reviewController.addComment);
router.post('/resolve/:threadId', reviewController.resolveThread);

export default router;
