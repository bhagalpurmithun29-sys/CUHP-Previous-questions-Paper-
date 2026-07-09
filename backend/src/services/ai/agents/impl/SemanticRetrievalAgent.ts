import { BaseAgent, AgentContext } from '../AgentFramework';
import { knowledgeService } from '../../../rag/KnowledgeService'; // reusing RAG module

export class SemanticRetrievalAgent extends BaseAgent {
  id = 'agent_semantic_retrieval';
  name = 'Semantic Retrieval Agent';
  description = 'Retrieves relevant academic documents and extracts context from the repository.';
  capabilities = ['knowledge_retrieval', 'rag_search', 'context_building'];

  canHandle(query: string): boolean {
    // Basic heuristic: if it looks like a question requiring facts from papers
    const triggers = ['what', 'explain', 'how', 'describe', 'difference', 'compare', 'notes', 'paper'];
    return triggers.some(t => query.toLowerCase().includes(t));
  }

  async execute(context: AgentContext): Promise<any> {
    context.sharedMemory.addLog(`[SemanticRetrievalAgent] Querying RAG Engine for: "\${context.query}"`);
    
    // We reuse the RAG KnowledgeService here
    const ragResult = await knowledgeService.query(context.query, context.userId);
    
    context.sharedMemory.set('retrievedContext', ragResult.citations);
    context.sharedMemory.set('draftAnswer', ragResult.answer);
    
    context.sharedMemory.addLog(`[SemanticRetrievalAgent] Retrieved \${ragResult.citations.length} sources.`);
    
    return ragResult;
  }
}
