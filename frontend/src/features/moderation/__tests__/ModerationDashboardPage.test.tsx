import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModerationDashboardPage } from '../pages/ModerationDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('ModerationDashboardPage', () => {
  it('renders dashboard successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ModerationDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Moderation Queue')).toBeInTheDocument();
  });
});
