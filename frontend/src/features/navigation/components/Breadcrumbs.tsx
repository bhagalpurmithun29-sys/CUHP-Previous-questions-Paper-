import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <Fragment key={index}>
              {index > 0 && (
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </li>
              )}
              <li aria-current={isLast ? 'page' : undefined}>
                <div className="flex items-center">
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className={`inline-flex items-center text-sm font-medium ${
                        index === 0 
                          ? 'text-gray-700 hover:text-indigo-600' 
                          : 'text-gray-500 hover:text-indigo-600 transition-colors'
                      }`}
                    >
                      {index === 0 && <HomeIcon className="w-4 h-4 mr-1.5" />}
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 ml-1 md:ml-2">
                      {crumb.label}
                    </span>
                  )}
                </div>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
