import React, { useState } from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Library } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const DepartmentManager: React.FC = () => {
  const { toast } = useToast();
  const { useSchools, useDepartments, useCreateDepartment } = useAcademic();
  const { data: schools } = useSchools();
  const { data: departments, isLoading } = useDepartments();
  const createDepartment = useCreateDepartment();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ departmentName: '', departmentCode: '', schoolId: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDepartment.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Department created successfully' });
        setIsAdding(false);
        setFormData({ departmentName: '', departmentCode: '', schoolId: '' });
      },
      onError: (err: any) => {
        toast({ title: 'Error', description: err.response?.data?.message || 'Failed to create department', variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Library className="w-5 h-5 text-primary" /> Departments</CardTitle>
          <CardDescription>Manage departments mapped to schools.</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Department
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Parent School</Label>
                <Select required value={formData.schoolId} onValueChange={v => setFormData({...formData, schoolId: v})}>
                  <SelectTrigger><SelectValue placeholder="Select School" /></SelectTrigger>
                  <SelectContent>
                    {schools?.map((s: any) => <SelectItem key={s._id} value={s._id}>{s.schoolName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department Name</Label>
                <Input required value={formData.departmentName} onChange={e => setFormData({...formData, departmentName: e.target.value})} placeholder="Dept of Computer Science" />
              </div>
              <div className="space-y-2">
                <Label>Department Code</Label>
                <Input required value={formData.departmentCode} onChange={e => setFormData({...formData, departmentCode: e.target.value})} placeholder="CS" className="uppercase" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={createDepartment.isPending}>
                {createDepartment.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {departments?.map((dept: any) => (
              <div key={dept._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{dept.departmentName} <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">{dept.departmentCode}</span></h4>
                  <p className="text-sm text-muted-foreground">School: {dept.schoolId?.schoolName}</p>
                </div>
              </div>
            ))}
            {departments?.length === 0 && <p className="text-center text-muted-foreground p-4">No departments found.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
