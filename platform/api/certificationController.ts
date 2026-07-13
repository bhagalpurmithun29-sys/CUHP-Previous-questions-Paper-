/**
 * Production Certification API
 */
import { Request, Response } from 'express';
import { generateCertification } from '../certification/certifier';
import { runOperationalValidation } from '../validation/e2e-validator';

export const getCertificationStatus = async (req: Request, res: Response) => {
  res.status(200).json(generateCertification());
};

export const runValidation = async (req: Request, res: Response) => {
  const result = await runOperationalValidation();
  res.status(200).json(result);
};
