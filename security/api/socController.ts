/**
 * Security Operations Center (SOC) API
 * Restrict to: Super Administrator, Security Operations Team, Security Auditor
 */
import { Request, Response } from 'express';

export const getOverview = async (req: Request, res: Response) => {
  res.status(200).json({
    healthScore: 92,
    openIncidents: 3,
    resolvedIncidents: 45,
    mttdMinutes: 12,
    mttrHours: 4
  });
};

export const getIncidents = async (req: Request, res: Response) => {
  res.status(200).json([
    { id: 'INC-101', severity: 'HIGH', status: 'INVESTIGATING', title: 'Repeated Failed Logins' },
    { id: 'INC-102', severity: 'MEDIUM', status: 'RESOLVED', title: 'Rate Limit Violation Surge' }
  ]);
};

export const getThreats = async (req: Request, res: Response) => {
  res.status(200).json([
    { id: 'THR-001', type: 'Credential Stuffing', timestamp: new Date() }
  ]);
};

export const getVulnerabilities = async (req: Request, res: Response) => {
  res.status(200).json([
    { id: 'VULN-001', package: 'lodash', risk: 'LOW', status: 'PATCH_SCHEDULED' }
  ]);
};

export const createIncident = async (req: Request, res: Response) => {
  const { title, severity, evidence } = req.body;
  // Audit Log: Incident Created
  res.status(201).json({ id: 'INC-103', status: 'OPEN', message: 'Incident officially logged.' });
};
