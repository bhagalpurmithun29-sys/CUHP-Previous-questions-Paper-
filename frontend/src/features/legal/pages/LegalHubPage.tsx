import React from 'react';
import { usePolicies } from '../hooks/useLegal';
import { Link } from 'react-router-dom';
import { FiShield, FiFileText, FiLock, FiAlertCircle } from 'react-icons/fi';

export const LegalHubPage: React.FC = () => {
  const { data: policies, isLoading } = usePolicies();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Privacy Policy': return FiLock;
      case 'Terms of Service': return FiFileText;
      case 'Copyright Policy': return FiShield;
      default: return FiAlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <FiShield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Legal & Compliance Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our policies, terms, and your privacy rights on the CUHP Question Bank platform.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-white dark:bg-gray-800 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies?.map((policy: any) => {
              const Icon = getIconForType(policy.type);
              return (
                <Link 
                  key={policy._id} 
                  to={`/legal/${policy.slug}`}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-primary group-hover:border-primary/20 mb-6 transition-colors relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{policy.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 relative z-10">{policy.summary}</p>
                  
                  <div className="flex items-center justify-between text-xs font-medium text-gray-400 relative z-10">
                    <span>Version {policy.version}</span>
                    <span className="text-primary group-hover:underline">Read Policy &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
