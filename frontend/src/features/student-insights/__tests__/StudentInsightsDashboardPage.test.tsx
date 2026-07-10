import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudentInsightsDashboardPage } from '../pages/StudentInsightsDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('StudentInsightsDashboardPage', () => {
  it('renders student insights dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <StudentInsightsDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('My Study Insights')).toBeInTheDocument();
  });
});
