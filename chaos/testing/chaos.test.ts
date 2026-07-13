import { ChaosApproval } from '../approvals/workflow';

describe('Chaos Safety Workflows', () => {
  it('should reject approvals from unauthorized roles', () => {
    expect(() => {
      ChaosApproval.approveExperiment('EXP-01', 'Developer');
    }).toThrow();
  });
});
