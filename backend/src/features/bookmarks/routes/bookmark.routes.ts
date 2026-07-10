import { Router } from 'express';
import { BookmarkController } from '../controllers/bookmark.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new BookmarkController();

router.use(protect);

router.post('/sync', controller.syncBookmarks);

// Reading lists routes should be defined before /:id to avoid "reading-lists" being treated as an id
router.route('/reading-lists')
  .get(controller.getReadingLists)
  .post(controller.createReadingList);

router.route('/reading-lists/:id')
  .put(controller.updateReadingList)
  .delete(controller.deleteReadingList);

router.route('/')
  .get(controller.getBookmarks)
  .post(controller.addBookmark);

router.route('/:id')
  .put(controller.updateBookmark)
  .delete(controller.deleteBookmark);

export default router;
