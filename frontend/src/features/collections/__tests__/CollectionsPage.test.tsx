import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CollectionsPage } from '../pages/CollectionsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('CollectionsPage', () => {
  it('renders collections page correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CollectionsPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Collections & Folders')).toBeInTheDocument();
  });
});
