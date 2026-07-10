import React from 'react';
import { render, screen } from '@testing-library/react';
import { FacultyAnalyticsDashboardPage } from '../pages/FacultyAnalyticsDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('FacultyAnalyticsDashboardPage', () => {
  it('renders faculty analytics dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FacultyAnalyticsDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Faculty Analytics')).toBeInTheDocument();
  });
});
