import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchoolManager } from '../components/SchoolManager';
import { DepartmentManager } from '../components/DepartmentManager';
import { CourseManager } from '../components/CourseManager';
import { SemesterManager } from '../components/SemesterManager';
import { SubjectManager } from '../components/SubjectManager';
import { AcademicTree } from '../components/AcademicTree';
import { BreadcrumbNavigation } from '../components/BreadcrumbNavigation';
import { Building2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent } from '@/components/ui/card';

export default function AcademicManagementPage() {
  const { useOverview } = useAcademic();
  const { data: stats } = useOverview();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" /> Academic Master Data
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage the core structural hierarchy of the university. This data propagates across the entire platform.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Global Academic Search..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20 shadow-none"><CardContent className="p-4 text-center"><h3 className="text-2xl font-bold text-blue-600">{stats?.schools || 0}</h3><p className="text-sm font-medium text-blue-600/80">Schools</p></CardContent></Card>
        <Card className="bg-purple-500/10 border-purple-500/20 shadow-none"><CardContent className="p-4 text-center"><h3 className="text-2xl font-bold text-purple-600">{stats?.departments || 0}</h3><p className="text-sm font-medium text-purple-600/80">Departments</p></CardContent></Card>
        <Card className="bg-green-500/10 border-green-500/20 shadow-none"><CardContent className="p-4 text-center"><h3 className="text-2xl font-bold text-green-600">{stats?.courses || 0}</h3><p className="text-sm font-medium text-green-600/80">Courses</p></CardContent></Card>
        <Card className="bg-amber-500/10 border-amber-500/20 shadow-none"><CardContent className="p-4 text-center"><h3 className="text-2xl font-bold text-amber-600">{stats?.semesters || 0}</h3><p className="text-sm font-medium text-amber-600/80">Semesters</p></CardContent></Card>
        <Card className="bg-red-500/10 border-red-500/20 shadow-none"><CardContent className="p-4 text-center"><h3 className="text-2xl font-bold text-red-600">{stats?.subjects || 0}</h3><p className="text-sm font-medium text-red-600/80">Subjects</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Tabs defaultValue="schools" className="space-y-6">
            <TabsList className="bg-muted p-1 grid grid-cols-5 h-auto">
              <TabsTrigger value="schools" className="py-2">Schools</TabsTrigger>
              <TabsTrigger value="departments" className="py-2">Departments</TabsTrigger>
              <TabsTrigger value="courses" className="py-2">Courses</TabsTrigger>
              <TabsTrigger value="semesters" className="py-2">Semesters</TabsTrigger>
              <TabsTrigger value="subjects" className="py-2">Subjects</TabsTrigger>
            </TabsList>

            <TabsContent value="schools" className="mt-0"><SchoolManager /></TabsContent>
            <TabsContent value="departments" className="mt-0"><DepartmentManager /></TabsContent>
            <TabsContent value="courses" className="mt-0"><CourseManager /></TabsContent>
            <TabsContent value="semesters" className="mt-0"><SemesterManager /></TabsContent>
            <TabsContent value="subjects" className="mt-0"><SubjectManager /></TabsContent>
          </Tabs>
        </div>
        
        <div className="xl:col-span-1">
          <AcademicTree />
        </div>
      </div>
    </div>
  );
}
