import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyLibraryPage } from '../pages/MyLibraryPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('MyLibraryPage', () => {
  it('renders library dashboard correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MyLibraryPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('My Personal Library')).toBeInTheDocument();
  });
});
