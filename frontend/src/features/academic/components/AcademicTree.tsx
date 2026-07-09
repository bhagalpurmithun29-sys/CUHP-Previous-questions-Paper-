import React from 'react';
import { useAcademic } from '../hooks/useAcademic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ChevronRight, Building, Library, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'school': return <Building className="w-4 h-4 text-blue-500" />;
      case 'department': return <Library className="w-4 h-4 text-purple-500" />;
      case 'course': return <GraduationCap className="w-4 h-4 text-green-500" />;
      case 'semester': return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'subject': return <BookOpen className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getName = (node: any) => {
    return node.schoolName || node.departmentName || node.courseName || `Semester ${node.semesterNumber}` || node.subjectName;
  };

  const getCode = (node: any) => {
    return node.schoolCode || node.departmentCode || node.courseCode || node.subjectCode;
  };

  if (!node.children || node.children.length === 0) {
    return (
      <div className="flex items-center gap-2 py-1" style={{ paddingLeft: `${level * 1.5}rem` }}>
        {getIcon(node.type)}
        <span className="text-sm font-medium">{getName(node)}</span>
        {getCode(node) && <span className="text-xs text-muted-foreground bg-muted px-1.5 rounded">{getCode(node)}</span>}
      </div>
    );
  }

  return (
    <Collapsible defaultOpen={level < 2}>
      <CollapsibleTrigger className="flex items-center gap-2 py-1 hover:bg-muted/30 w-full rounded" style={{ paddingLeft: `${level * 1.5}rem` }}>
        <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]]:rotate-90" />
        {getIcon(node.type)}
        <span className="text-sm font-medium">{getName(node)}</span>
        {getCode(node) && <span className="text-xs text-muted-foreground bg-muted px-1.5 rounded">{getCode(node)}</span>}
        <span className="text-xs text-muted-foreground ml-auto pr-2">{node.children.length} items</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {node.children.map((child: any) => (
          <TreeNode key={child._id} node={child} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export const AcademicTree: React.FC = () => {
  const { useTree } = useAcademic();
  const { data: tree, isLoading } = useTree();

  if (isLoading) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <Card className="h-full max-h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle>Academic Hierarchy</CardTitle>
        <CardDescription>Complete structural view of the university.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {tree?.map((school: any) => (
            <TreeNode key={school._id} node={school} />
          ))}
          {tree?.length === 0 && <p className="text-muted-foreground text-center">No academic data found.</p>}
        </div>
      </CardContent>
    </Card>
  );
};
