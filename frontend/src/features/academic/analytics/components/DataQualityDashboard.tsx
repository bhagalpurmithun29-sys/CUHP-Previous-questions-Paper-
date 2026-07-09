import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const DataQualityDashboard: React.FC<{ data: any, isLoading: boolean }> = ({ data, isLoading }) => {
  if (isLoading) return <Card className="h-[200px] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></Card>;
  if (!data) return null;

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-emerald-500 bg-emerald-500/10';
    if (score >= 80) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-destructive bg-destructive/10';
  };

  return (
    <Card className="border-l-4 border-l-primary shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-primary" /> Data Integrity Scanner</CardTitle>
        <CardDescription>Real-time analysis of broken references, missing metadata, and relational anomalies.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="flex flex-col justify-center space-y-2 col-span-1 md:border-r border-border pr-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Global Health Score</span>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${getHealthColor(data.score)}`}>{data.score}%</span>
          </div>
          <Progress value={data.score} className={`h-2 ${data.score >= 95 ? '[&>div]:bg-emerald-500' : data.score >= 80 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-destructive'}`} />
          <p className="text-xs text-muted-foreground pt-2">Score drops when orphaned records or missing core fields are detected.</p>
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
            <div className="bg-background p-2 rounded-full shadow-sm"><AlertTriangle className="w-5 h-5 text-yellow-500" /></div>
            <div>
              <p className="text-2xl font-bold">{data.brokenRelationships}</p>
              <p className="text-sm text-muted-foreground">Broken Relationships</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Missing Parent IDs</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
            <div className="bg-background p-2 rounded-full shadow-sm"><CheckCircle2 className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-2xl font-bold">{data.missingMetadata}</p>
              <p className="text-sm text-muted-foreground">Missing Metadata</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Unassigned Credits/Types</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
