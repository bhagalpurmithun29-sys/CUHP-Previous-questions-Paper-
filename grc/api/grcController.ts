/**
 * GRC Administrative API
 */
import { Request, Response } from 'express';
import { generateScorecard } from '../compliance/scorecards/generator';
import { getRiskRegister } from '../risk-register/manager';

export const getComplianceStatus = async (req: Request, res: Response) => {
  res.status(200).json(generateScorecard());
};

export const getRisks = async (req: Request, res: Response) => {
  res.status(200).json(getRiskRegister());
};

export const getPolicies = async (req: Request, res: Response) => {
  res.status(200).json([{ id: 'POL-01', name: 'Data Classification Policy', version: '2.0' }]);
};
