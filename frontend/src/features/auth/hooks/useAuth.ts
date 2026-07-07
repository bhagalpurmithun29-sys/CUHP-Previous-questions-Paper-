import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { UserRole } from '../types';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const useUser = () => {
  const { user } = useAuth();
  return user;
};

// Extensible role checking hook
export const useRoles = () => {
  const { user } = useAuth();

  const isStudent = user?.role === UserRole.STUDENT;
  const isModerator = user?.role === UserRole.MODERATOR;
  const isAdmin = user?.role === UserRole.ADMIN;

  // Hierarchical checks
  const isAtLeastModerator = isModerator || isAdmin;
  
  return {
    isStudent,
    isModerator,
    isAdmin,
    isAtLeastModerator
  };
};
