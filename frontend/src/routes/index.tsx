import { createBrowserRouter } from 'react-router-dom';
import { ROUTES, UserRole } from '../constants';
import { AuthGuard, GuestGuard, RoleGuard } from './guards';
import PublicLayout from '../layouts/PublicLayout';
import MinimalLayout from '../layouts/MinimalLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import AdminLayout from '../layouts/AdminLayout';


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
        element: <AdminLayout />,
        children: [
          // Common authenticated routes
          { path: '/dashboard', element: <Placeholder title="Dashboard" /> },
          { path: '/schools', element: <Placeholder title="Schools Browse" /> },
          { path: '/departments', element: <Placeholder title="Departments Browse" /> },
          { path: '/courses', element: <Placeholder title="Courses Browse" /> },
          { path: '/semesters', element: <Placeholder title="Semesters Browse" /> },
          { path: '/subjects', element: <Placeholder title="Subjects Browse" /> },
          
          {
            path: '/moderator',
            element: <RoleGuard allowedRoles={[UserRole.MODERATOR, UserRole.ADMIN]} />,
            children: [
              { path: 'review', element: <Placeholder title="Review Uploads" /> },
              { path: 'reports', element: <Placeholder title="Reports" /> },
            ],
          },
          {
            path: '/admin',
            element: <RoleGuard allowedRoles={[UserRole.ADMIN]} />,
            children: [
              { path: 'dashboard', element: <Placeholder title="Admin Dashboard" /> },
              { path: 'schools', element: <Placeholder title="Manage Schools" /> },
              { path: 'departments', element: <Placeholder title="Manage Departments" /> },
              { path: 'courses', element: <Placeholder title="Manage Courses" /> },
              { path: 'semesters', element: <Placeholder title="Manage Semesters" /> },
              { path: 'subjects', element: <Placeholder title="Manage Subjects" /> },
              { path: 'users', element: <Placeholder title="Manage Users" /> },
              { path: 'settings', element: <Placeholder title="System Settings" /> },
            ],
          },
        ]
      }
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
