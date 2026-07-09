import { Router } from 'express';
import { recommendationController } from '../controllers/recommendation.controller';
import { optionalAuth } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Hybrid Recommendation Engine APIs
 */

// Home/Trending uses optional auth to handle both cold starts (anonymous) and personalized views
router.get('/home', optionalAuth, recommendationController.getHomeRecommendations);
router.get('/trending', recommendationController.getTrending);

// Paper Details recommendations
router.get('/paper/:paperId/related', recommendationController.getRelated);
router.get('/paper/:paperId/collaborative', recommendationController.getCollaborative);

// Analytics
router.post('/paper/:paperId/click', optionalAuth, recommendationController.trackClick);

export default router;
