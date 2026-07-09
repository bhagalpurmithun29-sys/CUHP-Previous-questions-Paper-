import React from 'react';
import { Database, FileText, Users, CheckCircle, TrendingUp } from 'lucide-react';

export const ExecutiveOverview: React.FC<{ data: any, insights: any }> = ({ data, insights }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Total Papers</span>
          </div>
          <span className="text-2xl font-bold">{data.metrics.totalPapers}</span>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Database className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Total Subjects</span>
          </div>
          <span className="text-2xl font-bold">{data.metrics.totalSubjects}</span>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Active Users</span>
          </div>
          <span className="text-2xl font-bold">{data.metrics.totalUsers}</span>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Coverage Score</span>
          </div>
          <span className="text-2xl font-bold text-success">{data.repositoryHealth.coverageScore}%</span>
        </div>
      </div>

      {insights && (
        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <h3 className="text-xl font-display font-semibold mb-4">Executive Summary</h3>
          <p className="text-muted-foreground mb-6">{insights.executiveSummary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.insights?.map((insight: any, idx: number) => (
              <div key={idx} className="p-4 bg-muted/20 border rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`w-4 h-4 \${insight.type === 'POSITIVE' ? 'text-success' : insight.type === 'NEGATIVE' ? 'text-destructive' : 'text-primary'}`} />
                  <h4 className="font-bold text-sm">{insight.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
