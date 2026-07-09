import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourse } from '../hooks/useCourse';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SchoolStatusBadge } from '../../schools/components/SchoolStatusBadge';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, GraduationCap, Building2, Library, ChevronRight, Calendar, BookOpen, Clock } from 'lucide-react';

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, isError } = useCourse(id || '');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (isError || !course) {
    return <div className="container mx-auto p-6"><Card><CardContent className="p-8 text-center text-red-500">Error loading course details or course not found.</CardContent></Card></div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[
        { label: 'Administration', href: '/admin' }, 
        { label: 'Academic Master Data', href: '/admin/academic' }, 
        { label: 'Courses', href: '/admin/academic/courses' },
        { label: course.courseCode }
      ]} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{course.courseName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-mono font-bold">{course.courseCode}</span>
                      {course.degree && <span className="text-sm font-medium border px-2 py-0.5 rounded">{course.degree}</span>}
                    </CardDescription>
                  </div>
                </div>
                <SchoolStatusBadge status={course.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <Library className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Parent Department</p>
                    <Link to={`/admin/academic/departments/${course.departmentId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      {course.departmentId?.departmentName}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-muted/50 rounded-lg border">
                  <Building2 className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Derived School</p>
                    <Link to={`/admin/academic/schools/${course.schoolId?._id}`} className="font-medium text-primary hover:underline flex items-center">
                      {course.schoolId?.schoolName}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Curriculum Description</h3>
                <p className="text-sm">{course.description || 'No description provided.'}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Duration</p>
                  <p className="font-medium text-sm">{course.duration} {course.durationUnit}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Program Type</p>
                  <p className="font-medium text-sm">{course.programType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Semesters</p>
                  <p className="font-medium text-sm">{course.totalSemesters}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Credits</p>
                  <p className="font-medium text-sm">{course.credits || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics & Activity */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Calendar className="w-4 h-4" /> <span className="font-medium text-sm">Semesters Configured</span>
                </div>
                <span className="font-bold text-lg text-amber-700 dark:text-amber-300">
                  {course.stats?.semestersCount || 0} / {course.totalSemesters}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <BookOpen className="w-4 h-4" /> <span className="font-medium text-sm">Subjects Mapped</span>
                </div>
                <span className="font-bold text-lg text-blue-700 dark:text-blue-300">-</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center p-4">
                Timeline feed placeholder. Integration with Semester configuration required to display timeline.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
