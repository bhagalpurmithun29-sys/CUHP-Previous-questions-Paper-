import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaperRepository } from '../hooks/usePaperRepository';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { PaperStatusBadge } from '../components/PaperStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, FileText, CheckCircle2, XCircle, ArrowLeft, Clock, Map } from 'lucide-react';
import { format } from 'date-fns';

export default function PaperDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPaper, updateStatus, isMutating } = usePaperRepository();
  
  const { data: paper, isLoading, error } = getPaper(id || '');

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (error || !paper) return <div className="p-20 text-center text-destructive">Failed to load paper details.</div>;

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4" /></Button>
        <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Repository', href: '/admin/papers' }, { label: paper.paperCode }]} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{paper.title}</h1>
            <PaperStatusBadge status={paper.status} className="scale-110 origin-left" />
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="font-mono">{paper.paperCode}</span> • Uploaded by {paper.uploaderId?.name} on {format(new Date(paper.createdAt), 'PP')}
          </p>
        </div>

        <div className="flex gap-2">
          {paper.status === 'PENDING_REVIEW' && (
            <>
              <Button 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={() => updateStatus({ id: paper._id, status: 'REJECTED' })}
                disabled={isMutating}
              >
                <XCircle className="w-4 h-4 mr-2" /> Reject
              </Button>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => updateStatus({ id: paper._id, status: 'APPROVED' })}
                disabled={isMutating}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
              </Button>
            </>
          )}
          <Button variant="secondary"><Download className="w-4 h-4 mr-2" /> Download Original</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Metadata</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
              <div><p className="text-sm text-muted-foreground">Academic Year</p><p className="font-medium">{paper.academicYear}</p></div>
              <div><p className="text-sm text-muted-foreground">Exam Session</p><p className="font-medium capitalize">{paper.examSession.toLowerCase()}</p></div>
              <div><p className="text-sm text-muted-foreground">Exam Type</p><p className="font-medium capitalize">{paper.examType.replace('_', ' ').toLowerCase()}</p></div>
              <div><p className="text-sm text-muted-foreground">Max Marks</p><p className="font-medium">{paper.maximumMarks}</p></div>
              <div><p className="text-sm text-muted-foreground">Duration (Mins)</p><p className="font-medium">{paper.durationMinutes}</p></div>
              <div><p className="text-sm text-muted-foreground">Language</p><p className="font-medium">{paper.language}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Map className="w-5 h-5 text-primary" /> Academic Lineage</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500" /><div><p className="text-xs text-muted-foreground">School</p><p className="font-medium">{paper.schoolId?.schoolName}</p></div></div>
                <div className="flex items-center gap-3 ml-4 border-l-2 pl-4"><div className="w-2 h-2 rounded-full bg-indigo-500" /><div><p className="text-xs text-muted-foreground">Department</p><p className="font-medium">{paper.departmentId?.departmentName}</p></div></div>
                <div className="flex items-center gap-3 ml-8 border-l-2 pl-4"><div className="w-2 h-2 rounded-full bg-purple-500" /><div><p className="text-xs text-muted-foreground">Course</p><p className="font-medium">{paper.courseId?.courseName}</p></div></div>
                <div className="flex items-center gap-3 ml-12 border-l-2 pl-4"><div className="w-2 h-2 rounded-full bg-pink-500" /><div><p className="text-xs text-muted-foreground">Semester</p><p className="font-medium">{paper.semesterId?.semesterName || `Semester ${paper.semesterId?.semesterNumber}`}</p></div></div>
                <div className="flex items-center gap-3 ml-16 border-l-2 pl-4"><div className="w-2 h-2 rounded-full bg-emerald-500" /><div><p className="text-xs text-emerald-600 font-bold uppercase">Subject Target</p><p className="font-medium">{paper.subjectId?.subjectName} ({paper.subjectId?.subjectCode})</p></div></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">File Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center border relative overflow-hidden">
                {paper.thumbnailUrl ? <img src={paper.thumbnailUrl} alt="Cover" className="w-full h-full object-cover" /> : <FileText className="w-16 h-16 text-muted-foreground/30" />}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{(paper.fileSize / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pages:</span>
                <span className="font-medium">{paper.pageCount} Pages</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Processing Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">OCR Extraction</span><span className={`text-xs font-bold ${paper.ocrStatus === 'COMPLETED' ? 'text-emerald-500' : 'text-yellow-500'}`}>{paper.ocrStatus}</span></div>
                <p className="text-xs text-muted-foreground">Optical character recognition for full-text search capability.</p>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">AI Analysis</span><span className={`text-xs font-bold ${paper.aiAnalysisStatus === 'COMPLETED' ? 'text-emerald-500' : 'text-yellow-500'}`}>{paper.aiAnalysisStatus}</span></div>
                <p className="text-xs text-muted-foreground">Automatic tagging, difficulty rating, and metadata extraction.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
