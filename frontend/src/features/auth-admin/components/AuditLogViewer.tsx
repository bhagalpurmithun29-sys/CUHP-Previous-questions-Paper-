import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAuthAdmin } from '../hooks/useAuthAdmin';
import { Loader2, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

export const AuditLogViewer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('ALL');

  const { useAuditLogs } = useAuthAdmin();
  const { data, isLoading } = useAuditLogs({ 
    page, 
    limit: 10, 
    search: search || undefined, 
    action: actionFilter !== 'ALL' ? actionFilter : undefined 
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security Audit Logs</CardTitle>
        <CardDescription>Immutable record of all authentication and security events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by IP or Email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filter by Action" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Actions</SelectItem>
                <SelectItem value="LOGIN_SUCCESS">Login Success</SelectItem>
                <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
                <SelectItem value="PASSWORD_RESET">Password Reset</SelectItem>
                <SelectItem value="MFA_SUCCESS">MFA Success</SelectItem>
                <SelectItem value="ACCOUNT_LOCKED">Account Locked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">User / Email</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.logs?.map((log: any) => (
                  <tr key={log._id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {format(new Date(log.createdAt), 'MMM dd, yyyy HH:mm:ss')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-semibold">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {log.userId ? `${log.userId.firstName} ${log.userId.lastName}` : (log.emailAttempted || 'Unknown')}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{log.ipAddress}</td>
                    <td className="px-4 py-3">
                      {log.action.includes('FAILED') || log.action.includes('LOCKED') ? (
                        <span className="text-red-500 font-semibold">Failure</span>
                      ) : (
                        <span className="text-green-500 font-semibold">Success</span>
                      )}
                    </td>
                  </tr>
                ))}
                {data?.logs?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No audit logs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total records)
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === data.pagination.totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
