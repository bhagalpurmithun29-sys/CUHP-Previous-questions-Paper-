import React, { useState } from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, GraduationCap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const CourseManager: React.FC = () => {
  const { toast } = useToast();
  const { useDepartments, useCourses, useCreateCourse } = useAcademic();
  const { data: departments } = useDepartments();
  const { data: courses, isLoading } = useCourses();
  const createCourse = useCreateCourse();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ courseName: '', courseCode: '', department: '', durationYears: 3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourse.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Course created successfully' });
        setIsAdding(false);
        setFormData({ courseName: '', courseCode: '', department: '', durationYears: 3 });
      },
      onError: (err: any) => {
        toast({ title: 'Error', description: err.response?.data?.message || 'Failed to create course', variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Courses</CardTitle>
          <CardDescription>Manage academic courses and degrees.</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Course
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Parent Department</Label>
                <Select required value={formData.department} onValueChange={v => setFormData({...formData, department: v})}>
                  <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
                  <SelectContent>
                    {departments?.map((d: any) => <SelectItem key={d._id} value={d._id}>{d.departmentName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Course Name</Label>
                <Input required value={formData.courseName} onChange={e => setFormData({...formData, courseName: e.target.value})} placeholder="MCA" />
              </div>
              <div className="space-y-2">
                <Label>Course Code</Label>
                <Input required value={formData.courseCode} onChange={e => setFormData({...formData, courseCode: e.target.value})} placeholder="MCA" className="uppercase" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Duration (Years)</Label>
                <Input required type="number" min={1} max={5} value={formData.durationYears} onChange={e => setFormData({...formData, durationYears: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={createCourse.isPending}>
                {createCourse.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {courses?.map((course: any) => (
              <div key={course._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{course.courseName} <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">{course.courseCode}</span></h4>
                  <p className="text-sm text-muted-foreground">Dept: {course.department?.departmentName} • {course.durationYears} Years</p>
                </div>
              </div>
            ))}
            {courses?.length === 0 && <p className="text-center text-muted-foreground p-4">No courses found.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
