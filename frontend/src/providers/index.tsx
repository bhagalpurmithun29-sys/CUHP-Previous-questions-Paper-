import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ThemeProvider placeholder would go here */}
      {/* AuthProvider placeholder would go here */}
      
      {children}
      
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-card dark:text-foreground dark:border dark:border-border shadow-glass',
          duration: 4000,
        }} 
      />
    </QueryClientProvider>
  );
};
