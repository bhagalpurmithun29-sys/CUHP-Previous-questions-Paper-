import React, { useState } from 'react';
import { useSchools, useSchool } from '../hooks/useSchools';
import { useSchool as useSingleSchool } from '../hooks/useSchool';
import { SchoolTable } from '../components/SchoolTable';
import { SchoolCard } from '../components/SchoolCard';
import { SchoolForm } from '../components/SchoolForm';
import { SchoolFilters } from '../components/SchoolFilters';
import { SchoolStatistics } from '../components/SchoolStatistics';
import { DeleteSchoolDialog } from '../components/DeleteSchoolDialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchoolManagementPage() {
  const { toast } = useToast();
  
  // State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<any>(null);
  const [deletingSchool, setDeletingSchool] = useState<any>(null);

  // Split sort parameter
  const [sortField, sortOrder] = sortBy.split('_');

  // Queries
  const { data, isLoading, createSchool, isCreating } = useSchools({
    page,
    limit: viewMode === 'table' ? 10 : 12,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    sortBy: sortField,
    sortOrder: sortOrder as 'asc' | 'desc'
  });

  // Since useSchool operates on an ID, we'll extract the mutations to a dummy call or use it per action. 
  // We can just use the mutations from a generic useSingleSchool without an ID initially, or handle it via a wrapper.
  // We'll use the ID of the currently acting school.
  const actingSchoolHooks = useSingleSchool(editingSchool?._id || deletingSchool?._id || '');
  const { updateSchool, isUpdating, archiveSchool, restoreSchool, deleteSchool, isDeleting } = actingSchoolHooks;

  // Handlers
  const handleFormSubmit = (formData: any) => {
    if (editingSchool) {
      updateSchool(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'School updated successfully' });
          setIsFormOpen(false);
          setEditingSchool(null);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Update failed', variant: 'destructive' })
      });
    } else {
      createSchool(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'School created successfully' });
          setIsFormOpen(false);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Creation failed', variant: 'destructive' })
      });
    }
  };

  const handleArchive = (id: string) => {
    archiveSchool(undefined, {
      onSuccess: () => toast({ title: 'Archived', description: 'School has been archived.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to archive school.', variant: 'destructive' })
    });
  };

  const handleRestore = (id: string) => {
    restoreSchool(undefined, {
      onSuccess: () => toast({ title: 'Restored', description: 'School has been restored.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to restore school.', variant: 'destructive' })
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingSchool) return;
    deleteSchool(undefined, {
      onSuccess: () => {
        toast({ title: 'Deleted', description: 'School deleted permanently.' });
        setDeletingSchool(null);
      },
      onError: (err: any) => {
        toast({ title: 'Delete Failed', description: err.response?.data?.message || 'Failed to delete school.', variant: 'destructive' });
        setDeletingSchool(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Schools' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Directory</h1>
          <p className="text-muted-foreground mt-1">Manage university schools, faculties, and overarching academic divisions.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1 border">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('table')}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
          <Button onClick={() => { setEditingSchool(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New School
          </Button>
        </div>
      </div>

      <SchoolStatistics data={data} />

      <SchoolFilters 
        search={search} setSearch={setSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <SchoolForm 
              initialData={editingSchool} 
              onSubmit={handleFormSubmit} 
              isSubmitting={isCreating || isUpdating} 
              onCancel={() => { setIsFormOpen(false); setEditingSchool(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <SchoolTable 
              schools={data?.schools || []} 
              onEdit={(s) => { setEditingSchool(s); setIsFormOpen(true); }}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={setDeletingSchool}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.schools?.map((school: any) => (
                <SchoolCard 
                  key={school._id} 
                  school={school}
                  onEdit={(s) => { setEditingSchool(s); setIsFormOpen(true); }}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onDelete={setDeletingSchool}
                />
              ))}
              {data?.schools?.length === 0 && <div className="col-span-full text-center p-8 text-muted-foreground border rounded-lg bg-card">No schools found matching your criteria.</div>}
            </div>
          )}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total schools)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteSchoolDialog 
        isOpen={!!deletingSchool}
        setIsOpen={(open) => !open && setDeletingSchool(null)}
        school={deletingSchool}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
