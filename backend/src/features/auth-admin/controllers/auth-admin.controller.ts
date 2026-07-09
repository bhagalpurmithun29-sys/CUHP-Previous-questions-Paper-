import { Request, Response, NextFunction } from 'express';
import { authAdminService } from '../services/auth-admin.service';
import { auditService } from '../services/audit.service';
import { identityService } from '../services/identity.service';
import { riskAnalysisService } from '../services/risk-analysis.service';
import { complianceService } from '../services/compliance.service';
import { AppError } from '../../../utils/appError';

export class AuthAdminController {
  
  // Dashboard & Analytics
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await authAdminService.getDashboardAnalytics();
      const identityStats = await identityService.getIdentityStats();
      const riskOverview = await riskAnalysisService.getRiskOverview();
      
      res.status(200).json({
        success: true,
        data: {
          analytics,
          identityStats,
          riskOverview
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Audit Logs
  async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await auditService.getAuditLogs(req.query);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Security Events
  async getSecurityEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const events = await auditService.getRecentSecurityEvents(limit);
      res.status(200).json({
        success: true,
        data: events
      });
    } catch (error) {
      next(error);
    }
  }

  // Identity Admin
  async getIdentityProviders(req: Request, res: Response, next: NextFunction) {
    try {
      const providers = await identityService.getProviders();
      res.status(200).json({
        success: true,
        data: providers
      });
    } catch (error) {
      next(error);
    }
  }

  // Password Policies
  async updatePasswordPolicy(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = (req as any).user._id; // Assuming user is attached by auth middleware
      const policy = await identityService.updatePasswordPolicy(req.body, adminId);
      res.status(200).json({
        success: true,
        data: policy,
        message: 'Password policy updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getPasswordPolicy(req: Request, res: Response, next: NextFunction) {
    try {
      const policy = await identityService.getPasswordPolicy();
      res.status(200).json({
        success: true,
        data: policy
      });
    } catch (error) {
      next(error);
    }
  }

  // Reports
  async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const type = req.query.type as 'authentication' | 'security' | 'compliance';
      const format = req.query.format as 'json' | 'csv' | 'pdf';

      if (!['authentication', 'security', 'compliance'].includes(type)) {
        throw new AppError('Invalid report type', 400);
      }

      const data = await complianceService.generateComplianceReport(type);

      if (format === 'csv') {
        const fields = Object.keys(data); // In reality, this would be customized based on array data
        const csv = await complianceService.exportToCSV([data], fields);
        res.header('Content-Type', 'text/csv');
        res.attachment(`report-${type}.csv`);
        return res.send(csv);
      } else if (format === 'pdf') {
        // PDF generation logic placeholder
        return res.status(501).json({ success: false, message: 'PDF export not implemented yet' });
      }

      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authAdminController = new AuthAdminController();
