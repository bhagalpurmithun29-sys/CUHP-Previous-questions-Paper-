import React, { useState } from 'react';
import { useQueryRag, useGetRagStatus } from '../hooks/useRag';
import { IndexStatus } from '../components/IndexStatus';
import { CitationViewer } from '../components/CitationViewer';
import { BrainCircuit, Search, Send, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const KnowledgeDashboard: React.FC = () => {
  const [question, setQuestion] = useState('');
  const { data: status } = useGetRagStatus();
  const { mutate: askQuestion, data: answerData, isPending } = useQueryRag();

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    askQuestion(question);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-primary" />
          Enterprise Knowledge Engine
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Retrieval-Augmented Generation (RAG) powered by verified repository documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <IndexStatus status={status} />
          
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Information Architecture
            </h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Extracts structured data via OCR</li>
              <li>• Dynamically chunks by section/question</li>
              <li>• Embeds text into dense semantic vectors</li>
              <li>• Contextually grounds LLM responses</li>
              <li>• Enforces strict citation tracing</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex-1 flex flex-col min-h-[400px]">
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Query the Knowledge Base
            </h3>

            <div className="flex-1 bg-muted/20 rounded-xl border p-4 mb-4 overflow-y-auto">
              {!answerData && !isPending && (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50">
                  <BrainCircuit className="w-16 h-16 mb-4 opacity-20" />
                  <p>Ask a question about any subject, concept, or previous exam.</p>
                </div>
              )}
              
              {isPending && (
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="animate-pulse font-medium">Retrieving vectors and synthesizing answer...</span>
                </div>
              )}

              {answerData && !isPending && (
                <div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{answerData.answer}</ReactMarkdown>
                  </div>
                  <CitationViewer citations={answerData.citations} />
                </div>
              )}
            </div>

            <form onSubmit={handleAsk} className="relative mt-auto">
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="E.g., What are the most common questions asked in Data Structures?"
                className="w-full bg-background border rounded-xl pl-4 pr-12 py-3 shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
                disabled={isPending}
              />
              <button 
                type="submit" 
                disabled={isPending || !question.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDashboard;
