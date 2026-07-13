/**
 * Resource Governance & Utilization Analyzer
 */
export const identifyIdleResources = () => {
  return [
    { type: 'compute', id: 'node-alpha-12', cpuAvg: '2%', status: 'IDLE' },
    { type: 'storage', id: 'vol-unused-89', status: 'ORPHANED' } // Placeholder
  ];
};
