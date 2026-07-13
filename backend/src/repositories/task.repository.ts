import { Task, ITask } from '../models/Task.model';

class TaskRepository {
  async getTasks(filter: any = {}, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('assignedTo', 'firstName lastName avatar')
        .populate('creatorId', 'firstName lastName')
        .lean(),
      Task.countDocuments(filter)
    ]);
    return { tasks, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getTaskById(id: string) {
    return Task.findById(id)
      .populate('assignedTo', 'firstName lastName avatar')
      .populate('creatorId', 'firstName lastName')
      .lean();
  }

  async createTask(data: Partial<ITask>) {
    const task = new Task(data);
    task.activityHistory.push({
      action: 'Task Created',
      userId: data.creatorId as any,
      timestamp: new Date()
    });
    return task.save();
  }

  async updateTaskStatus(id: string, status: string, userId: string) {
    return Task.findByIdAndUpdate(
      id,
      { 
        $set: { status },
        $push: { activityHistory: { action: `Status changed to \${status}`, userId, timestamp: new Date() } }
      },
      { new: true }
    );
  }

  async assignTask(id: string, assigneeId: string, userId: string) {
    return Task.findByIdAndUpdate(
      id,
      {
        $set: { assignedTo: assigneeId, status: 'ASSIGNED' },
        $push: { activityHistory: { action: `Assigned to user`, userId, timestamp: new Date() } }
      },
      { new: true }
    );
  }

  async deleteTask(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export const taskRepository = new TaskRepository();
