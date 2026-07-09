import React from 'react';
import { Database, Zap, HardDrive } from 'lucide-react';

export const IndexStatus: React.FC<{ status: any }> = ({ status }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-primary" />
        Knowledge Vector Index
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <HardDrive className="w-4 h-4" />
            <span className="text-sm font-medium">Total Chunks</span>
          </div>
          <span className="text-2xl font-bold">{status?.totalChunksIndexed?.toLocaleString() || 0}</span>
        </div>
        
        <div className="p-4 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">System Status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${status?.status === 'HEALTHY' ? 'bg-success' : 'bg-warning'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 \${status?.status === 'HEALTHY' ? 'bg-success' : 'bg-warning'}`}></span>
            </span>
            <span className="text-lg font-bold">{status?.status || 'UNKNOWN'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
