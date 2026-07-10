import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIOperationsDashboardPage } from '../pages/AIOperationsDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AIOperationsDashboardPage', () => {
  it('renders operations dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AIOperationsDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Operations Center')).toBeInTheDocument();
  });
});
