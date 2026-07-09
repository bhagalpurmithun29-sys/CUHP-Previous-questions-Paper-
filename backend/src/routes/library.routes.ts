import { Router } from 'express';
import { libraryController } from '../controllers/library.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: Personal Library, Bookmarks & Collections
 */

// All library routes require authentication
router.use(protect);

// Dashboard
router.get('/', libraryController.getDashboard);

// Bookmarks & Favorites
router.get('/bookmarks', libraryController.getBookmarks);
router.post('/bookmarks', libraryController.toggleBookmark);
router.post('/favorites', libraryController.toggleFavorite);

// Continue Reading
router.post('/progress', libraryController.updateProgress);

// Collections
router.get('/collections', libraryController.getCollections);
router.post('/collections', libraryController.createCollection);
router.get('/collections/:id', libraryController.getCollectionDetails);
router.put('/collections/:id', libraryController.updateCollection);
router.delete('/collections/:id', libraryController.deleteCollection);

// Collection Items
router.post('/collections/:id/papers', libraryController.addToCollection);
router.delete('/collections/:id/papers/:paperId', libraryController.removeFromCollection);

export default router;
