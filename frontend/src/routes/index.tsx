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
const ContactPage = React.lazy(() => import('../pages/ContactPage').then(module => ({ default: module.ContactPage })));
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
const Dashboard = React.lazy(() => import('../pages/Dashboard').then(module => ({ default: module.Dashboard })));
const AdminDashboard = React.lazy(() => import('../features/dashboard/pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AcademicDataManagement = React.lazy(() => import('../features/dashboard/pages/AcademicDataManagement').then(module => ({ default: module.AcademicDataManagement })));
const AiAdminDashboard = React.lazy(() => import('../features/dashboard/pages/AiAdminDashboard').then(module => ({ default: module.AiAdminDashboard })));
const AIAssistantPage = React.lazy(() => import('../features/ai/pages/AIAssistantPage').then(module => ({ default: module.AIAssistantPage })));
const AIChatPage = React.lazy(() => import('../features/ai-chat/pages/AIChatPage').then(module => ({ default: module.AIChatPage })));
const SemanticSearchPage = React.lazy(() => import('../features/semantic-search/pages/SemanticSearchPage').then(module => ({ default: module.SemanticSearchPage })));
const PaperAnalysisPage = React.lazy(() => import('../features/analysis/pages/PaperAnalysisPage').then(module => ({ default: module.default })));
const StudyPlannerPage = React.lazy(() => import('../features/study-planner/pages/StudyPlannerPage').then(module => ({ default: module.default })));
const RevisionDashboardPage = React.lazy(() => import('../features/revision/pages/RevisionDashboardPage').then(module => ({ default: module.default })));
const OcrManagerPage = React.lazy(() => import('../features/ocr/pages/OcrManagerPage').then(module => ({ default: module.default })));
const KnowledgeDashboard = React.lazy(() => import('../features/rag/pages/KnowledgeDashboard').then(module => ({ default: module.default })));
const AgentDashboard = React.lazy(() => import('../features/agents/pages/AgentDashboard').then(module => ({ default: module.default })));
const FacultyAIPage = React.lazy(() => import('../features/faculty-ai/pages/FacultyAIPage').then(module => ({ default: module.default })));
const ExecutiveDashboardPage = React.lazy(() => import('../features/executive-ai/pages/ExecutiveDashboardPage').then(module => ({ default: module.default })));
const LinkAccountsPage = React.lazy(() => import('../features/auth/pages/LinkAccountsPage').then(module => ({ default: module.default })));
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const StaffLoginPage = React.lazy(() => import('../features/auth/pages/StaffLoginPage').then(module => ({ default: module.StaffLoginPage })));
const RegisterPage = React.lazy(() => import('../features/auth/pages/RegisterPage').then(module => ({ default: module.RegisterPage })));
const MFAPage = React.lazy(() => import('../features/security/pages/MFAPage').then(module => ({ default: module.default })));
const SecurityCenterPage = React.lazy(() => import('../features/security/pages/SecurityCenterPage').then(module => ({ default: module.default })));
const PreferencesPage = React.lazy(() => import('../features/preferences/pages/PreferencesPage').then(module => ({ default: module.default })));
const WelcomePage = React.lazy(() => import('../features/onboarding/pages/WelcomePage').then(module => ({ default: module.default })));
const OnboardingWizard = React.lazy(() => import('../features/onboarding/pages/OnboardingWizard').then(module => ({ default: module.default })));
const AccountCenterPage = React.lazy(() => import('../features/account/pages/AccountCenterPage').then(module => ({ default: module.default })));
const WhatsNewPage = React.lazy(() => import('../features/adoption/pages/WhatsNewPage').then(module => ({ default: module.default })));
const PaperUploadPage = React.lazy(() => import('../features/papers/pages/PaperUploadPage').then(module => ({ default: module.PaperUploadPage })));
const PDFViewerPage = React.lazy(() => import('../features/pdf-viewer/pages/PDFViewerPage').then(module => ({ default: module.PDFViewerPage })));
const DownloadCenterPage = React.lazy(() => import('../features/downloads/pages/DownloadCenterPage').then(module => ({ default: module.DownloadCenterPage })));
const BookmarksPage = React.lazy(() => import('../features/bookmarks/pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const MyLibraryPage = React.lazy(() => import('../features/library/pages/MyLibraryPage').then(module => ({ default: module.MyLibraryPage })));

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
      { path: 'contact', element: <LazyRoute><ContactPage /></LazyRoute> },
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
          { path: ROUTES.LOGIN, element: <LazyRoute><LoginPage /></LazyRoute> },
          { path: '/admin/login', element: <LazyRoute><StaffLoginPage /></LazyRoute> },
          { path: ROUTES.REGISTER, element: <LazyRoute><RegisterPage /></LazyRoute> },
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
          { path: '/ai-chat', element: <LazyRoute><AIChatPage /></LazyRoute> },
          { path: '/ai-chat/:id', element: <LazyRoute><AIChatPage /></LazyRoute> },
          { path: '/analysis/:paperId', element: <LazyRoute><PaperAnalysisPage /></LazyRoute> },
          { path: '/study-planner', element: <LazyRoute><StudyPlannerPage /></LazyRoute> },
          { path: '/upload', element: <LazyRoute><PaperUploadPage /></LazyRoute> },
          { path: '/revision', element: <LazyRoute><RevisionDashboardPage /></LazyRoute> },
          { path: '/dashboard', element: <LazyRoute><Dashboard /></LazyRoute> },
          { path: '/data-management', element: <LazyRoute><AcademicDataManagement /></LazyRoute> },
          { path: '/search', element: <LazyRoute><SearchPage /></LazyRoute> },
          { path: '/linked-accounts', element: <LazyRoute><LinkAccountsPage /></LazyRoute> },
          { path: '/mfa', element: <LazyRoute><MFAPage /></LazyRoute> },
          { path: '/security', element: <LazyRoute><SecurityCenterPage /></LazyRoute> },
          { path: '/preferences', element: <LazyRoute><PreferencesPage /></LazyRoute> },
          { path: '/account', element: <LazyRoute><AccountCenterPage /></LazyRoute> },
          { path: '/onboarding', element: <LazyRoute><WelcomePage /></LazyRoute> },
          { path: '/onboarding/wizard', element: <LazyRoute><OnboardingWizard /></LazyRoute> },
          { path: '/whats-new', element: <LazyRoute><WhatsNewPage /></LazyRoute> },
          { path: '/downloads', element: <LazyRoute><DownloadCenterPage /></LazyRoute> },
          { path: '/bookmarks', element: <LazyRoute><BookmarksPage /></LazyRoute> },
          { path: '/library', element: <LazyRoute><MyLibraryPage /></LazyRoute> },
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
              { path: 'faculty-ai', element: <LazyRoute><FacultyAIPage /></LazyRoute> },
              { path: 'ocr/:paperId', element: <LazyRoute><OcrManagerPage /></LazyRoute> },
            ],
          },
          {
            path: '/admin',
            element: <RoleGuard allowedRoles={[UserRole.ADMIN]} />,
            children: [
              { path: 'dashboard', element: <Placeholder title="Admin Dashboard" /> },
              { path: 'intelligence', element: <LazyRoute><ExecutiveDashboardPage /></LazyRoute> },
              { path: 'knowledge-engine', element: <LazyRoute><KnowledgeDashboard /></LazyRoute> },
              { path: 'agents', element: <LazyRoute><AgentDashboard /></LazyRoute> },
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
      },
      {
        path: '/viewer/:paperId',
        element: <LazyRoute><PDFViewerPage /></LazyRoute>
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
