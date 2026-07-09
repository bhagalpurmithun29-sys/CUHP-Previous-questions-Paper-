import { Request, Response } from 'express';
import { agentOrchestrator, agentRegistry, initializeAgents } from '../services/ai/agents';
import { AppError } from '../utils/AppError';

// Initialize on boot
initializeAgents();

export class AgentController {
  async query(req: Request, res: Response) {
    try {
      const { question } = req.body;
      const userId = req.user!.id;

      if (!question) throw new AppError('Question is required', 400);

      const result = await agentOrchestrator.processQuery(userId, question);
      
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getStatus(req: Request, res: Response) {
    res.status(200).json({
      status: 'success',
      data: {
        activeAgents: agentRegistry.getAllAgents().length,
        systemHealth: 'ONLINE'
      }
    });
  }

  async getList(req: Request, res: Response) {
    const agents = agentRegistry.getAllAgents().map(a => ({
      id: a.id,
      name: a.name,
      description: a.description,
      capabilities: a.capabilities
    }));

    res.status(200).json({
      status: 'success',
      data: agents
    });
  }
}

export const agentController = new AgentController();
