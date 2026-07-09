import { Router } from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  addReply,
  assignTicket,
  closeTicket
} from '../controllers/support.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware'; // Assuming existing middleware
import { UserRole } from '../enums/auth.enum';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Support
 *   description: Support Tickets API
 */

// Public or optionally authenticated
// The controller handles if user is logged in or guest
router.post('/tickets', (req, res, next) => {
  // Try to authenticate if token exists, but don't fail if guest
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, createTicket);

// Protected routes
router.use(protect);

router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicketById);
router.post('/tickets/:id/reply', addReply);
router.post('/tickets/:id/close', closeTicket);

// Admin / Moderator only
router.post('/tickets/:id/assign', restrictTo(UserRole.ADMIN, UserRole.MODERATOR), assignTicket);

export default router;
