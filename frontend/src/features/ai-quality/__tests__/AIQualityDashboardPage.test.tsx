import { render, screen } from '@testing-library/react';
import { AIQualityDashboardPage } from '../pages/AIQualityDashboardPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AIQualityDashboardPage', () => {
  it('renders ai quality dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AIQualityDashboardPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('AI Quality & Review')).toBeInTheDocument();
  });
});
// IDE refresh trigger
