/**
 * Chaos Engineering Administrative API
 */
import { Request, Response } from 'express';

export const getExperiments = async (req: Request, res: Response) => {
  res.status(200).json([{ id: 'EXP-001', type: 'Pod Kill', status: 'READY' }]);
};

export const getReliabilityScorecard = async (req: Request, res: Response) => {
  res.status(200).json({ overallReliability: 96, recoverySuccessRate: '100%' });
};

export const approveExperiment = async (req: Request, res: Response) => {
  res.status(202).json({ message: 'Experiment approved and queued.' });
};
