import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIMetadataDashboardPage } from '../pages/AIMetadataDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AIMetadataDashboardPage', () => {
  it('renders AI Metadata dashboard successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AIMetadataDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Metadata & Intelligence Engine')).toBeInTheDocument();
  });
});
