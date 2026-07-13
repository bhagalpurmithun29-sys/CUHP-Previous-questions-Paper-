import { taskRepository } from '../../repositories/task.repository';

class TaskAssignmentService {
  async assignUser(taskId: string, assigneeId: string, actionUserId: string) {
    const task = await taskRepository.assignTask(taskId, assigneeId, actionUserId);
    if (task) {
      // In a full implementation, trigger Notification Center for the assignee
      console.log(`[TaskAssignment] Task \${taskId} assigned to \${assigneeId}`);
    }
    return task;
  }

  async updateStatus(taskId: string, status: string, actionUserId: string) {
    return taskRepository.updateTaskStatus(taskId, status, actionUserId);
  }
}

export const taskAssignmentService = new TaskAssignmentService();
