import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePolicy } from '../hooks/useLegal';
import { FiChevronRight, FiClock } from 'react-icons/fi';

export const PolicyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = usePolicy(slug as string);

  if (isLoading) return <div className="min-h-screen py-20 text-center">Loading policy...</div>;
  if (isError || !data) return <div className="min-h-screen py-20 text-center text-red-500">Policy not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/legal" className="hover:text-primary transition-colors">Legal Center</Link>
          <FiChevronRight className="mx-2 w-4 h-4" />
          <span className="text-gray-900 dark:text-gray-200">{data.title}</span>
        </nav>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-sm">
          <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{data.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><FiClock /> Last Updated: {new Date(data.publishedAt || data.updatedAt).toLocaleDateString()}</span>
              <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Version: {data.version}</span>
            </div>
          </header>

          <article 
            className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </div>
  );
};
