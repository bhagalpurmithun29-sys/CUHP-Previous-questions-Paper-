import { useLocation } from 'react-router-dom';
import { BreadcrumbItem } from '../types/navigation.types';

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    // Simple capitalization, in a real app you might want to fetch entity names by ID from context or API
    const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

    return {
      label,
      path: index === pathnames.length - 1 ? undefined : path,
    };
  });

  return [{ label: 'Home', path: '/' }, ...breadcrumbs];
};
