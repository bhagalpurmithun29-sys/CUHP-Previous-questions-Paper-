import React, { useState } from 'react';
import { useGetAgentList, useGetAgentStatus, useAgentQuery } from '../hooks/useAgents';
import { AgentHealth } from '../components/AgentHealth';
import { ExecutionLogs } from '../components/ExecutionLogs';
import { Network, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CitationViewer } from '../../rag/components/CitationViewer';

const AgentDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  
  const { data: status } = useGetAgentStatus();
  const { data: agents } = useGetAgentList();
  const { mutate: runQuery, data: result, isPending } = useAgentQuery();

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    runQuery(query);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <Network className="w-8 h-8 text-primary" />
          Multi-Agent Orchestrator
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Enterprise Swarm Architecture for collaborative academic intelligence and RAG verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AgentHealth status={status} agents={agents} />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex flex-col">
            <form onSubmit={handleQuery} className="relative mb-6">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask the swarm (e.g., Analyze the latest data structures paper)"
                className="w-full bg-background border rounded-xl pl-4 pr-12 py-3 shadow-sm focus:ring-2 focus:ring-primary/20 outline-none"
                disabled={isPending}
              />
              <button 
                type="submit" 
                disabled={isPending || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>

            <div className="flex-1 bg-muted/10 rounded-xl border p-4 overflow-y-auto min-h-[250px]">
              {!result && !isPending && (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50">
                  <Network className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">Submit a task to trigger the routing engine.</p>
                </div>
              )}
              
              {result && !isPending && (
                <div className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{result.answer}</ReactMarkdown>
                  </div>
                  {result.citations && result.citations.length > 0 && (
                    <CitationViewer citations={result.citations} />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Execution Trace</h3>
            <ExecutionLogs logs={result?.logs || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
