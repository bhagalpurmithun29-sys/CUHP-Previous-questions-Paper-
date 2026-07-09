import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StudentDashboard } from '../pages/StudentDashboard';
import { useDashboard } from '../hooks/useDashboard';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';
import { vi } from 'vitest';

vi.mock('../hooks/useDashboard', () => ({
  useDashboard: vi.fn(),
}));

vi.mock('../hooks/useProfile', () => ({
  useProfile: vi.fn(),
}));

vi.mock('../../auth/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('Student Dashboard Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john@cuhp.ac.in',
    role: 'STUDENT'
  };

  const mockProfile = {
    id: '1',
    department: 'Computer Science',
    course: 'MCA',
    semester: 3,
    school: 'School of Mathematics',
    subjects: ['Operating Systems', 'Networking'],
    currentAcademicYear: '2025-2026',
    completion: { percentage: 80, missingFields: ['bio'] }
  };

  const mockDashboardData = {
    statistics: {
      downloadedPapers: 12,
      bookmarkedPapers: 5,
      uploadedPapers: 1,
      collections: 2,
      reportsSubmitted: 0
    },
    recentDownloads: [{ id: '1', title: 'OS Midterm 2024', code: 'CS301', year: 2024, date: '2025-01-01' }],
    recentUploads: [{ id: '2', title: 'Networks Final 2023', code: 'CS302', year: 2023, date: '2025-01-02', status: 'APPROVED' }],
    recentBookmarks: [],
    recentNotifications: [{ id: '1', title: 'Welcome', message: 'Welcome to CUHP QB!', read: false, date: '2025-01-01', type: 'INFO' }],
    recentActivity: [{ id: '1', action: 'DOWNLOAD', description: 'Downloaded OS Midterm', date: '2025-01-01' }]
  };

  it('renders dashboard loading skeletons initially', () => {
    vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);
    vi.mocked(useDashboard).mockReturnValue({ data: undefined, loading: true } as any);
    vi.mocked(useProfile).mockReturnValue({ profile: undefined, loading: true } as any);

    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );

    // Profile card skeleton should render, meaning it's trying to load
    // But Quick Actions are static, so we can verify them
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Browse Papers')).toBeInTheDocument();
  });

  it('renders dashboard widgets with correct data', () => {
    vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);
    vi.mocked(useDashboard).mockReturnValue({ data: mockDashboardData, loading: false } as any);
    vi.mocked(useProfile).mockReturnValue({ profile: mockProfile, loading: false } as any);

    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );

    // Profile Card
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('STUDENT')).toBeInTheDocument();
    
    // Academic Card
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('MCA - Sem 3')).toBeInTheDocument();
    
    // Statistics
    expect(screen.getByText('12')).toBeInTheDocument(); // Downloaded
    expect(screen.getByText('5')).toBeInTheDocument();  // Bookmarked

    // Widgets
    expect(screen.getByText('OS Midterm 2024')).toBeInTheDocument();
    expect(screen.getByText('Welcome to CUHP QB!')).toBeInTheDocument();
    expect(screen.getByText('Downloaded OS Midterm')).toBeInTheDocument();
  });
});
