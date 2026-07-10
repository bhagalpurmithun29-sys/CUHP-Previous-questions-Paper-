import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnalysisDashboardPage } from '../pages/AnalysisDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AnalysisDashboardPage', () => {
  it('renders analysis dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnalysisDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Analysis Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Document Inspector')).toBeInTheDocument();
  });
});
