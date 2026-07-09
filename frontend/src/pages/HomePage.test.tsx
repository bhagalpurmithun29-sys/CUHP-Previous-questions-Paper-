import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { vi } from 'vitest';

describe('HomePage Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<div>Search Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders all main sections', () => {
    renderComponent();

    // Hero Section
    expect(screen.getByText(/The Central Hub for/i)).toBeInTheDocument();
    
    // Statistics Section
    expect(screen.getByText('5,000+')).toBeInTheDocument();
    expect(screen.getByText('Total Papers')).toBeInTheDocument();

    // Features Section
    expect(screen.getByText('Everything you need to ace your exams')).toBeInTheDocument();
    expect(screen.getByText('Previous Year Papers')).toBeInTheDocument();

    // Latest Papers
    expect(screen.getByText('Recently Added Papers')).toBeInTheDocument();

    // Contributors
    expect(screen.getByText('Top Contributors')).toBeInTheDocument();

    // FAQ
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();

    // CTA
    expect(screen.getByText('Ready to ace your next exam?')).toBeInTheDocument();
  });

  it('search form navigates to search page with query', () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText(/Search by course code/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'CS301' } });
    fireEvent.click(searchButton);

    expect(screen.getByText('Search Page')).toBeInTheDocument();
  });

  it('contains proper SEO elements', () => {
    renderComponent();
    // In React testing library, testing raw document title injected by simple tags can be tricky if Helmet isn't used,
    // but we can query by test-id or text if we want, or just assume the structural test passes based on component mount.
    expect(document.querySelector('meta[name="description"]')).toBeInTheDocument();
  });
});
