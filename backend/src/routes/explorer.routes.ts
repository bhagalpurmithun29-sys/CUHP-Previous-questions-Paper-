import { Router } from 'express';
import { explorerController } from '../controllers/explorer.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PublicExplorer
 *   description: Public Question Paper Explorer API
 */

/**
 * @swagger
 * /api/public/papers:
 *   get:
 *     summary: Get public approved question papers with filtering and pagination
 *     tags: [PublicExplorer]
 */
router.get('/', explorerController.getPapers);

/**
 * @swagger
 * /api/public/papers/search:
 *   get:
 *     summary: Search public papers (alias mapping to getPapers with search query)
 *     tags: [PublicExplorer]
 */
router.get('/search', explorerController.getPapers);

/**
 * @swagger
 * /api/public/papers/{id}:
 *   get:
 *     summary: Get specific public paper details
 *     tags: [PublicExplorer]
 */
router.get('/:id', explorerController.getPaperDetails);

export default router;
