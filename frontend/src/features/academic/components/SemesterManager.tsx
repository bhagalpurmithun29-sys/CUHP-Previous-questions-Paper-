import React, { useState } from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const SemesterManager: React.FC = () => {
  const { toast } = useToast();
  const { useCourses, useSemesters, useCreateSemester } = useAcademic();
  const { data: courses } = useCourses();
  const { data: semesters, isLoading } = useSemesters();
  const createSemester = useCreateSemester();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ semesterNumber: 1, course: '', status: 'ACTIVE' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSemester.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Semester created successfully' });
        setIsAdding(false);
        setFormData({ semesterNumber: 1, course: '', status: 'ACTIVE' });
      },
      onError: (err: any) => {
        toast({ title: 'Error', description: err.response?.data?.message || 'Failed to create semester', variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Semesters</CardTitle>
          <CardDescription>Manage semesters for courses.</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Semester
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Parent Course</Label>
                <Select required value={formData.course} onValueChange={v => setFormData({...formData, course: v})}>
                  <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                  <SelectContent>
                    {courses?.map((c: any) => <SelectItem key={c._id} value={c._id}>{c.courseName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester Number</Label>
                <Input required type="number" min={1} max={10} value={formData.semesterNumber} onChange={e => setFormData({...formData, semesterNumber: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select required value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={createSemester.isPending}>
                {createSemester.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {semesters?.map((sem: any) => (
              <div key={sem._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">Semester {sem.semesterNumber}</h4>
                  <p className="text-sm text-muted-foreground">Course: {sem.course?.courseName}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${sem.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{sem.status}</span>
              </div>
            ))}
            {semesters?.length === 0 && <p className="text-center text-muted-foreground p-4">No semesters found.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
