import React from 'react';
import { render, screen } from '@testing-library/react';
import { BulkAnalysisDashboardPage } from '../pages/BulkAnalysisDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('BulkAnalysisDashboardPage', () => {
  it('renders bulk analysis dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BulkAnalysisDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Bulk AI Analysis Engine')).toBeInTheDocument();
  });
});
