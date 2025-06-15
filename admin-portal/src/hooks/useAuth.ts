import { useState, useEffect, useCallback } from 'react';
import { loginStore } from '../store';
import type { User, LoginCredentials } from '../store/loginStore';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  ensureValidToken: () => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (loginStore.isAuthenticated()) {
          const currentUser = loginStore.getUser();
          setUser(currentUser);
          
          // Check if token is valid or can be refreshed
          const isValid = await loginStore.ensureValidToken();
          setIsAuthenticated(isValid);
          
          if (!isValid) {
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await loginStore.login(credentials);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await loginStore.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const success = await loginStore.refreshToken();
      if (!success) {
        setUser(null);
        setIsAuthenticated(false);
      }
      return success;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const ensureValidToken = useCallback(async () => {
    try {
      const isValid = await loginStore.ensureValidToken();
      if (!isValid) {
        setUser(null);
        setIsAuthenticated(false);
      }
      return isValid;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
    ensureValidToken,
  };
};

export default useAuth;
