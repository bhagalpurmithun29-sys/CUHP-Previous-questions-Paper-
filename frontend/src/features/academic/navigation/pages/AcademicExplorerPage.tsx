import React from 'react';
import { AcademicSidebar } from '../components/AcademicSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Map, ArrowRight } from 'lucide-react';

export default function AcademicExplorerPage() {
  const location = useLocation();
  const isRoot = location.pathname === '/admin/academic/explorer' || location.pathname === '/admin/academic/explorer/';

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <AcademicSidebar />
      <div className="flex-1 overflow-auto bg-muted/10 p-6">
        {isRoot ? (
          <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Map className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Explorer</h1>
            <p className="text-muted-foreground text-lg">
              Navigate the entire academic hierarchy from a single unified interface. Select a node from the sidebar to view its details.
            </p>
            <div className="grid gap-4 w-full mt-8">
              <Card className="bg-background">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">Browse Schools</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">Global Subject Search</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Outlet /> // Render matched child routes if we nest them here in the future
        )}
      </div>
    </div>
  );
}
