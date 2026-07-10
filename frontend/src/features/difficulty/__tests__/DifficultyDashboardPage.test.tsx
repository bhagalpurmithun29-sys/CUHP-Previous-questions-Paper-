import React from 'react';
import { render, screen } from '@testing-library/react';
import { DifficultyDashboardPage } from '../pages/DifficultyDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('DifficultyDashboardPage', () => {
  it('renders difficulty dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DifficultyDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Difficulty & Complexity Engine')).toBeInTheDocument();
  });
});
