import { ActivityLog, AuditAction } from '../../models/activityLog.model';
import { AppError } from '../../utils/AppError';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export class AuditService {

  /**
   * Logs a standardized enterprise audit event
   */
  public async logEvent(params: {
    userId?: string;
    userRole?: string;
    action: AuditAction;
    entityType?: string;
    entityId?: string;
    oldValue?: any;
    newValue?: any;
    req?: Request;
  }) {
    const { req, ...logData } = params;
    const enrichedData: any = { ...logData };

    // Extract request-level context if provided
    if (req) {
      enrichedData.ipAddress = req.ip || req.socket.remoteAddress;
      enrichedData.userAgent = req.headers['user-agent'];
      
      if (enrichedData.userAgent) {
        const parser = new UAParser(enrichedData.userAgent);
        enrichedData.browser = `${parser.getBrowser().name} ${parser.getBrowser().version}`;
        enrichedData.os = `${parser.getOS().name} ${parser.getOS().version}`;
      }
      
      // Assumes correlation ID middleware might inject this
      enrichedData.requestId = req.headers['x-request-id'] || 'system';
      enrichedData.correlationId = req.headers['x-correlation-id'] || 'system';
    }

    try {
      await ActivityLog.create(enrichedData);
    } catch (err) {
      // Audit failures should not crash the main thread in most setups, 
      // but should be logged to a critical fallback (like CloudWatch/stderr)
      console.error('[CRITICAL] Audit Log Insertion Failed:', err);
    }
  }

  /**
   * Advanced search and pagination for the Admin Timeline
   */
  public async searchLogs(query: any = {}, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;
    
    // Construct MongoDB filter from REST query params
    const filter: any = {};
    if (query.userId) filter.userId = query.userId;
    if (query.action) filter.action = query.action;
    if (query.entityType) filter.entityType = query.entityType;
    if (query.entityId) filter.entityId = query.entityId;
    if (query.userRole) filter.userRole = query.userRole;
    
    // Date Range
    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }

    const [data, total] = await Promise.all([
      ActivityLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'firstName lastName email'),
      ActivityLog.countDocuments(filter)
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  public async getLogById(id: string) {
    const log = await ActivityLog.findById(id).populate('userId', 'firstName lastName email role');
    if (!log) throw new AppError('Audit record not found', 404);
    return log;
  }
}

export const auditService = new AuditService();
