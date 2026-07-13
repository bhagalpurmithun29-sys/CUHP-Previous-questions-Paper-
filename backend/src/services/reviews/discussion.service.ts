import { reviewRepository } from '../../repositories/review.repository';

class DiscussionService {
  async getThreads(resourceId: string) {
    return reviewRepository.getThreadsForResource(resourceId);
  }

  async createThread(userId: string, data: any) {
    data.creatorId = userId;
    return reviewRepository.createThread(data);
  }

  async getComments(threadId: string) {
    return reviewRepository.getCommentsForThread(threadId);
  }

  async addComment(userId: string, data: any) {
    data.authorId = userId;
    // Extract mentions from content here using regex, e.g., /@(\w+)/g
    // Send notifications to mentioned users via Notification system
    return reviewRepository.createComment(data);
  }

  async resolveThread(threadId: string) {
    return reviewRepository.updateThreadStatus(threadId, 'RESOLVED');
  }

  async updateComment(commentId: string, content: string, userId: string) {
    // Check if author matches userId
    return reviewRepository.updateComment(commentId, content);
  }
}

export const discussionService = new DiscussionService();
