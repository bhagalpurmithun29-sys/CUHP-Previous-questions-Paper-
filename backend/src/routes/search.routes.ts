import { Router } from 'express';
import {
  globalSearch,
  autocomplete,
  getRecentSearches,
  getPinnedSearches,
  clearRecentSearches,
  getTrendingSearches,
  saveSearchManually,
  togglePinSearch
} from '../controllers/search.controller';
import { protect } from '../middlewares/auth.middleware'; // Assuming protect is exported

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Global Academic Search API
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Global search across entities
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [school, department, course, semester, subject]
 *         description: Entity type
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/', globalSearch);

/**
 * @swagger
 * /api/search/suggestions:
 *   get:
 *     summary: Get autocomplete suggestions
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Partial search query
 *     responses:
 *       200:
 *         description: Autocomplete suggestions
 */
router.get('/suggestions', autocomplete);

/**
 * @swagger
 * /api/search/recent:
 *   get:
 *     summary: Get user recent searches
 *     tags: [Search]
 *     responses:
 *       200:
 *         description: Recent searches list
 */
router.get('/recent', protect, getRecentSearches);

/**
 * @swagger
 * /api/search/recent:
 *   delete:
 *     summary: Clear user recent searches
 *     tags: [Search]
 *     responses:
 *       200:
 *         description: Cleared successfully
 */
router.delete('/recent', protect, clearRecentSearches);

router.get('/trending', getTrendingSearches);
router.post('/save', protect, saveSearchManually);
router.get('/pinned', protect, getPinnedSearches);
router.patch('/pinned/:id', protect, togglePinSearch);
router.delete('/history', protect, clearRecentSearches);

export default router;
