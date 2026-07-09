import { AgentContext, SharedMemory } from './AgentFramework';
import { taskRouter } from './TaskRouter';
import { agentRegistry } from './AgentRegistry';

export class AgentOrchestrator {
  /**
   * Orchestrates the full lifecycle of a multi-agent query
   */
  async processQuery(userId: string, query: string): Promise<any> {
    const sharedMemory = new SharedMemory();
    const context: AgentContext = { userId, query, sharedMemory };
    
    sharedMemory.addLog(`[Orchestrator] Received query: "\${query}"`);

    try {
      // 1. Task Routing
      const primaryAgents = taskRouter.route(query);
      sharedMemory.addLog(`[Orchestrator] Routed to \${primaryAgents.length} agents: \${primaryAgents.map(a => a.name).join(', ')}`);

      // 2. Parallel Execution (if multiple primary agents)
      // For simplicity in this workflow, we execute the primary agents in parallel.
      // E.g., Semantic Retrieval Agent + Study Planner Agent (if both trigger)
      const executionPromises = primaryAgents.map(agent => 
        this.executeWithTimeout(agent, context, 15000)
      );

      await Promise.allSettled(executionPromises);

      // 3. Sequential Verification
      // Always run Citation Verification Agent last
      const verifier = agentRegistry.getAgent('agent_citation_verifier');
      if (verifier) {
        await this.executeWithTimeout(verifier, context, 10000);
      }

      // 4. Extract Final Result
      const finalAnswer = sharedMemory.get<string>('finalAnswer') || sharedMemory.get<string>('draftAnswer') || "Could not generate an answer.";
      const citations = sharedMemory.get<any[]>('retrievedContext') || [];

      return {
        answer: finalAnswer,
        citations,
        logs: sharedMemory.getLogs(),
        status: 'SUCCESS'
      };

    } catch (error: any) {
      sharedMemory.addLog(`[Orchestrator] Error: \${error.message}`);
      return {
        answer: "The AI agent system encountered an error processing your request.",
        citations: [],
        logs: sharedMemory.getLogs(),
        status: 'FAILED',
        error: error.message
      };
    }
  }

  private async executeWithTimeout(agent: any, context: AgentContext, timeoutMs: number): Promise<any> {
    return Promise.race([
      agent.execute(context),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Agent \${agent.name} timed out after \${timeoutMs}ms`)), timeoutMs)
      )
    ]).catch(err => {
      context.sharedMemory.addLog(`[Orchestrator] Agent \${agent.name} failed: \${err.message}`);
    });
  }
}

export const agentOrchestrator = new AgentOrchestrator();
