import React, { useState } from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const SubjectManager: React.FC = () => {
  const { toast } = useToast();
  const { useSemesters, useSubjects, useCreateSubject } = useAcademic();
  const { data: semesters } = useSemesters();
  const { data: subjects, isLoading } = useSubjects();
  const createSubject = useCreateSubject();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ subjectName: '', subjectCode: '', semester: '', credits: 4 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSubject.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Subject created successfully' });
        setIsAdding(false);
        setFormData({ subjectName: '', subjectCode: '', semester: '', credits: 4 });
      },
      onError: (err: any) => {
        toast({ title: 'Error', description: err.response?.data?.message || 'Failed to create subject', variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Subjects</CardTitle>
          <CardDescription>Manage academic subjects.</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Subject
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Parent Semester</Label>
                <Select required value={formData.semester} onValueChange={v => setFormData({...formData, semester: v})}>
                  <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                  <SelectContent>
                    {semesters?.map((s: any) => <SelectItem key={s._id} value={s._id}>{s.course?.courseName} - Sem {s.semesterNumber}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject Name</Label>
                <Input required value={formData.subjectName} onChange={e => setFormData({...formData, subjectName: e.target.value})} placeholder="Data Structures" />
              </div>
              <div className="space-y-2">
                <Label>Subject Code</Label>
                <Input required value={formData.subjectCode} onChange={e => setFormData({...formData, subjectCode: e.target.value})} placeholder="CS201" className="uppercase" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Credits</Label>
                <Input required type="number" min={1} max={10} value={formData.credits} onChange={e => setFormData({...formData, credits: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={createSubject.isPending}>
                {createSubject.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {subjects?.map((sub: any) => (
              <div key={sub._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{sub.subjectName} <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">{sub.subjectCode}</span></h4>
                  <p className="text-sm text-muted-foreground">Credits: {sub.credits} • Sem: {sub.semester?.semesterNumber}</p>
                </div>
              </div>
            ))}
            {subjects?.length === 0 && <p className="text-center text-muted-foreground p-4">No subjects found.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
