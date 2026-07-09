import React, { useState } from 'react';
import { useCourses, useCourse } from '../hooks/useCourses';
import { useCourse as useSingleCourse } from '../hooks/useCourse';
import { CourseTable } from '../components/CourseTable';
import { CourseCard } from '../components/CourseCard';
import { CourseForm } from '../components/CourseForm';
import { CourseFilters } from '../components/CourseFilters';
import { CourseStatistics } from '../components/CourseStatistics';
import { DeleteCourseDialog } from '../components/DeleteCourseDialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseManagementPage() {
  const { toast } = useToast();
  
  // State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [deletingCourse, setDeletingCourse] = useState<any>(null);

  // Split sort parameter
  const [sortField, sortOrder] = sortBy.split('_');

  // Queries
  const { data, isLoading, createCourse, isCreating } = useCourses({
    page,
    limit: viewMode === 'table' ? 10 : 12,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    departmentId: departmentFilter !== 'ALL' ? departmentFilter : undefined,
    sortBy: sortField,
    sortOrder: sortOrder as 'asc' | 'desc'
  });

  const actingCourseHooks = useSingleCourse(editingCourse?._id || deletingCourse?._id || '');
  const { updateCourse, isUpdating, archiveCourse, restoreCourse, deleteCourse, isDeleting } = actingCourseHooks;

  // Handlers
  const handleFormSubmit = (formData: any) => {
    if (editingCourse) {
      updateCourse(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Course updated successfully' });
          setIsFormOpen(false);
          setEditingCourse(null);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Update failed', variant: 'destructive' })
      });
    } else {
      createCourse(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Course created successfully' });
          setIsFormOpen(false);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Creation failed', variant: 'destructive' })
      });
    }
  };

  const handleArchive = (id: string) => {
    archiveCourse(undefined, {
      onSuccess: () => toast({ title: 'Archived', description: 'Course has been archived.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to archive course.', variant: 'destructive' })
    });
  };

  const handleRestore = (id: string) => {
    restoreCourse(undefined, {
      onSuccess: () => toast({ title: 'Restored', description: 'Course has been restored.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to restore course.', variant: 'destructive' })
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingCourse) return;
    deleteCourse(undefined, {
      onSuccess: () => {
        toast({ title: 'Deleted', description: 'Course deleted permanently.' });
        setDeletingCourse(null);
      },
      onError: (err: any) => {
        toast({ title: 'Delete Failed', description: err.response?.data?.message || 'Failed to delete course.', variant: 'destructive' });
        setDeletingCourse(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Courses' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Directory</h1>
          <p className="text-muted-foreground mt-1">Manage academic courses and configure curriculum dependencies.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1 border">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('table')}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
          <Button onClick={() => { setEditingCourse(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New Course
          </Button>
        </div>
      </div>

      <CourseStatistics data={data} />

      <CourseFilters 
        search={search} setSearch={setSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <CourseForm 
              initialData={editingCourse} 
              onSubmit={handleFormSubmit} 
              isSubmitting={isCreating || isUpdating} 
              onCancel={() => { setIsFormOpen(false); setEditingCourse(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <CourseTable 
              courses={data?.courses || []} 
              onEdit={(c) => { setEditingCourse(c); setIsFormOpen(true); }}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={setDeletingCourse}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.courses?.map((course: any) => (
                <CourseCard 
                  key={course._id} 
                  course={course}
                  onEdit={(c) => { setEditingCourse(c); setIsFormOpen(true); }}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onDelete={setDeletingCourse}
                />
              ))}
              {data?.courses?.length === 0 && <div className="col-span-full text-center p-8 text-muted-foreground border rounded-lg bg-card">No courses found matching your criteria.</div>}
            </div>
          )}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total courses)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteCourseDialog 
        isOpen={!!deletingCourse}
        setIsOpen={(open) => !open && setDeletingCourse(null)}
        course={deletingCourse}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
