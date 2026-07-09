import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Library, BookOpen, CheckCircle } from 'lucide-react';

interface SchoolStatisticsProps {
  data: {
    schools?: any[];
    pagination?: { total: number };
  };
}

export const SchoolStatistics: React.FC<SchoolStatisticsProps> = ({ data }) => {
  const totalSchools = data?.pagination?.total || 0;
  const activeSchools = data?.schools?.filter(s => s.status === 'ACTIVE').length || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-primary/5 border-primary/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary"><Building2 className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{totalSchools}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Schools</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500/5 border-green-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600"><CheckCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{activeSchools}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Active Schools</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-500/5 border-purple-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-full text-purple-600"><Library className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Departments</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-500/5 border-amber-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-600"><BookOpen className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">45</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Courses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
