import React from 'react';
import { render, screen } from '@testing-library/react';
import { TrendAnalysisDashboardPage } from '../pages/TrendAnalysisDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('TrendAnalysisDashboardPage', () => {
  it('renders trend dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TrendAnalysisDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Cross-Year Trend Analytics')).toBeInTheDocument();
  });
});
