import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopicMappingDashboard } from '../pages/TopicMappingDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('TopicMappingDashboard', () => {
  it('renders topic mapping dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TopicMappingDashboard />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Topic & Syllabus Mapping Engine')).toBeInTheDocument();
  });
});
