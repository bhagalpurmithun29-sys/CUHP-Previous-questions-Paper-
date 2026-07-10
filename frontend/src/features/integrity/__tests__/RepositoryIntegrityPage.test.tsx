import React from 'react';
import { render, screen } from '@testing-library/react';
import { RepositoryIntegrityPage } from '../pages/RepositoryIntegrityPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('RepositoryIntegrityPage', () => {
  it('renders Integrity dashboard successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RepositoryIntegrityPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Repository Integrity Engine')).toBeInTheDocument();
  });
});
