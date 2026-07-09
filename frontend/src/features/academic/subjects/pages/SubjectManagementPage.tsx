import React, { useState } from 'react';
import { useSubjects, useSubject } from '../hooks/useSubjects';
import { useSubject as useSingleSubject } from '../hooks/useSubject';
import { SubjectTable } from '../components/SubjectTable';
import { SubjectCard } from '../components/SubjectCard';
import { SubjectForm } from '../components/SubjectForm';
import { SubjectFilters } from '../components/SubjectFilters';
import { SubjectStatistics } from '../components/SubjectStatistics';
import { DeleteSubjectDialog } from '../components/DeleteSubjectDialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectManagementPage() {
  const { toast } = useToast();
  
  // State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [deletingSubject, setDeletingSubject] = useState<any>(null);

  // Split sort parameter
  const [sortField, sortOrder] = sortBy.split('_');

  // Queries
  const { data, isLoading, createSubject, isCreating } = useSubjects({
    page,
    limit: viewMode === 'table' ? 10 : 12,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    subjectType: typeFilter !== 'ALL' ? typeFilter : undefined,
    sortBy: sortField,
    sortOrder: sortOrder as 'asc' | 'desc'
  });

  const actingSubjectHooks = useSingleSubject(editingSubject?._id || deletingSubject?._id || '');
  const { updateSubject, isUpdating, archiveSubject, restoreSubject, deleteSubject, isDeleting } = actingSubjectHooks;

  // Handlers
  const handleFormSubmit = (formData: any) => {
    if (editingSubject) {
      updateSubject(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Subject updated successfully' });
          setIsFormOpen(false);
          setEditingSubject(null);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Update failed', variant: 'destructive' })
      });
    } else {
      createSubject(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Subject created successfully' });
          setIsFormOpen(false);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Creation failed', variant: 'destructive' })
      });
    }
  };

  const handleDuplicate = (subject: any) => {
    const duplicatedData = {
      ...subject,
      subjectCode: `${subject.subjectCode}-COPY`,
      subjectName: `${subject.subjectName} (Copy)`,
      _id: undefined
    };
    setEditingSubject(duplicatedData);
    setIsFormOpen(true);
  };

  const handleArchive = (id: string) => {
    archiveSubject(undefined, {
      onSuccess: () => toast({ title: 'Archived', description: 'Subject has been archived.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to archive subject.', variant: 'destructive' })
    });
  };

  const handleRestore = (id: string) => {
    restoreSubject(undefined, {
      onSuccess: () => toast({ title: 'Restored', description: 'Subject has been restored.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to restore subject.', variant: 'destructive' })
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingSubject) return;
    deleteSubject(undefined, {
      onSuccess: () => {
        toast({ title: 'Deleted', description: 'Subject deleted permanently.' });
        setDeletingSubject(null);
      },
      onError: (err: any) => {
        toast({ title: 'Delete Failed', description: err.response?.data?.message || 'Failed to delete subject.', variant: 'destructive' });
        setDeletingSubject(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Subjects' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subject Directory</h1>
          <p className="text-muted-foreground mt-1">Manage curriculum structure, subjects, credits, and prerequisites.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1 border">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('table')}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
          <Button onClick={() => { setEditingSubject(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New Subject
          </Button>
        </div>
      </div>

      <SubjectStatistics data={data} />

      <SubjectFilters 
        search={search} setSearch={setSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <SubjectForm 
              initialData={editingSubject} 
              onSubmit={handleFormSubmit} 
              isSubmitting={isCreating || isUpdating} 
              onCancel={() => { setIsFormOpen(false); setEditingSubject(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <SubjectTable 
              subjects={data?.subjects || []} 
              onEdit={(s) => { setEditingSubject(s); setIsFormOpen(true); }}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={setDeletingSubject}
              onDuplicate={handleDuplicate}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.subjects?.map((subject: any) => (
                <SubjectCard 
                  key={subject._id} 
                  subject={subject}
                  onEdit={(s) => { setEditingSubject(s); setIsFormOpen(true); }}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onDelete={setDeletingSubject}
                />
              ))}
              {data?.subjects?.length === 0 && <div className="col-span-full text-center p-8 text-muted-foreground border rounded-lg bg-card">No subjects found matching your criteria.</div>}
            </div>
          )}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total subjects)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteSubjectDialog 
        isOpen={!!deletingSubject}
        setIsOpen={(open) => !open && setDeletingSubject(null)}
        subject={deletingSubject}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
