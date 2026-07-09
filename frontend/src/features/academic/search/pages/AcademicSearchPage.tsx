import React, { useState } from 'react';
import { useAcademicSearch } from '../hooks/useAcademicSearch';
import { SearchBar } from '../components/SearchBar';
import { SearchFilters } from '../components/SearchFilters';
import { ResultCard } from '../components/ResultCard';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { Loader2, SearchX, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AcademicSearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useAcademicSearch({
    q: activeQuery,
    type: typeFilter,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    page,
    limit: 12
  });

  const handleSearch = () => {
    setActiveQuery(searchInput);
    setPage(1);
  };

  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Academic Master Data', href: '/admin/academic' }, { label: 'Global Search' }]} />
      
      <div className="flex flex-col items-center justify-center py-8 space-y-6 bg-card rounded-2xl border shadow-sm px-4">
        <div className="text-center space-y-2 max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight">Academic Discovery</h1>
          <p className="text-muted-foreground">Search across schools, departments, courses, and subjects instantly.</p>
        </div>
        
        <SearchBar 
          value={searchInput} 
          onChange={setSearchInput} 
          onSearch={handleSearch} 
        />

        <div className="w-full max-w-2xl">
          <SearchFilters 
            type={typeFilter} setType={(v) => handleFilterChange(setTypeFilter, v)}
            status={statusFilter} setStatus={(v) => handleFilterChange(setStatusFilter, v)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {!activeQuery && (!data?.results || data.results.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
            <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">Enter a query to start searching</p>
            <p className="text-sm">You can search by name, code, or hierarchy level.</p>
          </div>
        ) : isLoading || (isFetching && !data) ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : data?.results?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
            <SearchX className="w-12 h-12 mb-4 opacity-40" />
            <p className="text-lg font-medium text-foreground">No results found for "{activeQuery}"</p>
            <p className="text-sm">Try adjusting your filters or checking for typos.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Search Results <span className="text-muted-foreground text-base font-normal">({data?.pagination.total} matches)</span>
              </h2>
              {isFetching && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data?.results.map((result: any) => (
                <ResultCard key={`${result.type}-${result.id}`} result={result} />
              ))}
            </div>

            {data?.pagination && data.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 bg-card p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  Showing page {data.pagination.page} of {data.pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                  <Button variant="outline" size="sm" disabled={page === data.pagination.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
