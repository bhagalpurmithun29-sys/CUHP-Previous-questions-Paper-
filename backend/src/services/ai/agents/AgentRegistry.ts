import { BaseAgent } from './AgentFramework';

export class AgentRegistry {
  private agents: Map<string, BaseAgent> = new Map();

  register(agent: BaseAgent) {
    this.agents.set(agent.id, agent);
  }

  getAgent(id: string): BaseAgent | undefined {
    return this.agents.get(id);
  }

  getAllAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Finds agents capable of handling the query based on their canHandle logic.
   */
  findCapableAgents(query: string): BaseAgent[] {
    return this.getAllAgents().filter(agent => agent.canHandle(query));
  }
}

export const agentRegistry = new AgentRegistry();
