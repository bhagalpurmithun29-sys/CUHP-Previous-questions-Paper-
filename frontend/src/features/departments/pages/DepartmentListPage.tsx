import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiCheck, FiX } from 'react-icons/fi';
import { useDepartments, useDeleteDepartment } from '../hooks/useDepartment';
import { DepartmentFilters } from '../components/DepartmentFilters';
import { DeleteDepartmentModal } from '../components/DeleteDepartmentModal';
import { DepartmentStatus } from '../types/department.types';
import { useDebounce } from '../../../hooks/useDebounce'; 

export const DepartmentListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [statusFilter, setStatusFilter] = useState<DepartmentStatus | ''>('');
  const [schoolFilter, setSchoolFilter] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<{ id: string; name: string } | null>(null);

  const { data, isLoading } = useDepartments({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter,
    schoolId: schoolFilter || undefined,
  });

  const deleteMutation = useDeleteDepartment();

  const handleDelete = () => {
    if (departmentToDelete) {
      deleteMutation.mutate(departmentToDelete.id, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setDepartmentToDelete(null);
        },
      });
    }
  };

  const getStatusBadge = (status: DepartmentStatus) => {
    switch (status) {
      case DepartmentStatus.ACTIVE:
        return <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"><FiCheck className="mr-1 h-3 w-3" /> Active</span>;
      case DepartmentStatus.INACTIVE:
        return <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"><FiX className="mr-1 h-3 w-3" /> Inactive</span>;
      case DepartmentStatus.ARCHIVED:
        return <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Department Management</h1>
        <Link
          to="/admin/departments/create"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          Add Department
        </Link>
      </div>

      <DepartmentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        schoolFilter={schoolFilter}
        onSchoolChange={setSchoolFilter}
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">School</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                  </td>
                </tr>
              ) : data?.departments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No departments found matching your criteria.
                  </td>
                </tr>
              ) : (
                data?.departments.map((department) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={department._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                          {department.departmentName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{department.departmentName}</div>
                          <div className="text-sm text-gray-500">{department.hodName || 'No HOD assigned'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 font-medium">
                      {department.departmentCode}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {/* @ts-ignore */}
                      <div className="text-sm text-gray-900">{department.schoolId.schoolName}</div>
                      {/* @ts-ignore */}
                      <div className="text-xs text-gray-500">{department.schoolId.schoolCode}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusBadge(department.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link to={`/admin/departments/${department._id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FiEye className="h-5 w-5" />
                        </Link>
                        <Link to={`/admin/departments/${department._id}/edit`} className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <FiEdit2 className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => {
                            setDepartmentToDelete({ id: department._id, name: department.departmentName });
                            setDeleteModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */
        data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * data.limit + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(page * data.limit, data.total)}</span> of{' '}
                  <span className="font-medium">{data.total}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    {page} / {data.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteDepartmentModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        departmentName={departmentToDelete?.name || ''}
      />
    </div>
  );
};

export default DepartmentListPage;
