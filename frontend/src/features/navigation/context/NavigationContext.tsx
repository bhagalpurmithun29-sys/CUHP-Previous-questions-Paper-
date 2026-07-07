import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { NavigationState, NavigationAction, NavItem } from '../types/navigation.types';

const initialState: NavigationState = {
  isSidebarOpen: true,
  isMobileDrawerOpen: false,
  expandedNodes: [],
  recentPaths: [],
  pinnedItems: [],
};

const navigationReducer = (state: NavigationState, action: NavigationAction): NavigationState => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, isSidebarOpen: action.payload };
    case 'TOGGLE_MOBILE_DRAWER':
      return { ...state, isMobileDrawerOpen: !state.isMobileDrawerOpen };
    case 'SET_MOBILE_DRAWER':
      return { ...state, isMobileDrawerOpen: action.payload };
    case 'TOGGLE_NODE':
      const isExpanded = state.expandedNodes.includes(action.payload);
      return {
        ...state,
        expandedNodes: isExpanded
          ? state.expandedNodes.filter((id) => id !== action.payload)
          : [...state.expandedNodes, action.payload],
      };
    case 'ADD_RECENT_PATH':
      // Keep last 10 paths, avoid consecutive duplicates
      if (state.recentPaths[0] === action.payload) return state;
      const newPaths = [action.payload, ...state.recentPaths.filter(p => p !== action.payload)].slice(0, 10);
      return { ...state, recentPaths: newPaths };
    case 'TOGGLE_PIN_ITEM':
      const isPinned = state.pinnedItems.find(item => item.id === action.payload.id);
      return {
        ...state,
        pinnedItems: isPinned
          ? state.pinnedItems.filter(item => item.id !== action.payload.id)
          : [...state.pinnedItems, action.payload],
      };
    default:
      return state;
  }
};

export const NavigationContext = createContext<{
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
} | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to load state from local storage for persistence
  const [state, dispatch] = useReducer(navigationReducer, initialState, (initial) => {
    try {
      const local = localStorage.getItem('cuhp_nav_state');
      if (local) {
        return { ...initial, ...JSON.parse(local), isMobileDrawerOpen: false };
      }
    } catch (e) {
      console.error('Failed to parse nav state', e);
    }
    return initial;
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cuhp_nav_state', JSON.stringify({
      isSidebarOpen: state.isSidebarOpen,
      expandedNodes: state.expandedNodes,
      recentPaths: state.recentPaths,
      pinnedItems: state.pinnedItems,
    }));
  }, [state]);
  
  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && state.isMobileDrawerOpen) {
        dispatch({ type: 'SET_MOBILE_DRAWER', payload: false });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isMobileDrawerOpen]);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};
