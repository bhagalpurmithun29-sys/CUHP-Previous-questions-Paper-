import React from 'react';
import { render, screen } from '@testing-library/react';
import { MigrationDashboardPage } from '../pages/MigrationDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('MigrationDashboardPage', () => {
  it('renders toolkit console successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MigrationDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Toolkit & Admin Console')).toBeInTheDocument();
    expect(screen.getByText('Migration Planner')).toBeInTheDocument();
  });
});
