import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMetadata } from '../hooks/useMetadata';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { MetadataForm } from '../components/MetadataForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, ShieldAlert, History } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

export default function MetadataManagementPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { metadata, history, updateMetadata, isUpdating } = useMetadata(id || '');
  const [showHistory, setShowHistory] = useState(false);

  if (metadata.isLoading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (metadata.error || !metadata.data) return <div className="p-20 text-center text-destructive">Failed to load metadata.</div>;

  const { paper, quality } = metadata.data;

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4" /></Button>
          <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Papers', href: '/admin/papers' }, { label: 'Metadata Editor' }]} />
        </div>
        <Button variant="outline" onClick={() => setShowHistory(!showHistory)} className="gap-2">
          <History className="w-4 h-4" /> {showHistory ? 'Hide History' : 'View History'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {showHistory ? (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Version History</CardTitle>
                <CardDescription>Track all modifications made to this document's metadata.</CardDescription>
              </CardHeader>
              <CardContent>
                {history.isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : history.data?.length === 0 ? (
                  <p className="text-muted-foreground">No edits have been made yet.</p>
                ) : (
                  <div className="space-y-6 border-l-2 ml-4">
                    {history.data.map((log: any) => (
                      <div key={log._id} className="relative pl-6">
                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary" />
                        <p className="text-sm font-medium">{log.editorId?.name} edited the paper</p>
                        <p className="text-xs text-muted-foreground mb-2">{format(new Date(log.timestamp), 'PPpp')}</p>
                        <div className="space-y-1 bg-muted/50 p-2 rounded-md">
                          {log.changes.map((change: any, i: number) => (
                            <div key={i} className="text-xs flex gap-2">
                              <span className="font-semibold text-muted-foreground">{change.field}:</span>
                              <span className="line-through text-destructive">{String(change.oldValue || 'none')}</span>
                              <span className="text-emerald-600">→</span>
                              <span className="font-medium">{String(change.newValue || 'none')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Metadata Editor</CardTitle>
                <CardDescription>Modifying metadata will revert the paper to PENDING_REVIEW state.</CardDescription>
              </CardHeader>
              <CardContent>
                <MetadataForm paper={paper} onSave={updateMetadata} isSaving={isUpdating} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-primary" /> Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-center">{quality.score}%</div>
              <Progress value={quality.score} className={`h-2 mb-4 ${quality.score > 80 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-yellow-500'}`} />
              
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">Validation Status</p>
                {quality.missingFields.length === 0 ? (
                  <p className="text-xs text-emerald-600 bg-emerald-500/10 p-2 rounded-md">Excellent. All strict metadata fields are populated.</p>
                ) : (
                  <ul className="text-xs text-destructive bg-destructive/10 p-2 rounded-md list-disc list-inside">
                    {quality.missingFields.map((field: string, i: number) => <li key={i}>Missing {field}</li>)}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
