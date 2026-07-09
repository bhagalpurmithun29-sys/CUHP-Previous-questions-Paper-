import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HierarchyTree } from './HierarchyTree';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AcademicSidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-[300px] border-r bg-card/50">
      <div className="p-4 border-b space-y-4">
        <h2 className="font-semibold tracking-tight">Academic Explorer</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Quick search..." className="pl-8 bg-background" />
        </div>
      </div>
      
      <Tabs defaultValue="hierarchy" className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="hierarchy" className="flex-1 mt-0 data-[state=active]:flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-2">
            <HierarchyTree />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="favorites" className="flex-1 mt-0 data-[state=active]:flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-4">
            <p className="text-sm text-muted-foreground text-center mt-8">No favorites pinned yet.</p>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
