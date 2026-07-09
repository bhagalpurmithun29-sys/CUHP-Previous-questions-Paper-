import { Router } from 'express';
import {
  getCategories,
  searchArticles,
  getArticleBySlug,
  getFaqs,
  submitFeedback
} from '../controllers/help.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: HelpCenter
 *   description: Knowledge Base and FAQ API
 */

router.get('/categories', getCategories);
router.get('/articles', searchArticles);
router.get('/faqs', getFaqs);
router.get('/articles/:slug', getArticleBySlug);
router.post('/feedback', submitFeedback);

export default router;
