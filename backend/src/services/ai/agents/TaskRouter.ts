import { AgentContext, BaseAgent, SharedMemory } from './AgentFramework';
import { agentRegistry } from './AgentRegistry';

export class TaskRouter {
  /**
   * Routes the query to the most appropriate agent(s)
   */
  route(query: string): BaseAgent[] {
    const agents = agentRegistry.findCapableAgents(query);
    if (agents.length === 0) {
      // Fallback to a default retrieval agent if no specific capability matches
      const fallback = agentRegistry.getAgent('agent_semantic_retrieval');
      return fallback ? [fallback] : [];
    }
    return agents;
  }
}

export const taskRouter = new TaskRouter();
