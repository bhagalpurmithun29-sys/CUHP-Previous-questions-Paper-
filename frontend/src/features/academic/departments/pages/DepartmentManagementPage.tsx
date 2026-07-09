import React, { useState } from 'react';
import { useDepartments, useDepartment } from '../hooks/useDepartments';
import { useDepartment as useSingleDepartment } from '../hooks/useDepartment';
import { DepartmentTable } from '../components/DepartmentTable';
import { DepartmentCard } from '../components/DepartmentCard';
import { DepartmentForm } from '../components/DepartmentForm';
import { DepartmentFilters } from '../components/DepartmentFilters';
import { DepartmentStatistics } from '../components/DepartmentStatistics';
import { DeleteDepartmentDialog } from '../components/DeleteDepartmentDialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DepartmentManagementPage() {
  const { toast } = useToast();
  
  // State
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [schoolFilter, setSchoolFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<any>(null);
  const [deletingDept, setDeletingDept] = useState<any>(null);

  // Split sort parameter
  const [sortField, sortOrder] = sortBy.split('_');

  // Queries
  const { data, isLoading, createDepartment, isCreating } = useDepartments({
    page,
    limit: viewMode === 'table' ? 10 : 12,
    search: search || undefined,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    schoolId: schoolFilter !== 'ALL' ? schoolFilter : undefined,
    sortBy: sortField,
    sortOrder: sortOrder as 'asc' | 'desc'
  });

  const actingDeptHooks = useSingleDepartment(editingDept?._id || deletingDept?._id || '');
  const { updateDepartment, isUpdating, archiveDepartment, restoreDepartment, deleteDepartment, isDeleting } = actingDeptHooks;

  // Handlers
  const handleFormSubmit = (formData: any) => {
    if (editingDept) {
      updateDepartment(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Department updated successfully' });
          setIsFormOpen(false);
          setEditingDept(null);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Update failed', variant: 'destructive' })
      });
    } else {
      createDepartment(formData, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Department created successfully' });
          setIsFormOpen(false);
        },
        onError: (err: any) => toast({ title: 'Error', description: err.response?.data?.message || 'Creation failed', variant: 'destructive' })
      });
    }
  };

  const handleArchive = (id: string) => {
    archiveDepartment(undefined, {
      onSuccess: () => toast({ title: 'Archived', description: 'Department has been archived.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to archive department.', variant: 'destructive' })
    });
  };

  const handleRestore = (id: string) => {
    restoreDepartment(undefined, {
      onSuccess: () => toast({ title: 'Restored', description: 'Department has been restored.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to restore department.', variant: 'destructive' })
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingDept) return;
    deleteDepartment(undefined, {
      onSuccess: () => {
        toast({ title: 'Deleted', description: 'Department deleted permanently.' });
        setDeletingDept(null);
      },
      onError: (err: any) => {
        toast({ title: 'Delete Failed', description: err.response?.data?.message || 'Failed to delete department.', variant: 'destructive' });
        setDeletingDept(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Departments' }]} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Directory</h1>
          <p className="text-muted-foreground mt-1">Manage academic departments linked directly to schools.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-lg p-1 border">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('table')}><List className="w-4 h-4" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}><LayoutGrid className="w-4 h-4" /></Button>
          </div>
          <Button onClick={() => { setEditingDept(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New Department
          </Button>
        </div>
      </div>

      <DepartmentStatistics data={data} />

      <DepartmentFilters 
        search={search} setSearch={setSearch}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        schoolFilter={schoolFilter} setSchoolFilter={setSchoolFilter}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <DepartmentForm 
              initialData={editingDept} 
              onSubmit={handleFormSubmit} 
              isSubmitting={isCreating || isUpdating} 
              onCancel={() => { setIsFormOpen(false); setEditingDept(null); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <DepartmentTable 
              departments={data?.departments || []} 
              onEdit={(d) => { setEditingDept(d); setIsFormOpen(true); }}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={setDeletingDept}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.departments?.map((dept: any) => (
                <DepartmentCard 
                  key={dept._id} 
                  department={dept}
                  onEdit={(d) => { setEditingDept(d); setIsFormOpen(true); }}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  onDelete={setDeletingDept}
                />
              ))}
              {data?.departments?.length === 0 && <div className="col-span-full text-center p-8 text-muted-foreground border rounded-lg bg-card">No departments found matching your criteria.</div>}
            </div>
          )}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total departments)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteDepartmentDialog 
        isOpen={!!deletingDept}
        setIsOpen={(open) => !open && setDeletingDept(null)}
        department={deletingDept}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
