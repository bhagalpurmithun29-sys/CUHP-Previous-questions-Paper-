import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationContext } from '../context/NavigationContext';

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Hook to track recent paths automatically based on router location
export const useRouteTracker = () => {
  const { dispatch } = useNavigation();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'ADD_RECENT_PATH', payload: location.pathname + location.search });
  }, [location.pathname, location.search, dispatch]);
};
