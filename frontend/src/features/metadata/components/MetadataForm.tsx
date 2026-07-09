import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAcademicHierarchy } from '../../academic/hooks/useAcademicHierarchy';

export const MetadataForm: React.FC<{ paper: any, onSave: (data: any) => void, isSaving: boolean }> = ({ paper, onSave, isSaving }) => {
  const [formData, setFormData] = useState<any>({});
  const { fetchHierarchy } = useAcademicHierarchy();
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    if (paper) {
      setFormData({
        title: paper.title,
        paperCode: paper.paperCode,
        subjectId: paper.subjectId?._id || paper.subjectId,
        academicYear: paper.academicYear,
        examSession: paper.examSession,
        examType: paper.examType,
        maximumMarks: paper.maximumMarks,
        durationMinutes: paper.durationMinutes,
        language: paper.language,
        tags: paper.tags?.join(', ') || ''
      });
    }
    fetchHierarchy('SUBJECT').then((res: any) => setSubjects(res.data));
  }, [paper]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Paper Title</label>
          <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Paper Code</label>
          <Input value={formData.paperCode || ''} onChange={e => setFormData({...formData, paperCode: e.target.value})} />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject Mapping</label>
          <Select value={formData.subjectId || ''} onValueChange={v => setFormData({...formData, subjectId: v})}>
            <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
            <SelectContent>
              {subjects.map(s => <SelectItem key={s._id} value={s._id}>{s.subjectName}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Academic Year</label>
          <Select value={formData.academicYear || ''} onValueChange={v => setFormData({...formData, academicYear: v})}>
            <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
            <SelectContent><SelectItem value="2023-2024">2023-2024</SelectItem><SelectItem value="2022-2023">2022-2023</SelectItem></SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Exam Type</label>
          <Select value={formData.examType || ''} onValueChange={v => setFormData({...formData, examType: v})}>
            <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent><SelectItem value="MID_TERM">Mid Term</SelectItem><SelectItem value="END_TERM">End Term</SelectItem></SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select value={formData.language || ''} onValueChange={v => setFormData({...formData, language: v})}>
            <SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger>
            <SelectContent><SelectItem value="English">English</SelectItem><SelectItem value="Hindi">Hindi</SelectItem></SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Marks</label>
          <Input type="number" value={formData.maximumMarks || ''} onChange={e => setFormData({...formData, maximumMarks: Number(e.target.value)})} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (Mins)</label>
          <Input type="number" value={formData.durationMinutes || ''} onChange={e => setFormData({...formData, durationMinutes: Number(e.target.value)})} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Keywords / Tags (Comma separated)</label>
        <Textarea value={formData.tags || ''} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="e.g. calculus, matrix, linear algebra" />
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isSaving} className="bg-primary">{isSaving ? 'Saving...' : 'Save Metadata'}</Button>
      </div>
    </form>
  );
};
