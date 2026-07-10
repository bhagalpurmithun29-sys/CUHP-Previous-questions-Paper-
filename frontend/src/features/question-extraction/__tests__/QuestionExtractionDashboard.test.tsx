import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuestionExtractionDashboard } from '../pages/QuestionExtractionDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('QuestionExtractionDashboard', () => {
  it('renders extraction dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <QuestionExtractionDashboard />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Question Extraction Engine')).toBeInTheDocument();
    expect(screen.getByText('Document Inspector')).toBeInTheDocument();
  });
});
