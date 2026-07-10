import React from 'react';
import { render, screen } from '@testing-library/react';
import { VersionHistoryPage } from '../pages/VersionHistoryPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('VersionHistoryPage', () => {
  it('renders version history page successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <VersionHistoryPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Version History & Revisions')).toBeInTheDocument();
  });
});
