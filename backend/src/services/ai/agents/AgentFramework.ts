export interface AgentContext {
  userId: string;
  query: string;
  sharedMemory: SharedMemory;
}

export abstract class BaseAgent {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract capabilities: string[];

  /**
   * Evaluates if this agent can handle the current task.
   */
  abstract canHandle(query: string): boolean;

  /**
   * Executes the agent's logic.
   */
  abstract execute(context: AgentContext): Promise<any>;
}

export class SharedMemory {
  private memory: Map<string, any> = new Map();
  private logs: string[] = [];

  set(key: string, value: any) {
    this.memory.set(key, value);
    this.addLog(`[Memory] Set \${key}`);
  }

  get<T>(key: string): T | undefined {
    return this.memory.get(key) as T;
  }

  addLog(log: string) {
    this.logs.push(`[\${new Date().toISOString()}] \${log}`);
  }

  getLogs() {
    return this.logs;
  }

  getAll() {
    return Object.fromEntries(this.memory.entries());
  }
}
