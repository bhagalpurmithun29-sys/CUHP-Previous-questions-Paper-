import React from 'react';
import { ImportWizard } from '../components/ImportWizard';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadCloud, History, DatabaseBackup } from 'lucide-react';
import { useImportExport } from '../hooks/useImportExport';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

export default function ImportExportPage() {
  const { useImportHistory, exportData, rollbackImport } = useImportExport();
  const { data: history, isLoading: historyLoading } = useImportHistory();
  const [exportType, setExportType] = React.useState('SUBJECT');

  const handleExport = async () => {
    try {
      const data = await exportData({ entityType: exportType, format: 'json' });
      // Quick browser download of JSON for demo. In production, use PapaParse to convert to CSV blob.
      const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cuhp_export_${exportType.toLowerCase()}_${new Date().getTime()}.json`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Bulk Operations' }]} />
      
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Operations</h1>
        <p className="text-muted-foreground">Manage large datasets via bulk import wizards, fast exports, and safety rollbacks.</p>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="import">Import Wizard</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="history">History & Rollback</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="animate-in fade-in zoom-in-95 duration-200">
          <ImportWizard />
        </TabsContent>

        <TabsContent value="export" className="animate-in fade-in zoom-in-95 duration-200">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DownloadCloud className="w-5 h-5 text-primary" /> Data Exporter</CardTitle>
              <CardDescription>Export subsets or the entire academic hierarchy to structured formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Entity</label>
                <Select value={exportType} onValueChange={setExportType}>
                  <SelectTrigger className="w-full max-w-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCHOOL">Schools</SelectItem>
                    <SelectItem value="DEPARTMENT">Departments</SelectItem>
                    <SelectItem value="COURSE">Courses</SelectItem>
                    <SelectItem value="SEMESTER">Semesters</SelectItem>
                    <SelectItem value="SUBJECT">Subjects</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <Button onClick={handleExport} className="gap-2"><DownloadCloud className="w-4 h-4" /> Download Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="animate-in fade-in zoom-in-95 duration-200">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="w-5 h-5 text-primary" /> Operation History</CardTitle>
              <CardDescription>Review recent batch imports and perform emergency rollbacks if bad data was committed.</CardDescription>
            </CardHeader>
            <CardContent>
              {historyLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading history...</div>
              ) : history?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">No import history found.</div>
              ) : (
                <div className="space-y-4">
                  {history?.map((log: any) => (
                    <div key={log.transactionId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground uppercase text-sm tracking-wider">{log.entityType}</span>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">{log.transactionId.substring(0, 8)}...</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {log.insertedIds.length} records inserted on {format(new Date(log.timestamp), 'PPpp')}
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => {
                          if (window.confirm('Are you absolutely sure? This will hard-delete all records inserted during this transaction.')) {
                            rollbackImport(log.transactionId);
                          }
                        }}
                      >
                        <DatabaseBackup className="w-4 h-4" /> Rollback
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
