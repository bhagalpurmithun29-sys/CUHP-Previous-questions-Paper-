import { Router } from 'express';
import { hierarchyController } from '../controllers/hierarchy.controller';
import { protect } from '../../auth/middlewares/auth.middleware';

const router = Router();

// All hierarchy routes are read-oriented or user-profile scoped (favorites)
router.use(protect);

router.get('/tree', hierarchyController.getTree);
router.get('/breadcrumbs', hierarchyController.getBreadcrumbs);
router.get('/recent', hierarchyController.getRecent);
router.get('/favorites', hierarchyController.getFavorites);
router.post('/favorites', hierarchyController.addFavorite);
router.delete('/favorites/:id', hierarchyController.removeFavorite);

export default router;
