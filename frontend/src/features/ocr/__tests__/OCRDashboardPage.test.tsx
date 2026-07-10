import React from 'react';
import { render, screen } from '@testing-library/react';
import { OCRDashboardPage } from '../pages/OCRDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('OCRDashboardPage', () => {
  it('renders OCR dashboard successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OCRDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('OCR Processing Pipeline')).toBeInTheDocument();
  });
});
