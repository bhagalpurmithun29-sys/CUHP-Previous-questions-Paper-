import { SupportTicket, TicketStatus } from '../models/supportTicket.model';
import { User } from '../models/user.model';
import { AppError } from '../utils/AppError';
import crypto from 'crypto';

export class SupportService {
  private generateTicketNumber(): string {
    const prefix = 'TKT';
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `${prefix}-${dateStr}-${randomHex}`;
  }

  async createTicket(data: any, userId?: string) {
    const ticket = await SupportTicket.create({
      ...data,
      userId,
      ticketNumber: this.generateTicketNumber()
    });

    // TODO: Send Email Notification to user & admins
    return ticket;
  }

  async getTickets(query: any, userId?: string, userRole?: string) {
    const matchQuery: any = {};
    
    // Non-admins can only see their own tickets
    if (userRole !== 'ADMIN' && userRole !== 'MODERATOR') {
      if (!userId) throw new AppError('Unauthorized', 401);
      matchQuery.userId = userId;
    } else {
      // Admins can filter by assignedTo
      if (query.assignedTo) matchQuery.assignedTo = query.assignedTo;
    }

    if (query.status) matchQuery.status = query.status;
    if (query.priority) matchQuery.priority = query.priority;
    if (query.category) matchQuery.category = query.category;
    if (query.q) {
      matchQuery.$text = { $search: query.q };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const tickets = await SupportTicket.find(matchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName')
      .lean();

    const total = await SupportTicket.countDocuments(matchQuery);

    return {
      results: tickets,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getTicketById(id: string, userId?: string, userRole?: string) {
    const ticket = await SupportTicket.findById(id)
      .populate('userId', 'firstName lastName email avatarUrl')
      .populate('assignedTo', 'firstName lastName avatarUrl')
      .populate('replies.senderId', 'firstName lastName avatarUrl role');

    if (!ticket) throw new AppError('Ticket not found', 404);

    if (userRole !== 'ADMIN' && userRole !== 'MODERATOR') {
      if (!userId || ticket.userId?.toString() !== userId) {
        throw new AppError('Unauthorized access to ticket', 403);
      }
      // Filter out internal notes for regular users
      ticket.replies = ticket.replies.filter(r => !r.isInternalNote) as any;
    }

    return ticket;
  }

  async addReply(id: string, replyData: any, user: any) {
    const ticket = await SupportTicket.findById(id);
    if (!ticket) throw new AppError('Ticket not found', 404);

    const isAdmin = user.role === 'ADMIN' || user.role === 'MODERATOR';

    if (!isAdmin && ticket.userId?.toString() !== user._id.toString()) {
      throw new AppError('Unauthorized', 403);
    }

    if (ticket.status === TicketStatus.CLOSED) {
      ticket.status = TicketStatus.REOPENED;
    }

    ticket.replies.push({
      message: replyData.message,
      senderId: user._id,
      senderName: `${user.firstName} ${user.lastName}`,
      isAdmin,
      isInternalNote: replyData.isInternalNote && isAdmin,
      attachments: replyData.attachments || [],
      createdAt: new Date()
    });

    if (isAdmin && !replyData.isInternalNote) {
      ticket.status = TicketStatus.WAITING_FOR_USER;
    } else if (!isAdmin) {
      ticket.status = TicketStatus.OPEN;
    }

    await ticket.save();

    // TODO: Send notification email

    return ticket;
  }

  async assignTicket(id: string, adminId: string) {
    const ticket = await SupportTicket.findById(id);
    if (!ticket) throw new AppError('Ticket not found', 404);

    ticket.assignedTo = adminId as any;
    ticket.status = TicketStatus.ASSIGNED;
    await ticket.save();
    return ticket;
  }

  async closeTicket(id: string) {
    const ticket = await SupportTicket.findById(id);
    if (!ticket) throw new AppError('Ticket not found', 404);

    ticket.status = TicketStatus.CLOSED;
    ticket.closedAt = new Date();
    await ticket.save();
    return ticket;
  }
}

export const supportService = new SupportService();
