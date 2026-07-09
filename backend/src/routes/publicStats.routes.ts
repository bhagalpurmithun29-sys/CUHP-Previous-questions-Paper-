import { Router } from 'express';
import {
  getStatistics,
  getCoverage,
  getTrending,
  getActivity,
  getReports
} from '../controllers/publicStats.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PublicStats
 *   description: Public Statistics and Transparency API
 */

router.get('/statistics', getStatistics);
router.get('/coverage', getCoverage);
router.get('/trending', getTrending);
router.get('/activity', getActivity);
router.get('/reports', getReports);

export default router;
