import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { AuthApi } from '../api/auth.api';
import { RESET_PASSWORD_CONSTANTS } from '../constants/resetPassword.constants';
import { vi } from 'vitest';

// Mock the API module
vi.mock('../api/auth.api', () => ({
  AuthApi: {
    resetPassword: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderComponent = (initialRoute = '/reset-password?token=valid-token') => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ResetPasswordPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ResetPassword Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  describe('UI Rendering & Token Validation', () => {
    it('renders invalid token UI if token is missing', () => {
      renderComponent('/reset-password');
      
      expect(screen.getByText('Invalid Link')).toBeInTheDocument();
      expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.MISSING_TOKEN)).toBeInTheDocument();
    });

    it('renders reset password form if token is present', () => {
      renderComponent('/reset-password?token=some-valid-token');
      
      expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.TITLE)).toBeInTheDocument();
      expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE)).toBeInTheDocument();
      
      const newPasswordInput = screen.getByLabelText(/new password/i);
      expect(newPasswordInput).toBeInTheDocument();
      expect(newPasswordInput).toHaveAttribute('type', 'password');
      
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
      
      const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      expect(submitBtn).toBeInTheDocument();
    });

    it('toggles password visibility when eye icon is clicked', async () => {
      renderComponent();
      
      const newPasswordInput = screen.getByLabelText(/new password/i);
      expect(newPasswordInput).toHaveAttribute('type', 'password');
      
      const toggleButtons = screen.getAllByRole('button', { name: /show password/i });
      fireEvent.click(toggleButtons[0]);
      
      expect(newPasswordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Validation', () => {
    it('shows error when submitting empty form', async () => {
      renderComponent();
      
      const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_REQUIRED)).toBeInTheDocument();
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.CONFIRM_PASSWORD_REQUIRED)).toBeInTheDocument();
      });
    });

    it('shows error when passwords do not match', async () => {
      renderComponent();
      
      const newPasswordInput = screen.getByLabelText(/new password/i);
      await userEvent.type(newPasswordInput, 'ValidPass123!');
      
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      await userEvent.type(confirmPasswordInput, 'DifferentPass123!');
      
      const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_MISMATCH)).toBeInTheDocument();
      });
    });

    it('shows error for weak password', async () => {
      renderComponent();
      
      const newPasswordInput = screen.getByLabelText(/new password/i);
      await userEvent.type(newPasswordInput, 'weak');
      
      const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.VALIDATION.REGEX_MESSAGE)).toBeInTheDocument();
      });
    });
  });

  describe('API & Flow', () => {
    it('submits valid form and displays success UI', async () => {
      const mockMutate = vi.mocked(AuthApi.resetPassword);
      mockMutate.mockResolvedValueOnce({ success: true, message: 'Success' });

      renderComponent('/reset-password?token=valid-token');
      
      const newPasswordInput = screen.getByLabelText(/new password/i);
      await userEvent.type(newPasswordInput, 'StrongP@ssw0rd2024');
      
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      await userEvent.type(confirmPasswordInput, 'StrongP@ssw0rd2024');
      
      const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({
          token: 'valid-token',
          password: 'StrongP@ssw0rd2024',
        });
      });

      // Verify success UI
      await waitFor(() => {
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_TITLE)).toBeInTheDocument();
        expect(screen.getByText(RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_MESSAGE)).toBeInTheDocument();
      });
    });
  });
});
