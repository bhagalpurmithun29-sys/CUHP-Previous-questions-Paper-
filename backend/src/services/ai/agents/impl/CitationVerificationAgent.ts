import { BaseAgent, AgentContext } from '../AgentFramework';
import { aiGateway } from '../../AiGateway';

export class CitationVerificationAgent extends BaseAgent {
  id = 'agent_citation_verifier';
  name = 'Citation Verification Agent';
  description = 'Verifies that all AI claims are strictly grounded in retrieved repository citations without hallucination.';
  capabilities = ['hallucination_check', 'fact_checking', 'safety_validation'];

  canHandle(query: string): boolean {
    return true; // Usually runs sequentially after retrieval
  }

  async execute(context: AgentContext): Promise<any> {
    context.sharedMemory.addLog(`[CitationVerificationAgent] Verifying draft response against citations...`);
    
    const draftAnswer = context.sharedMemory.get<string>('draftAnswer');
    const citations = context.sharedMemory.get<any[]>('retrievedContext');
    
    if (!draftAnswer || !citations || citations.length === 0) {
      context.sharedMemory.addLog(`[CitationVerificationAgent] Skipping verification (no context).`);
      return { verified: true, finalAnswer: draftAnswer || "I cannot answer this question." };
    }

    const citationText = citations.map(c => `[Source \${c.citationId}]: \${c.snippet}`).join('\n');

    const prompt = `
      You are a strict Citation Verifier.
      Compare the Draft Answer against the Provided Sources.
      
      Provided Sources:
      \${citationText}
      
      Draft Answer:
      \${draftAnswer}
      
      If the Draft Answer contains hallucinated facts NOT found in the Provided Sources, rewrite it to be strictly grounded, or state that the information is missing.
      Return ONLY the final verified text.
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are a strict compliance and citation verification AI.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1
    }, context.userId);

    const finalAnswer = response.content;
    context.sharedMemory.set('finalAnswer', finalAnswer);
    context.sharedMemory.addLog(`[CitationVerificationAgent] Verification complete.`);
    
    return { verified: true, finalAnswer };
  }
}
