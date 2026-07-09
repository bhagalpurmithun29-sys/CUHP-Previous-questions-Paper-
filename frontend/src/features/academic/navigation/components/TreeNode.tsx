import React, { useState } from 'react';
import { useHierarchyTree } from '../hooks/useAcademicNavigation';
import { ChevronRight, ChevronDown, Loader2, Building2, Layers, BookOpen, CalendarDays, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const TypeIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'SCHOOL': return <Building2 className={cn("w-4 h-4", className)} />;
    case 'DEPARTMENT': return <Layers className={cn("w-4 h-4", className)} />;
    case 'COURSE': return <GraduationCap className={cn("w-4 h-4", className)} />;
    case 'SEMESTER': return <CalendarDays className={cn("w-4 h-4", className)} />;
    case 'SUBJECT': return <BookOpen className={cn("w-4 h-4", className)} />;
    default: return <div className={cn("w-4 h-4", className)} />;
  }
};

const getBaseRoute = (type: string) => {
  switch (type) {
    case 'SCHOOL': return '/admin/academic/schools';
    case 'DEPARTMENT': return '/admin/academic/departments';
    case 'COURSE': return '/admin/academic/courses';
    case 'SEMESTER': return '/admin/academic/semesters';
    case 'SUBJECT': return '/admin/academic/subjects';
    default: return '/admin/academic';
  }
};

interface TreeNodeProps {
  node: any;
  level: number;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Only fetch children if expanded
  const { data: children, isLoading } = useHierarchyTree(
    isExpanded ? node.id : undefined, 
    isExpanded ? node.type : undefined
  );

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleNavigate = () => {
    navigate(`${getBaseRoute(node.type)}/${node.id}`);
  };

  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 hover:bg-accent rounded-md cursor-pointer transition-colors group",
          level === 0 ? "font-medium" : "text-sm text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleNavigate}
      >
        <div 
          className="w-5 h-5 flex items-center justify-center shrink-0" 
          onClick={toggleExpand}
        >
          {node.hasChildren ? (
            isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            ) : isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            )
          ) : (
            <div className="w-4 h-4" /> // Spacing for leaf nodes
          )}
        </div>
        
        <TypeIcon type={node.type} className="text-primary/70 shrink-0" />
        
        <span className="truncate" title={`${node.code} - ${node.name}`}>
          {node.name}
        </span>
      </div>

      <AnimatePresence>
        {isExpanded && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children.length === 0 ? (
              <div 
                className="text-xs text-muted-foreground italic py-1"
                style={{ paddingLeft: `${(level + 1) * 16 + 8 + 28}px` }}
              >
                Empty
              </div>
            ) : (
              children.map((child: any) => (
                <TreeNode key={child.id} node={child} level={level + 1} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
