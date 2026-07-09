import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

interface SubjectStatisticsProps {
  data: {
    subjects?: any[];
    pagination?: { total: number };
  };
}

export const SubjectStatistics: React.FC<SubjectStatisticsProps> = ({ data }) => {
  const totalSubjects = data?.pagination?.total || 0;
  const activeSubjects = data?.subjects?.filter(s => s.status === 'ACTIVE').length || 0;
  const inactiveSubjects = data?.subjects?.filter(s => s.status === 'INACTIVE').length || 0;
  
  // Calculate average credits (simplified)
  let totalCredits = 0;
  data?.subjects?.forEach(s => { totalCredits += (s.credits || 0); });
  const avgCredits = totalSubjects > 0 ? (totalCredits / data!.subjects!.length).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-primary/5 border-primary/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary"><BookOpen className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{totalSubjects}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Subjects</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500/5 border-green-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600"><CheckCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{activeSubjects}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Active Subjects</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-500/5 border-orange-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-full text-orange-600"><AlertTriangle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{inactiveSubjects}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Inactive Subjects</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/5 border-blue-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-600"><Layers className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{avgCredits}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Avg Credits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
