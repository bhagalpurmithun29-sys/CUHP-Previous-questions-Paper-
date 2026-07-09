import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { AuthApi } from '../api/auth.api';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgotPassword.constants';
import { vi } from 'vitest';

// Mock the API module
vi.mock('../api/auth.api', () => ({
  AuthApi: {
    forgotPassword: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ForgotPassword Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  describe('UI Rendering & Accessibility', () => {
    it('renders the forgot password form correctly', () => {
      renderComponent();
      
      expect(screen.getByText(FORGOT_PASSWORD_CONSTANTS.MESSAGES.TITLE)).toBeInTheDocument();
      expect(screen.getByText(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE)).toBeInTheDocument();
      
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      expect(submitBtn).toBeInTheDocument();
      
      const backLinks = screen.getAllByText(new RegExp(FORGOT_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN, 'i'));
      expect(backLinks.length).toBeGreaterThan(0);
    });

    it('input has correct ARIA attributes', () => {
      renderComponent();
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Validation', () => {
    it('shows error when submitting empty form', async () => {
      renderComponent();
      
      const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_REQUIRED)).toBeInTheDocument();
      });
      
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows error for invalid email format', async () => {
      renderComponent();
      
      const emailInput = screen.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'invalid-email');
      
      const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_INVALID)).toBeInTheDocument();
      });
    });
  });

  describe('API & Flow', () => {
    it('submits valid form and displays success UI', async () => {
      const mockMutate = vi.mocked(AuthApi.forgotPassword);
      mockMutate.mockResolvedValueOnce({ success: true, message: 'Success' });

      renderComponent();
      
      const emailInput = screen.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'student@cuhp.ac.in');
      
      const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({ email: 'student@cuhp.ac.in' });
      });

      // Verify success UI
      await waitFor(() => {
        expect(screen.getByText(/check your email/i)).toBeInTheDocument();
        expect(screen.getByText(FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_GENERIC)).toBeInTheDocument();
      });
    });

    it('shows loading state while submitting', async () => {
      const mockMutate = vi.mocked(AuthApi.forgotPassword);
      mockMutate.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      renderComponent();
      
      const emailInput = screen.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'student@cuhp.ac.in');
      
      const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(submitBtn).toBeDisabled();
      });
    });
  });
});
