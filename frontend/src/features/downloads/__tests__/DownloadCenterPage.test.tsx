import React from 'react';
import { render, screen } from '@testing-library/react';
import { DownloadCenterPage } from '../pages/DownloadCenterPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('DownloadCenterPage', () => {
  it('renders download center dashboard with tabs', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DownloadCenterPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Download Center')).toBeInTheDocument();
    expect(screen.getByText('Offline Library')).toBeInTheDocument();
    expect(screen.getByText('Download History')).toBeInTheDocument();
  });
});
