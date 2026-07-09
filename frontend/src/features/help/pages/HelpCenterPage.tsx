import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHelpCategories, useHelpArticles, useFaqs } from '../hooks/useHelp';
import { SearchBar } from '../components/SearchBar';
import { FAQAccordion } from '../components/FAQAccordion';
import { FiBookOpen, FiLifeBuoy, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const HelpCenterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: categories, isLoading: catLoading } = useHelpCategories();
  const { data: articles, isLoading: artLoading } = useHelpArticles(query);
  const { data: faqs, isLoading: faqLoading } = useFaqs();

  const isSearching = query.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      
      {/* Hero Search Section */}
      <div className="bg-primary pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center rounded-b-[3rem] shadow-sm">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">How can we help you today?</h1>
        <SearchBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
        
        {isSearching ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Search Results for "{query}"</h2>
            {artLoading ? (
              <div className="animate-pulse space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl" />)}
              </div>
            ) : articles?.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article: any) => (
                  <Link key={article.slug} to={`/help/article/${article.slug}`} className="block bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 p-6 rounded-xl transition-colors border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs font-medium text-gray-500">
                      <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{article.category}</span>
                      <span className="flex items-center gap-1"><FiClock /> {article.readTimeMinutes} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No articles found matching your query.</div>
            )}
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {catLoading ? (
                // Skeletons
                [1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-2xl animate-pulse" />)
              ) : categories?.map((cat: any) => (
                <Link key={cat.name} to={`/help?category=${encodeURIComponent(cat.name)}`} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                    <FiBookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cat.count} articles</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Popular FAQs */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
              {faqLoading ? (
                <div className="text-center">Loading FAQs...</div>
              ) : (
                <FAQAccordion faqs={faqs} />
              )}
            </div>

            {/* Contact Support */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                <FiLifeBuoy className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still need help?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                If you couldn't find the answer to your question in our knowledge base, our support team is here to help you.
              </p>
              <Link to="/contact" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                Contact Support
              </Link>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};
