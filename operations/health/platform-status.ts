/**
 * Service Health Mapping
 */
export const getServiceHealth = () => {
  return [
    { service: 'Authentication', status: 'UP' },
    { service: 'AI Platform', status: 'UP' },
    { service: 'Database', status: 'UP' },
    { service: 'API Gateway', status: 'UP' }
  ];
};
