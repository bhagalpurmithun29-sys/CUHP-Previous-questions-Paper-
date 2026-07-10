import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIInsightsDashboardPage } from '../pages/AIInsightsDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AIInsightsDashboardPage', () => {
  it('renders insights dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AIInsightsDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Explainable AI Insights')).toBeInTheDocument();
  });
});
