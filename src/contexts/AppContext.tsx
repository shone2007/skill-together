import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Notification, MOCK_USER, MOCK_NOTIFICATIONS } from '../types';
import { AuthUser, getCurrentUser, removeToken, getToken } from '../services/authService';

interface AppState {
  user: User;
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  notifications: Notification[];
  enrolledQuests: number[];
}

type AppAction =
  | { type: 'SET_AUTH_USER'; user: AuthUser }
  | { type: 'SET_AUTH_LOADING'; loading: boolean }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'EARN_COINS'; amount: number }
  | { type: 'ENROLL_QUEST'; questId: number }
  | { type: 'MARK_READ'; notificationId: string }
  | { type: 'DISMISS_NOTIFICATION'; notificationId: string };

const initialState: AppState = {
  user: MOCK_USER,
  authUser: null,
  isAuthenticated: false,
  isAuthLoading: true,
  notifications: MOCK_NOTIFICATIONS,
  enrolledQuests: [1, 3]
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_AUTH_USER':
      return {
        ...state,
        authUser: action.user,
        isAuthenticated: true,
        isAuthLoading: false,
        user: {
          ...state.user,
          name: action.user.username,
          skillsToTeach: action.user.skillsToTeach || state.user.skillsToTeach,
          skillsToLearn: action.user.skillsToLearn || state.user.skillsToLearn
        }
      };
    case 'SET_AUTH_LOADING':
      return { ...state, isAuthLoading: action.loading };
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, authUser: null, isAuthLoading: false };
    case 'SPEND_COINS':
      return {
        ...state,
        user: { ...state.user, coins: state.user.coins - action.amount }
      };
    case 'EARN_COINS':
      return {
        ...state,
        user: { ...state.user, coins: state.user.coins + action.amount }
      };
    case 'ENROLL_QUEST':
      return {
        ...state,
        enrolledQuests: [...state.enrolledQuests, action.questId]
      };
    case 'MARK_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.notificationId ? { ...n, read: true } : n
        )
      };
    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.notificationId)
      };
    default:
      return state;
  }
}

interface AppContextType extends AppState {
  login: (authUser?: AuthUser) => void;
  logout: () => void;
  spendCoins: (amount: number) => void;
  earnCoins: (amount: number) => void;
  enrollQuest: (questId: number) => void;
  markRead: (notificationId: string) => void;
  dismissNotification: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        dispatch({ type: 'SET_AUTH_LOADING', loading: false });
        return;
      }
      try {
        const user = await getCurrentUser();
        if (user) {
          dispatch({ type: 'SET_AUTH_USER', user });
        } else {
          dispatch({ type: 'SET_AUTH_LOADING', loading: false });
        }
      } catch {
        dispatch({ type: 'SET_AUTH_LOADING', loading: false });
      }
    };
    checkAuth();
  }, []);

  const login = (authUser?: AuthUser) => {
    if (authUser) {
      dispatch({ type: 'SET_AUTH_USER', user: authUser });
    } else {
      dispatch({ type: 'LOGIN' });
    }
  };

  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  const spendCoins = (amount: number) => dispatch({ type: 'SPEND_COINS', amount });
  const earnCoins = (amount: number) => dispatch({ type: 'EARN_COINS', amount });
  const enrollQuest = (questId: number) => dispatch({ type: 'ENROLL_QUEST', questId });
  const markRead = (notificationId: string) => dispatch({ type: 'MARK_READ', notificationId });
  const dismissNotification = (notificationId: string) => dispatch({ type: 'DISMISS_NOTIFICATION', notificationId });

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      logout,
      spendCoins,
      earnCoins,
      enrollQuest,
      markRead,
      dismissNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
