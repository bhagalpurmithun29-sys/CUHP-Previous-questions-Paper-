/**
 * Service Dependency Mapping
 */
export const getDependencyGraph = () => {
  return {
    nodes: ['API Gateway', 'Auth Service', 'AI Service', 'Database'],
    edges: [
      { from: 'API Gateway', to: 'Auth Service' },
      { from: 'API Gateway', to: 'AI Service' },
      { from: 'Auth Service', to: 'Database' }
    ]
  };
};
