import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookmarksPage } from '../pages/BookmarksPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('BookmarksPage', () => {
  it('renders bookmarks dashboard', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BookmarksPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
    
    expect(screen.getByText('My Bookmarks')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('All Bookmarks')).toBeInTheDocument();
  });
});
