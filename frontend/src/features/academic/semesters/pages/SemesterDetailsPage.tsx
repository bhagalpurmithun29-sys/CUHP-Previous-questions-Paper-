import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSemester } from '../hooks/useSemester';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, CalendarDays, BookOpen, ChevronRight, CheckCircle2, Building2, GraduationCap, Library } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function SemesterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: semester, isLoading, isError } = useSemester(id || '');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (isError || !semester) {
    return <div className="container mx-auto p-6"><Card><CardContent className="p-8 text-center text-red-500">Error loading semester details or semester not found.</CardContent></Card></div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[
        { label: 'Administration', href: '/admin' }, 
        { label: 'Academic Master Data', href: '/admin/academic' }, 
        { label: 'Semesters', href: '/admin/academic/semesters' },
        { label: `Semester ${semester.semesterNumber}` }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CalendarDays className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-2xl">Semester {semester.semesterNumber}</CardTitle>
                      {semester.isCurrentSemester && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Current
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {semester.semesterName && <span className="text-sm font-medium border px-2 py-0.5 rounded bg-muted/50">{semester.semesterName}</span>}
                      {semester.academicSession && <span className="text-sm font-medium border px-2 py-0.5 rounded">{semester.academicSession} {semester.academicYear && `(${semester.academicYear})`}</span>}
                    </CardDescription>
                  </div>
                </div>
                <SchoolStatusBadge status={semester.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <GraduationCap className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Parent Course</p>
                    <Link to={`/admin/academic/courses/${semester.courseId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      {semester.courseId?.courseName} ({semester.courseId?.courseCode})
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <Library className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Derived Department</p>
                    <Link to={`/admin/academic/departments/${semester.courseId?.departmentId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      {semester.courseId?.departmentId?.departmentName}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-medium text-sm">{semester.semesterType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Parity</p>
                  <p className="font-medium text-sm">{semester.isOdd ? 'Odd Semester' : 'Even Semester'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Credits</p>
                  <p className="font-medium text-sm">{semester.credits || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Duration</p>
                  <div className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border">
                    <div>
                      <p className="text-xs text-muted-foreground">Start Date</p>
                      <p className="font-medium text-sm">{semester.startDate ? format(new Date(semester.startDate), 'PPP') : 'Not Set'}</p>
                    </div>
                    <div className="text-muted-foreground">→</div>
                    <div>
                      <p className="text-xs text-muted-foreground">End Date</p>
                      <p className="font-medium text-sm">{semester.endDate ? format(new Date(semester.endDate), 'PPP') : 'Not Set'}</p>
                    </div>
                  </div>
                </div>
                {/* Additional timelines can be added here like Registration, Exams, etc. */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics & Activity */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Syllabus Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <BookOpen className="w-4 h-4" /> <span className="font-medium text-sm">Subjects Configured</span>
                </div>
                <span className="font-bold text-lg text-blue-700 dark:text-blue-300">
                  {semester.stats?.subjectsCount || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                  <Library className="w-4 h-4" /> <span className="font-medium text-sm">Question Papers</span>
                </div>
                <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">-</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
