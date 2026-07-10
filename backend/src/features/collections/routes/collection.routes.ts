import { Router } from 'express';
import { CollectionController } from '../controllers/collection.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new CollectionController();

router.use(protect);

router.get('/', controller.getCollections);
router.post('/', controller.createCollection);
router.get('/:id', controller.getCollectionById);
router.put('/:id', controller.updateCollection);
router.delete('/:id', controller.deleteCollection);

export default router;
