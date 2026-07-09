import { agentRegistry } from './AgentRegistry';
import { SemanticRetrievalAgent } from './impl/SemanticRetrievalAgent';
import { CitationVerificationAgent } from './impl/CitationVerificationAgent';

// Bootstrap Agents
export const initializeAgents = () => {
  agentRegistry.register(new SemanticRetrievalAgent());
  agentRegistry.register(new CitationVerificationAgent());
};

export { agentOrchestrator } from './AgentOrchestrator';
export { agentRegistry } from './AgentRegistry';
