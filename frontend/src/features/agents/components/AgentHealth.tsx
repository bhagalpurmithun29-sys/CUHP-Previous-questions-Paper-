import React from 'react';
import { AgentInfo, AgentStatus } from '../hooks/useAgents';
import { Bot, CheckCircle, Activity } from 'lucide-react';

export const AgentHealth: React.FC<{ status?: AgentStatus, agents?: AgentInfo[] }> = ({ status, agents }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Swarm Health
      </h3>
      
      <div className="flex items-center justify-between mb-6 p-4 rounded-xl border bg-muted/20">
        <div className="flex items-center gap-3">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-success"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-success"></span>
          </span>
          <span className="font-bold">System {status?.systemHealth || 'ONLINE'}</span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{status?.activeAgents || 0}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Agents</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registered Agents</h4>
        {agents?.map(agent => (
          <div key={agent.id} className="p-3 border rounded-lg bg-background flex items-start gap-3">
            <Bot className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h5 className="font-bold text-sm flex items-center gap-2">
                {agent.name}
                <CheckCircle className="w-3 h-3 text-success" />
              </h5>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{agent.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {agent.capabilities.map(cap => (
                  <span key={cap} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
