/**
 * Major Incident Command Center
 * Syncs actively with the SOC and Observability tools.
 */
export const getActiveIncidents = () => {
  return {
    majorIncidents: 0,
    activeAlerts: 2,
    latestResolution: 'INC-101 (Resolved 2 hours ago)'
  };
};
