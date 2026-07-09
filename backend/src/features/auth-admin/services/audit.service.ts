import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AuthAction } from '../../../enums/auth.enum';
import { AppError } from '../../../utils/appError';

export class AuditService {
  async getAuditLogs(query: any) {
    const { 
      page = 1, 
      limit = 20, 
      action, 
      userId, 
      startDate, 
      endDate,
      search 
    } = query;

    const filter: any = {};

    if (action) {
      filter.action = action;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      filter.$or = [
        { emailAttempted: { $regex: search, $options: 'i' } },
        { ipAddress: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const logs = await AuthAuditLog.find(filter)
      .populate('userId', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await AuthAuditLog.countDocuments(filter);

    return {
      logs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  async getRecentSecurityEvents(limit: number = 10) {
    return AuthAuditLog.find({
      action: { 
        $in: [
          AuthAction.LOGIN_FAILED,
          AuthAction.PASSWORD_RESET_REQUESTED,
          AuthAction.ACCOUNT_LOCKED,
          AuthAction.MFA_FAILED
        ] 
      }
    })
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  }
}

export const auditService = new AuditService();
