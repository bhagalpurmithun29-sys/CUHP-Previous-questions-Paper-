/**
 * Risk Register Management
 */
export const getRiskRegister = () => {
  return [
    { 
      id: 'RISK-01', 
      description: 'Unauthorized access to student records',
      likelihood: 'LOW',
      impact: 'CRITICAL',
      residualRisk: 'LOW',
      mitigationPlan: 'Enforce MFA and IP restrictions via API Gateway'
    }
  ];
};
