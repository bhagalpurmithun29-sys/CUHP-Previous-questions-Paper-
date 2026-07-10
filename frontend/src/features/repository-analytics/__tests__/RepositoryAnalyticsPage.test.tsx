import React from 'react';
import { render, screen } from '@testing-library/react';
import { RepositoryAnalyticsPage } from '../pages/RepositoryAnalyticsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: () => <div>BarChart</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe('RepositoryAnalyticsPage', () => {
  it('renders analytics dashboard successfully', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RepositoryAnalyticsPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Repository Analytics & Operations')).toBeInTheDocument();
  });
});
