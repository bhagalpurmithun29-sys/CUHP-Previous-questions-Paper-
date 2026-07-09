import React from 'react';
import { Terminal } from 'lucide-react';

export const ExecutionLogs: React.FC<{ logs: string[] }> = ({ logs }) => {
  return (
    <div className="bg-black text-green-400 p-4 rounded-xl border border-muted-foreground/30 font-mono text-xs overflow-y-auto max-h-[300px]">
      <h4 className="flex items-center gap-2 text-white/50 border-b border-white/10 pb-2 mb-2 font-sans font-semibold">
        <Terminal className="w-4 h-4" />
        Shared Memory Trace
      </h4>
      {logs && logs.length > 0 ? (
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <div key={idx} className="break-words">
              {log}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-green-400/50 italic">Awaiting task execution...</div>
      )}
    </div>
  );
};
