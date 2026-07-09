import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHelpArticle } from '../hooks/useHelp';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { FiClock, FiChevronRight, FiHome, FiEye } from 'react-icons/fi';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useHelpArticle(slug as string);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex justify-center py-20">Loading article...</div>;
  }

  if (isError || !data?.article) {
    return <div className="min-h-screen bg-gray-50 flex justify-center py-20 text-red-500">Article not found.</div>;
  }

  const { article, related } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/help" className="hover:text-primary transition-colors flex items-center gap-1"><FiHome /> Help Center</Link>
          <FiChevronRight className="mx-2 w-4 h-4" />
          <Link to={`/help?category=${encodeURIComponent(article.category)}`} className="hover:text-primary transition-colors">{article.category}</Link>
          <FiChevronRight className="mx-2 w-4 h-4" />
          <span className="text-gray-900 dark:text-gray-200 truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              {article.authorId?.avatarUrl ? (
                <img src={article.authorId.avatarUrl} alt="" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{article.authorId?.firstName?.[0]}</div>
              )}
              {article.authorId?.firstName} {article.authorId?.lastName}
            </span>
            <span className="flex items-center gap-1.5"><FiClock /> {article.readTimeMinutes} min read</span>
            <span className="flex items-center gap-1.5"><FiEye /> {article.viewCount} views</span>
            <span>Last updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-sm mb-12">
          <article 
            className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </div>

        {/* Feedback Widget */}
        <div className="mb-12">
          <FeedbackWidget slug={article.slug} />
        </div>

        {/* Related Articles */}
        {related && related.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel: any) => (
                <Link key={rel.slug} to={`/help/article/${rel.slug}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-primary/50 hover:shadow-sm transition-all group">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary mb-2 line-clamp-2">{rel.title}</h4>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">Read article <FiChevronRight /></span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
