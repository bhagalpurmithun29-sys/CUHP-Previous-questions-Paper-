import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiChevronDown, FiFolder, FiFile, FiLayers, FiGrid, FiBook } from 'react-icons/fi';
import { useAcademicHierarchy } from '../hooks/useAdmin';

const TreeNode = ({ node, level = 0, type }: { node: any, level?: number, type: string }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const hasChildren = node.departments || node.courses;
  const children = node.departments || node.courses || [];
  
  const getIcon = () => {
    switch (type) {
      case 'school': return <FiLayers className="text-blue-500" />;
      case 'department': return <FiGrid className="text-purple-500" />;
      case 'course': return <FiBook className="text-green-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  const getChildType = () => {
    if (type === 'school') return 'department';
    if (type === 'department') return 'course';
    return 'unknown';
  };

  const name = node.schoolName || node.departmentName || node.courseName;
  const code = node.schoolCode || node.departmentCode || node.courseCode;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer ${level > 0 ? 'ml-6' : ''}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <span className="w-5 flex items-center justify-center text-gray-400">
          {hasChildren ? (isOpen ? <FiChevronDown /> : <FiChevronRight />) : <span className="w-4" />}
        </span>
        {getIcon()}
        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
          {name}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
          {code}
        </span>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${node.status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
          {node.status}
        </span>
      </div>
      
      {isOpen && hasChildren && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-l border-gray-200 dark:border-gray-700 ml-5"
        >
          {children.map((child: any) => (
            <TreeNode key={child._id} node={child} level={level + 1} type={getChildType()} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const AcademicTreeViewer: React.FC = () => {
  const { data: hierarchy, isLoading } = useAcademicHierarchy();

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading academic tree...</div>;
  }

  if (!hierarchy || hierarchy.length === 0) {
    return <div className="p-8 text-center text-gray-500">No academic data found.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiFolder className="text-indigo-500" /> Academic Hierarchy
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
          {hierarchy.length} Schools
        </span>
      </div>
      <div className="overflow-auto max-h-[500px] pr-4 custom-scrollbar">
        {hierarchy.map(school => (
          <TreeNode key={school._id} node={school} type="school" />
        ))}
      </div>
    </div>
  );
};
