import { createBrowserRouter } from 'react-router-dom';
import { ROUTES, UserRole } from '../constants';
import { AuthGuard, GuestGuard, RoleGuard } from './guards';
import PublicLayout from '../layouts/PublicLayout';
import MinimalLayout from '../layouts/MinimalLayout';
import ErrorLayout from '../layouts/ErrorLayout';

// Placeholder Pages
const Placeholder = ({ title }: { title: string }) => <div className="p-8"><h1>{title}</h1></div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <Placeholder title="Landing Page" /> },
      // Public browse routes
    ],
  },
  {
    element: <GuestGuard />,
    children: [
      {
        element: <MinimalLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <Placeholder title="Login Page" /> },
          { path: ROUTES.REGISTER, element: <Placeholder title="Register Page" /> },
        ],
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/student',
        element: <RoleGuard allowedRoles={[UserRole.STUDENT]} />,
        children: [
          { path: 'dashboard', element: <Placeholder title="Student Dashboard" /> },
        ],
      },
      {
        path: '/moderator',
        element: <RoleGuard allowedRoles={[UserRole.MODERATOR]} />,
        children: [
          { path: 'dashboard', element: <Placeholder title="Moderator Dashboard" /> },
        ],
      },
      {
        path: '/admin',
        element: <RoleGuard allowedRoles={[UserRole.ADMIN]} />,
        children: [
          { path: 'dashboard', element: <Placeholder title="Admin Dashboard" /> },
        ],
      },
    ],
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <ErrorLayout title="403 Unauthorized" message="You do not have permission to access this page." />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <ErrorLayout title="404 Not Found" message="The page you are looking for does not exist." />,
  },
]);
