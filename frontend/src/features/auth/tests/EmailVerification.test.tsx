import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VerifyEmailPage } from '../pages/VerifyEmailPage';
import { ResendVerificationPage } from '../pages/ResendVerificationPage';
import { VerificationSuccessPage } from '../pages/VerificationSuccessPage';
import { VerificationFailedPage } from '../pages/VerificationFailedPage';
import { VerificationExpiredPage } from '../pages/VerificationExpiredPage';
import { AuthApi } from '../api/auth.api';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import { vi } from 'vitest';

// Mock the API module
vi.mock('../api/auth.api', () => ({
  AuthApi: {
    verifyEmail: vi.fn(),
    resendVerification: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderVerifyRoute = (initialRoute: string) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/verify-email/success" element={<VerificationSuccessPage />} />
          <Route path="/verify-email/failed" element={<VerificationFailedPage />} />
          <Route path="/verify-email/expired" element={<VerificationExpiredPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const renderResendRoute = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/resend-verification']}>
        <Routes>
          <Route path="/resend-verification" element={<ResendVerificationPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Email Verification Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  describe('VerifyEmailPage Flow', () => {
    it('redirects to failed page if token is missing', async () => {
      renderVerifyRoute('/verify-email');
      
      await waitFor(() => {
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.FAILED_TITLE)).toBeInTheDocument();
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.MISSING_TOKEN)).toBeInTheDocument();
      });
    });

    it('calls verify API and redirects to success on valid token', async () => {
      const mockMutate = vi.mocked(AuthApi.verifyEmail);
      mockMutate.mockResolvedValueOnce({ success: true, message: 'Verified' });

      renderVerifyRoute('/verify-email?token=valid-token');
      
      expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.VERIFY_LOADING_TITLE)).toBeInTheDocument();

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith('valid-token');
      });

      await waitFor(() => {
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_TITLE)).toBeInTheDocument();
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_MESSAGE)).toBeInTheDocument();
      });
    });

    it('redirects to expired page on 410 response', async () => {
      const mockMutate = vi.mocked(AuthApi.verifyEmail);
      mockMutate.mockRejectedValueOnce({
        response: { status: 410, data: { message: 'Token expired' } }
      });

      renderVerifyRoute('/verify-email?token=expired-token');

      await waitFor(() => {
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_TITLE)).toBeInTheDocument();
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_MESSAGE)).toBeInTheDocument();
      });
    });
  });

  describe('ResendVerificationPage Flow', () => {
    it('renders resend verification form', () => {
      renderResendRoute();
      
      expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_TITLE)).toBeInTheDocument();
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toBeInTheDocument();
    });

    it('shows error on empty submit', async () => {
      renderResendRoute();
      
      const submitBtn = screen.getByRole('button', { name: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EMAIL_REQUIRED)).toBeInTheDocument();
      });
    });

    it('submits valid form and displays success UI', async () => {
      const mockMutate = vi.mocked(AuthApi.resendVerification);
      mockMutate.mockResolvedValueOnce({ success: true, message: 'Sent' });

      renderResendRoute();
      
      const emailInput = screen.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'student@cuhp.ac.in');
      
      const submitBtn = screen.getByRole('button', { name: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith('student@cuhp.ac.in');
      });

      await waitFor(() => {
        expect(screen.getByText('Check your inbox')).toBeInTheDocument();
        expect(screen.getByText(EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUCCESS)).toBeInTheDocument();
      });
    });
  });
});
