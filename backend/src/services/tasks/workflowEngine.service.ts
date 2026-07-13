import { Workflow } from '../../models/Workflow.model';
import { taskRepository } from '../../repositories/task.repository';

class WorkflowEngineService {
  async triggerWorkflowEvent(eventName: string, resourceId: string, context: any) {
    const workflows = await Workflow.find({ triggerEvent: eventName, isActive: true });
    
    for (const wf of workflows) {
      if (wf.steps && wf.steps.length > 0) {
        // Create first step task
        const firstStep = wf.steps.find(s => s.order === 1);
        if (firstStep) {
          await taskRepository.createTask({
            title: `[Auto] \${firstStep.taskType} required for \${eventName}`,
            description: `Triggered by workflow: \${wf.name}`,
            type: firstStep.taskType as any,
            assignedRole: firstStep.assignToRole,
            relatedResourceId: resourceId as any,
            workflowId: wf._id as any,
            creatorId: context.userId, // System or user who triggered it
            priority: 'HIGH' as any
          });
        }
      }
    }
  }

  async getAllWorkflows() {
    return Workflow.find().lean();
  }
}

export const workflowEngineService = new WorkflowEngineService();
