/**
 * FinOps Administrative API
 */
import { Request, Response } from 'express';
import { CostMonitor } from '../cost-monitoring/monitor';
import { getForecast } from '../capacity-planning/forecast';
import { getOptimizationSuggestions } from '../optimization/suggestions';

export const getCostSummary = async (req: Request, res: Response) => {
  const costs = await CostMonitor.getAggregatedCosts('production');
  res.status(200).json(costs);
};

export const getCapacityForecast = async (req: Request, res: Response) => {
  res.status(200).json(getForecast());
};

export const getOptimizations = async (req: Request, res: Response) => {
  res.status(200).json(getOptimizationSuggestions());
};
