import { render, screen } from '@testing-library/react';
import { AIGatewayDashboard } from '../pages/AIGatewayDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AIGatewayDashboard', () => {
  it('renders ai gateway dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AIGatewayDashboard />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Gateway & Orchestration')).toBeInTheDocument();
  });
});
