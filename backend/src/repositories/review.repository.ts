import { ReviewThread, IReviewThread } from '../models/ReviewThread.model';
import { ReviewComment, IReviewComment } from '../models/ReviewComment.model';

class ReviewRepository {
  async getThreadsForResource(resourceId: string) {
    return ReviewThread.find({ resourceId }).populate('creatorId', 'firstName lastName avatar role').sort({ updatedAt: -1 }).lean();
  }

  async createThread(data: Partial<IReviewThread>) {
    return ReviewThread.create(data);
  }

  async updateThreadStatus(threadId: string, status: string) {
    return ReviewThread.findByIdAndUpdate(threadId, { status }, { new: true });
  }

  async getCommentsForThread(threadId: string) {
    return ReviewComment.find({ threadId }).populate('authorId', 'firstName lastName avatar role').sort({ createdAt: 1 }).lean();
  }

  async createComment(data: Partial<IReviewComment>) {
    return ReviewComment.create(data);
  }

  async updateComment(commentId: string, newContent: string) {
    const comment = await ReviewComment.findById(commentId);
    if (!comment) return null;

    comment.history.push({ content: comment.content, editedAt: new Date() });
    comment.content = newContent;
    comment.isEdited = true;
    
    return comment.save();
  }
}

export const reviewRepository = new ReviewRepository();
