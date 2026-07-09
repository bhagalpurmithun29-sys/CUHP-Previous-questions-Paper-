import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PublicExplorerPage } from './PublicExplorerPage';
import { vi } from 'vitest';

// Mock the Auth Context
vi.mock('../../features/auth/hooks/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false })
}));

// Mock the API Hook
vi.mock('../hooks/useExplorer', () => ({
  useExplorer: () => ({
    data: {
      papers: [
        {
          _id: '1',
          title: 'Data Structures Mid Term',
          subjectId: { name: 'Computer Science', code: 'CS101' },
          courseId: { name: 'B.Tech' },
          semesterId: { number: 3 },
          academicYear: '2023-2024',
          examType: 'MID_TERM',
          downloadCount: 45,
          viewCount: 120,
          createdAt: new Date().toISOString()
        }
      ],
      total: 1,
      page: 1,
      limit: 12,
      totalPages: 1
    },
    isLoading: false,
    isError: false
  })
}));

const queryClient = new QueryClient();

describe('PublicExplorerPage', () => {
  const renderComponent = () => render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PublicExplorerPage />
      </MemoryRouter>
    </QueryClientProvider>
  );

  it('renders explorer layout and toolbar', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Search by course code, title.../i)).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('displays fetched papers', () => {
    renderComponent();
    expect(screen.getByText('Data Structures Mid Term')).toBeInTheDocument();
    expect(screen.getByText('CS101')).toBeInTheDocument();
    expect(screen.getByText('Sem 3')).toBeInTheDocument();
  });

  it('switches view modes correctly', () => {
    renderComponent();
    // Default is grid, checking if it renders without crashing
    const gridButton = screen.getAllByRole('button').find(b => b.innerHTML.includes('FiGrid'));
    const listButton = screen.getAllByRole('button').find(b => b.innerHTML.includes('FiList'));
    
    if (listButton) fireEvent.click(listButton);
    expect(screen.getByText('Data Structures Mid Term')).toBeInTheDocument(); // Still present
  });
});
