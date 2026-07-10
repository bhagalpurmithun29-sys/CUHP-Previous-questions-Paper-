import React from 'react';
import { render, screen } from '@testing-library/react';
import { PatternAnalysisDashboardPage } from '../pages/PatternAnalysisDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('PatternAnalysisDashboardPage', () => {
  it('renders pattern dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PatternAnalysisDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Pattern & Blueprint Engine')).toBeInTheDocument();
  });
});
