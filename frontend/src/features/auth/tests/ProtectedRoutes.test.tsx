import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../../../routes/ProtectedRoute';
import { GuestRoute } from '../../../../routes/GuestRoute';
import { RoleRoute } from '../../../../routes/RoleRoute';
import { PermissionRoute } from '../../../../routes/PermissionRoute';
import { useSession } from '../hooks/useSession';
import { useRole } from '../hooks/useRole';
import { usePermission } from '../hooks/usePermission';
import { vi } from 'vitest';

vi.mock('../hooks/useSession', () => ({
  useSession: vi.fn(),
}));

vi.mock('../hooks/useRole', () => ({
  useRole: vi.fn(),
}));

vi.mock('../hooks/usePermission', () => ({
  usePermission: vi.fn(),
}));

describe('Authorization Routing System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ProtectedRoute', () => {
    it('shows loader when loading', () => {
      vi.mocked(useSession).mockReturnValue({ loading: true, authenticated: false } as any);
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText(/Loading Application/i)).toBeInTheDocument();
    });

    it('redirects to login if not authenticated', () => {
      vi.mocked(useSession).mockReturnValue({ loading: false, authenticated: false } as any);
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('renders outlet if authenticated', () => {
      vi.mocked(useSession).mockReturnValue({ loading: false, authenticated: true } as any);
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('GuestRoute', () => {
    it('redirects to dashboard if authenticated', () => {
      vi.mocked(useSession).mockReturnValue({ loading: false, authenticated: true } as any);
      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<div>Login Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders outlet if not authenticated', () => {
      vi.mocked(useSession).mockReturnValue({ loading: false, authenticated: false } as any);
      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<div>Login Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  describe('RoleRoute', () => {
    it('redirects to forbidden if role is not allowed', () => {
      vi.mocked(useRole).mockReturnValue({ 
        loading: false, 
        authenticated: true,
        hasAnyRole: () => false 
      } as any);
      
      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/forbidden" element={<div>Forbidden</div>} />
            <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<div>Admin Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Forbidden')).toBeInTheDocument();
    });

    it('renders outlet if role is allowed', () => {
      vi.mocked(useRole).mockReturnValue({ 
        loading: false, 
        authenticated: true,
        hasAnyRole: () => true 
      } as any);
      
      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<div>Admin Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Admin Content')).toBeInTheDocument();
    });
  });

  describe('PermissionRoute', () => {
    it('redirects to forbidden if lacking permission', () => {
      vi.mocked(usePermission).mockReturnValue({ 
        loading: false, 
        authenticated: true,
        hasPermission: () => false,
        hasAnyPermission: () => false,
        hasAllPermissions: () => false,
      } as any);
      
      render(
        <MemoryRouter initialEntries={['/manage']}>
          <Routes>
            <Route path="/forbidden" element={<div>Forbidden</div>} />
            <Route element={<PermissionRoute permissions="write:data" />}>
              <Route path="/manage" element={<div>Manage Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Forbidden')).toBeInTheDocument();
    });

    it('renders outlet if has permission', () => {
      vi.mocked(usePermission).mockReturnValue({ 
        loading: false, 
        authenticated: true,
        hasPermission: () => true,
        hasAnyPermission: () => true,
        hasAllPermissions: () => true,
      } as any);
      
      render(
        <MemoryRouter initialEntries={['/manage']}>
          <Routes>
            <Route element={<PermissionRoute permissions="write:data" />}>
              <Route path="/manage" element={<div>Manage Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Manage Content')).toBeInTheDocument();
    });
  });
});
