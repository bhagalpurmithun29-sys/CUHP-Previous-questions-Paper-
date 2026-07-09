import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
              {item.href ? (
                <Link to={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
