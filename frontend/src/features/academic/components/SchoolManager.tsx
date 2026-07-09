import React, { useState } from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Building } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const SchoolManager: React.FC = () => {
  const { toast } = useToast();
  const { useSchools, useCreateSchool } = useAcademic();
  const { data: schools, isLoading } = useSchools();
  const createSchool = useCreateSchool();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ schoolName: '', schoolCode: '', deanName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSchool.mutate(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'School created successfully' });
        setIsAdding(false);
        setFormData({ schoolName: '', schoolCode: '', deanName: '' });
      },
      onError: (err: any) => {
        toast({ title: 'Error', description: err.response?.data?.message || 'Failed to create school', variant: 'destructive' });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Building className="w-5 h-5 text-primary" /> Schools</CardTitle>
          <CardDescription>Manage university schools (e.g., School of Earth Sciences)</CardDescription>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add School
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input required value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} placeholder="School of Earth Sciences" />
              </div>
              <div className="space-y-2">
                <Label>School Code</Label>
                <Input required value={formData.schoolCode} onChange={e => setFormData({...formData, schoolCode: e.target.value})} placeholder="SES" className="uppercase" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Dean Name (Optional)</Label>
                <Input value={formData.deanName} onChange={e => setFormData({...formData, deanName: e.target.value})} placeholder="Dr. John Doe" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={createSchool.isPending}>
                {createSchool.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {schools?.map((school: any) => (
              <div key={school._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{school.schoolName} <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2">{school.schoolCode}</span></h4>
                  {school.deanName && <p className="text-sm text-muted-foreground">Dean: {school.deanName}</p>}
                </div>
              </div>
            ))}
            {schools?.length === 0 && <p className="text-center text-muted-foreground p-4">No schools found. Create one to get started.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
