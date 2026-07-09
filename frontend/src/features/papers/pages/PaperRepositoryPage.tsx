import React, { useState } from 'react';
import { usePaperRepository } from '../hooks/usePaperRepository';
import { BreadcrumbNavigation } from '../../components/BreadcrumbNavigation';
import { PaperCard } from '../components/PaperCard';
import { PaperTable } from '../components/PaperTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, Plus, LayoutGrid, List } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce'; // Assumed

export default function PaperRepositoryPage() {
  const [view, setView] = useState<'grid'|'list'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  
  // Use a simple local debounce for the search query to avoid thrashing
  const [debouncedSearch, setDebouncedSearch] = useState('');
  React.useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = usePaperRepository({
    search: debouncedSearch,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    page,
    limit: view === 'grid' ? 12 : 20
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <BreadcrumbNavigation items={[{ label: 'Administration', href: '/admin' }, { label: 'Paper Repository' }]} />
          <h1 className="text-3xl font-bold tracking-tight mt-2">Question Paper Library</h1>
          <p className="text-muted-foreground">Manage, review, and organize the central repository of examination papers.</p>
        </div>
        <Button className="gap-2 shadow-sm"><Plus className="w-4 h-4" /> Upload New Paper</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, subject, or code..." 
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PENDING_REVIEW">Under Review</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={view} onValueChange={(v) => setView(v as 'grid'|'list')} className="w-auto">
            <TabsList className="grid grid-cols-2 w-[100px]">
              <TabsTrigger value="grid" title="Grid View"><LayoutGrid className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="list" title="List View"><List className="w-4 h-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
          <p className="text-lg font-medium text-muted-foreground">No papers found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.data.map((paper: any) => (
                <PaperCard key={paper._id} paper={paper} />
              ))}
            </div>
          ) : (
            <PaperTable papers={data.data} />
          )}

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
  );
}
