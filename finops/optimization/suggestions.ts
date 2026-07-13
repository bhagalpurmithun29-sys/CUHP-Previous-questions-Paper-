/**
 * Resource Optimization Engine
 */
export const getOptimizationSuggestions = () => {
  return [
    { action: 'Scale Down', resource: 'qa-cluster', estimatedSavings: '$120/mo' },
    { action: 'Purchase Reserved Capacity', resource: 'production-db', estimatedSavings: '$400/mo' }
  ];
};
