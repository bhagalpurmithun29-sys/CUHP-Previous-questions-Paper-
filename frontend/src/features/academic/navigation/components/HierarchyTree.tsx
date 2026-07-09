import React from 'react';
import { useHierarchyTree } from '../hooks/useAcademicNavigation';
import { TreeNode } from './TreeNode';
import { Loader2 } from 'lucide-react';

export const HierarchyTree: React.FC = () => {
  const { data: schools, isLoading, error } = useHierarchyTree();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !schools) {
    return <div className="p-4 text-sm text-red-500">Failed to load hierarchy tree.</div>;
  }

  if (schools.length === 0) {
    return <div className="p-4 text-sm text-muted-foreground">No academic data found.</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {schools.map((school: any) => (
        <TreeNode key={school.id} node={school} level={0} />
      ))}
    </div>
  );
};
