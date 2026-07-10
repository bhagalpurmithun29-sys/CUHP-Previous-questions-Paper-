import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReprocessingDashboardPage } from '../pages/ReprocessingDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('ReprocessingDashboardPage', () => {
  it('renders reprocessing dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReprocessingDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Reprocessing Pipeline')).toBeInTheDocument();
  });
});
