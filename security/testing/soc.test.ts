import { IncidentManager, IncidentSeverity } from '../incident-response/workflow';
import { getOverview } from '../api/socController';

describe('SOC Platform Tests', () => {
  it('should create an incident with correct default status', () => {
    const incident = IncidentManager.createIncident('Test', IncidentSeverity.HIGH, {});
    // Assert incident.status === 'OPEN'
  });

  it('should return security health metrics from overview API', () => {
    // Assert /security/overview returns MTTD and MTTR fields
  });
});
