import { paperQARepository } from '../../repositories/paperQA.repository';

class CitationService {
  async getCitationsForConversation(conversationId: string) {
    return paperQARepository.getCitations(conversationId);
  }

  formatCitation(paperTitle: string, pageNumber: number, questionNumber?: string, textReference?: string, confidence?: number) {
    return {
      title: paperTitle,
      page: pageNumber,
      question: questionNumber,
      reference: textReference,
      confidence: confidence || 1.0
    };
  }
}

export const citationService = new CitationService();
