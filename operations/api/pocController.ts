/**
 * Production Operations Center API
 * Restricted to: Super Administrator, Operations Team, Executives
 */
import { Request, Response } from 'express';
import { getPlatformOverview } from '../dashboard/aggregator';
import { getBusinessMetrics } from '../business-kpis/tracker';
import { getActiveIncidents } from '../incidents/incident-center';
import { getServiceHealth } from '../health/platform-status';

export const getOverview = async (req: Request, res: Response) => {
  res.status(200).json(await getPlatformOverview());
};

export const getKpis = async (req: Request, res: Response) => {
  res.status(200).json(getBusinessMetrics());
};

export const getIncidents = async (req: Request, res: Response) => {
  res.status(200).json(getActiveIncidents());
};

export const getServices = async (req: Request, res: Response) => {
  res.status(200).json(getServiceHealth());
};
