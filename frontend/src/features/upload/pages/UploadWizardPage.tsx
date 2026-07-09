import React, { useState } from 'react';
import { useUploadWizard } from '../hooks/useUploadWizard';
import { FileDropzone } from '../components/FileDropzone';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import { useAcademicHierarchy } from '../../academic/hooks/useAcademicHierarchy';

export default function UploadWizardPage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  const { submitUpload, isUploading } = useUploadWizard();
  const { fetchHierarchy } = useAcademicHierarchy();
  
  // Minimal fetching for demo, in real app we load subjects directly
  const [subjects, setSubjects] = useState<any[]>([]);
  React.useEffect(() => {
    fetchHierarchy('SUBJECT').then((res: any) => setSubjects(res.data));
  }, []);

  const handleNext = () => setStep(s => s + 1);
  const handleSubmit = async () => {
    // In production, build FormData object
    await submitUpload({ ...formData, fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf' });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Papers', href: '/admin/papers' }, { label: 'Upload Wizard' }]} />
      
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Upload Pipeline</h1>
        <p className="text-muted-foreground">Upload, classify, and dispatch papers into the AI extraction queue.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
        
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border'}`}>
            {step > s ? <Check className="w-5 h-5" /> : s}
          </div>
        ))}
      </div>

      <Card className="shadow-md">
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold">1. Select Document</h2>
              <FileDropzone onFileSelect={setFile} />
              <div className="flex justify-end"><Button disabled={!file} onClick={handleNext}>Next Step <ChevronRight className="w-4 h-4 ml-2" /></Button></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold">2. Academic Metadata</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paper Title *</label>
                  <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. End Term Mathematics 101" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paper Code *</label>
                  <Input value={formData.paperCode || ''} onChange={e => setFormData({...formData, paperCode: e.target.value})} placeholder="e.g. MATH-2023-END" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Subject *</label>
                  <Select onValueChange={v => setFormData({...formData, subjectId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                    <SelectContent>
                      {subjects.map(sub => <SelectItem key={sub._id} value={sub._id}>{sub.subjectName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Year *</label>
                  <Select onValueChange={v => setFormData({...formData, academicYear: v})}>
                    <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
                    <SelectContent><SelectItem value="2023-2024">2023-2024</SelectItem><SelectItem value="2022-2023">2022-2023</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Session *</label>
                  <Select onValueChange={v => setFormData({...formData, examSession: v})}>
                    <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
                    <SelectContent><SelectItem value="AUTUMN">Autumn</SelectItem><SelectItem value="SPRING">Spring</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Type *</label>
                  <Select onValueChange={v => setFormData({...formData, examType: v})}>
                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent><SelectItem value="MID_TERM">Mid Term</SelectItem><SelectItem value="END_TERM">End Term</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Marks *</label>
                  <Input type="number" value={formData.maximumMarks || ''} onChange={e => setFormData({...formData, maximumMarks: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Minutes) *</label>
                  <Input type="number" value={formData.durationMinutes || ''} onChange={e => setFormData({...formData, durationMinutes: Number(e.target.value)})} />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button disabled={!formData.title || !formData.subjectId || !formData.examType} onClick={handleNext}>Review <ChevronRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold">3. Final Review</h2>
              <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">File</span>
                  <span className="font-medium">{file?.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Background Actions</span>
                  <span className="font-medium text-emerald-600">OCR & AI Extraction Queued</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">By submitting, this document will enter the moderation workflow for approval.</p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handleSubmit} disabled={isUploading} className="gap-2 bg-primary">
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                  Confirm Upload & Process
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
