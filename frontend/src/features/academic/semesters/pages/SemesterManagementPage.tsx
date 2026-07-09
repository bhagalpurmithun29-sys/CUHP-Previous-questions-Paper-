import React, { useState } from 'react';
import { useSemesters, useSemester } from '../hooks/useSemesters';
import { useSemester as useSingleSemester } from '../hooks/useSemester';
import { SemesterTable } from '../components/SemesterTable';
import { SemesterCard } from '../components/SemesterCard';
import { SemesterForm } from '../components/SemesterForm';
import { SemesterFilters } from '../components/SemesterFilters';
import { SemesterStatistics } from '../components/SemesterStatistics';
import { DeleteSemesterDialog } from '../components/DeleteSemesterDialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SemesterManagementPage() {
  const { toast } = useToast();
  
  // State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentFilter, setCurrentFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<any>(null);
  const [deletingSemester, setDeletingSemester] = useState<any>(null);

  // Split sort parameter
  const [sortField, sortOrder] = sortBy.split('_');

  // Queries
  const { data, isLoading, createSemester, isCreating } = useSemesters({
    page,
    limit: viewMode === 'table' ? 10 : 12,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    isCurrentSemester: currentFilter === 'CURRENT' ? 'true' : undefined,
    sortBy: sortField,
    sortOrder: sortOrder as 'asc' | 'desc'
  });

  const actingSemesterHooks = useSingleSemester(editingSemester?._id || deletingSemester?._id || '');
  const { updateSemester, isUpdating, archiveSemester, restoreSemester, deleteSemester, isDeleting } = actingSemesterHooks;

  // Handlers
  const handleFormSubmit = (formData: any) => {
    if (editingSemester) {
      updateSemester(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Semester updated successfully' });
          setIsFormOpen(false);
          setEditingSemester(null);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Update failed', variant: 'destructive' })
      });
    } else {
      createSemester(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Semester created successfully' });
          setIsFormOpen(false);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Creation failed', variant: 'destructive' })
      });
    }
  };

  const handleArchive = (id: string) => {
    archiveSemester(undefined, {
      onSuccess: () => toast({ title: 'Archived', description: 'Semester has been archived.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to archive semester.', variant: 'destructive' })
    });
  };

  const handleRestore = (id: string) => {
    restoreSemester(undefined, {
      onSuccess: () => toast({ title: 'Restored', description: 'Semester has been restored.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to restore semester.', variant: 'destructive' })
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingSemester) return;
    deleteSemester(undefined, {
      onSuccess: () => {
        toast({ title: 'Deleted', description: 'Semester deleted permanently.' });
        setDeletingSemester(null);
      },
      onError: (err: any) => {
        toast({ title: 'Delete Failed', description: err.response?.data?.message || 'Failed to delete semester.', variant: 'destructive' });
        setDeletingSemester(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Semesters' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semester Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage academic sessions and link semesters to courses.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1 border">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('table')}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
          <Button onClick={() => { setEditingSemester(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New Semester
          </Button>
        </div>
      </div>

      <SemesterStatistics data={data} />

      <SemesterFilters 
        search={search} setSearch={setSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <SemesterForm 
              initialData={editingSemester} 
              onSubmit={handleFormSubmit} 
              isSubmitting={isCreating || isUpdating} 
              onCancel={() => { setIsFormOpen(false); setEditingSemester(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <SemesterTable 
              semesters={data?.semesters || []} 
              onEdit={(s) => { setEditingSemester(s); setIsFormOpen(true); }}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={setDeletingSemester}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.semesters?.map((semester: any) => (
                <SemesterCard 
                  key={semester._id} 
                  semester={semester}
                  onEdit={(s) => { setEditingSemester(s); setIsFormOpen(true); }}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onDelete={setDeletingSemester}
                />
              ))}
              {data?.semesters?.length === 0 && <div className="col-span-full text-center p-8 text-muted-foreground border rounded-lg bg-card">No semesters found matching your criteria.</div>}
            </div>
          )}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total semesters)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteSemesterDialog 
        isOpen={!!deletingSemester}
        setIsOpen={(open) => !open && setDeletingSemester(null)}
        semester={deletingSemester}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
