import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';

export const dashboardController = {
  getDashboardData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const data = await DashboardService.getDashboardData(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const profile = await DashboardService.getProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  },

  getActivity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const activity = await DashboardService.getActivity(userId);
      res.status(200).json(activity);
    } catch (error) {
      next(error);
    }
  },

  getStatistics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const stats = await DashboardService.getStatistics(userId);
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
};
