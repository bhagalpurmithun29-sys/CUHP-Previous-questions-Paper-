import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/login.types';

export const useRole = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return roles.includes(user?.role as UserRole);
  };

  return {
    role: user?.role,
    hasRole,
    hasAnyRole,
  };
};
