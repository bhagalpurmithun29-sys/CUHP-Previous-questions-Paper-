import React, { useState } from 'react';
import { FilterSidebar } from './FilterSidebar';
import { ExplorerToolbar } from './ExplorerToolbar';
import { PaperGrid } from './PaperGrid';
import { PaperSkeleton } from './PaperSkeleton';
import { Pagination } from './Pagination';
import { EmptyState } from './EmptyState';
import { useExplorer, ExplorerFilters } from '../../hooks/useExplorer';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export const ExplorerLayout: React.FC = () => {
  const [filters, setFilters] = useState<ExplorerFilters>({
    page: 1,
    limit: 12,
    sort: 'newest'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data, isLoading, isError } = useExplorer(filters);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex flex-col">
      <ExplorerToolbar 
        filters={filters} 
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={data?.total || 0}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-40">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl p-4 overflow-y-auto lg:hidden"
              >
                <div className="flex justify-end mb-4">
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <FiX />
                  </button>
                </div>
                <FilterSidebar filters={filters} setFilters={setFilters} className="border-0 p-0" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {isError ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
              Failed to load question papers. Please try again later.
            </div>
          ) : isLoading ? (
            <PaperSkeleton viewMode={viewMode} />
          ) : data?.papers?.length > 0 ? (
            <>
              <PaperGrid papers={data.papers} viewMode={viewMode} />
              <Pagination 
                currentPage={filters.page} 
                totalPages={data.totalPages} 
                onPageChange={(page) => setFilters(prev => ({ ...prev, page }))} 
              />
            </>
          ) : (
            <EmptyState 
              onReset={() => setFilters({ page: 1, limit: 12, sort: 'newest' })} 
            />
          )}
        </div>
      </div>
    </div>
  );
};
