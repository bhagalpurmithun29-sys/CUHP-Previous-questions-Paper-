import React, { useState } from 'react';
import { FileUploader } from './FileUploader';
import { useImportExport } from '../hooks/useImportExport';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ImportWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [entityType, setEntityType] = useState('SCHOOL');
  const [fileName, setFileName] = useState('');
  const [validationReport, setValidationReport] = useState<any>(null);

  const { validateImport, commitImport, isLoading } = useImportExport();

  const handleFileParsed = async (data: any[], name: string) => {
    setFileName(name);
    try {
      const report = await validateImport({ entityType, records: data });
      setValidationReport(report);
      setStep(2);
    } catch (e) {
      // Error handled by query
    }
  };

  const handleCommit = async () => {
    if (!validationReport?.validRecords) return;
    try {
      await commitImport({ entityType, validRecords: validationReport.validRecords });
      setStep(3);
    } catch (e) {
      // Error handled by query
    }
  };

  const reset = () => {
    setStep(1);
    setValidationReport(null);
    setFileName('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>1</div>
          <span className="ml-2 font-medium">Upload</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>2</div>
          <span className="ml-2 font-medium">Validate</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}`}>3</div>
          <span className="ml-2 font-medium">Complete</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Select Target Entity</h3>
                  <p className="text-sm text-muted-foreground">Which academic level are you importing?</p>
                </div>
                <Select value={entityType} onValueChange={setEntityType}>
                  <SelectTrigger className="w-[200px]">
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
              
              <div className="pt-4 border-t">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                    <p className="font-medium">Validating dataset...</p>
                  </div>
                ) : (
                  <FileUploader onFileParsed={handleFileParsed} />
                )}
              </div>
            </div>
          )}

          {step === 2 && validationReport && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total Rows</p>
                  <p className="text-3xl font-bold">{validationReport.totalProcessed}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-emerald-700 uppercase tracking-wider mb-1">Ready to Import</p>
                  <p className="text-3xl font-bold text-emerald-700">{validationReport.validCount}</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-destructive uppercase tracking-wider mb-1">Errors Found</p>
                  <p className="text-3xl font-bold text-destructive">{validationReport.errorCount}</p>
                </div>
              </div>

              {validationReport.errorCount > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-destructive/10 p-3 flex items-center font-medium text-destructive">
                    <AlertTriangle className="w-4 h-4 mr-2" /> Error Report (Partial imports are allowed)
                  </div>
                  <ScrollArea className="h-64">
                    <div className="p-4 space-y-4">
                      {validationReport.errors.map((err: any, i: number) => (
                        <div key={i} className="flex gap-4 text-sm border-b pb-4 last:border-0 last:pb-0">
                          <div className="w-16 shrink-0 font-mono text-muted-foreground">Row {err.row}</div>
                          <div className="flex-1">
                            <ul className="list-disc pl-4 space-y-1 text-destructive">
                              {err.errors.map((e: string, j: number) => (
                                <li key={j}>{e}</li>
                              ))}
                            </ul>
                            <div className="mt-2 bg-muted p-2 rounded text-xs font-mono text-muted-foreground overflow-x-auto">
                              {JSON.stringify(err.data)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={reset}>Cancel</Button>
                <Button onClick={handleCommit} disabled={isLoading || validationReport.validCount === 0} className="gap-2">
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Commit {validationReport.validCount} Valid Records <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in zoom-in-95 fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold">Import Successful</h2>
              <p className="text-muted-foreground max-w-md">
                Successfully committed {validationReport?.validCount} records into the {entityType} hierarchy. The master data tree has been updated.
              </p>
              <Button variant="outline" className="mt-8 gap-2" onClick={reset}>
                <RotateCcw className="w-4 h-4" /> Start New Import
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
