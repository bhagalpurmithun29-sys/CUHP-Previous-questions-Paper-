import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

interface CourseStatisticsProps {
  data: {
    courses?: any[];
    pagination?: { total: number };
  };
}

export const CourseStatistics: React.FC<CourseStatisticsProps> = ({ data }) => {
  const totalCourses = data?.pagination?.total || 0;
  const activeCourses = data?.courses?.filter(c => c.status === 'ACTIVE').length || 0;
  const inactiveCourses = data?.courses?.filter(c => c.status === 'INACTIVE').length || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-primary/5 border-primary/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary"><GraduationCap className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{totalCourses}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Courses</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-500/5 border-green-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full text-green-600"><CheckCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{activeCourses}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Active Courses</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-500/5 border-orange-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-full text-orange-600"><AlertTriangle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">{inactiveCourses}</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Inactive Courses</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/5 border-blue-500/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-600"><Calendar className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold">~</p>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Semesters</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
