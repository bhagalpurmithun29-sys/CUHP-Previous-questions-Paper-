import { Router } from 'express';
import {
  getLeaderboard,
  getHallOfFame,
  getPublicProfile
} from '../controllers/community.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community and Leaderboard API
 */

router.get('/leaderboard', getLeaderboard);
router.get('/hall-of-fame', getHallOfFame);
router.get('/profile/:userId', getPublicProfile);

export default router;
