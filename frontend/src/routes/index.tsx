import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES, UserRole } from '../constants';
import { AuthGuard, GuestGuard, RoleGuard } from './guards';
import PublicLayout from '../layouts/PublicLayout';
import MinimalLayout from '../layouts/MinimalLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import AdminLayout from '../layouts/AdminLayout';

// Fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy Load Public Routes
const HomePage = React.lazy(() => import('../pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = React.lazy(() => import('../pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PublicExplorerPage = React.lazy(() => import('../pages/PublicExplorerPage').then(module => ({ default: module.PublicExplorerPage })));
const SearchPage = React.lazy(() => import('../features/search/pages/SearchPage').then(module => ({ default: module.SearchPage })));
const LeaderboardPage = React.lazy(() => import('../features/community/pages/LeaderboardPage').then(module => ({ default: module.LeaderboardPage })));
const HallOfFamePage = React.lazy(() => import('../features/community/pages/HallOfFamePage').then(module => ({ default: module.HallOfFamePage })));
const PublicProfilePage = React.lazy(() => import('../features/community/pages/PublicProfilePage').then(module => ({ default: module.PublicProfilePage })));
const PublicStatisticsPage = React.lazy(() => import('../features/statistics/pages/PublicStatisticsPage').then(module => ({ default: module.PublicStatisticsPage })));
const CoverageDashboardPage = React.lazy(() => import('../features/statistics/pages/CoverageDashboardPage').then(module => ({ default: module.CoverageDashboardPage })));
const HelpCenterPage = React.lazy(() => import('../features/help/pages/HelpCenterPage').then(module => ({ default: module.HelpCenterPage })));
const ArticlePage = React.lazy(() => import('../features/help/pages/ArticlePage').then(module => ({ default: module.ArticlePage })));
const SupportCenterPage = React.lazy(() => import('../features/support/pages/SupportCenterPage').then(module => ({ default: module.SupportCenterPage })));
const TicketDetailsPage = React.lazy(() => import('../features/support/pages/TicketDetailsPage').then(module => ({ default: module.TicketDetailsPage })));
const LegalHubPage = React.lazy(() => import('../features/legal/pages/LegalHubPage').then(module => ({ default: module.LegalHubPage })));
const PolicyPage = React.lazy(() => import('../features/legal/pages/PolicyPage').then(module => ({ default: module.PolicyPage })));

// Lazy Load Dashboard/Admin Routes
const AdminDashboard = React.lazy(() => import('../features/dashboard/pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AcademicDataManagement = React.lazy(() => import('../features/dashboard/pages/AcademicDataManagement').then(module => ({ default: module.AcademicDataManagement })));
const AiAdminDashboard = React.lazy(() => import('../features/dashboard/pages/AiAdminDashboard').then(module => ({ default: module.AiAdminDashboard })));
const AIAssistantPage = React.lazy(() => import('../features/ai/pages/AIAssistantPage').then(module => ({ default: module.AIAssistantPage })));
const SemanticSearchPage = React.lazy(() => import('../features/semantic-search/pages/SemanticSearchPage').then(module => ({ default: module.SemanticSearchPage })));
const PaperAnalysisPage = React.lazy(() => import('../features/analysis/pages/PaperAnalysisPage').then(module => ({ default: module.default })));
const StudyPlannerPage = React.lazy(() => import('../features/study-planner/pages/StudyPlannerPage').then(module => ({ default: module.default })));

// Placeholder Pages
const Placeholder = ({ title }: { title: string }) => <div className="p-8"><h1>{title}</h1></div>;

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <LazyRoute><HomePage /></LazyRoute> },
      { path: 'about', element: <LazyRoute><AboutPage /></LazyRoute> },
      { path: 'explorer', element: <LazyRoute><PublicExplorerPage /></LazyRoute> },
      { path: 'search', element: <LazyRoute><SearchPage /></LazyRoute> },
      { path: 'discovery', element: <LazyRoute><SemanticSearchPage /></LazyRoute> },
      { path: 'statistics', element: <LazyRoute><PublicStatisticsPage /></LazyRoute> },
      { path: 'statistics/coverage', element: <LazyRoute><CoverageDashboardPage /></LazyRoute> },
      { path: 'community/leaderboard', element: <LazyRoute><LeaderboardPage /></LazyRoute> },
      { path: 'community/hall-of-fame', element: <LazyRoute><HallOfFamePage /></LazyRoute> },
      { path: 'community/profile/:userId', element: <LazyRoute><PublicProfilePage /></LazyRoute> },
      { path: 'help', element: <LazyRoute><HelpCenterPage /></LazyRoute> },
      { path: 'help/article/:slug', element: <LazyRoute><ArticlePage /></LazyRoute> },
      { path: 'support', element: <LazyRoute><SupportCenterPage /></LazyRoute> },
      { path: 'support/ticket/:id', element: <LazyRoute><TicketDetailsPage /></LazyRoute> },
      { path: 'legal', element: <LazyRoute><LegalHubPage /></LazyRoute> },
      { path: 'legal/:slug', element: <LazyRoute><PolicyPage /></LazyRoute> },
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
          { path: '/ai', element: <LazyRoute><AIAssistantPage /></LazyRoute> },
          { path: '/ai/:id', element: <LazyRoute><AIAssistantPage /></LazyRoute> },
          { path: '/analysis/:paperId', element: <LazyRoute><PaperAnalysisPage /></LazyRoute> },
          { path: '/study-planner', element: <LazyRoute><StudyPlannerPage /></LazyRoute> },
          { path: '/dashboard', element: <LazyRoute><AdminDashboard /></LazyRoute> },
          { path: '/data-management', element: <LazyRoute><AcademicDataManagement /></LazyRoute> },
          { path: '/search', element: <LazyRoute><SearchPage /></LazyRoute> },
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
              { path: 'ai-gateway', element: <LazyRoute><AiAdminDashboard /></LazyRoute> },
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
