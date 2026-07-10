import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarksAnalysisDashboardPage } from '../pages/MarksAnalysisDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
        PieChart: () => <div>PieChart</div>,
    };
});

describe('MarksAnalysisDashboardPage', () => {
  it('renders marks dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MarksAnalysisDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Marks & Weightage Engine')).toBeInTheDocument();
  });
});
