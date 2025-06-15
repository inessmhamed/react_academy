import { apiUrl } from '../config/environment';

interface User {
  _id: string;
  id?: string;
  email: string;
  name?: string;
  role?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface RefreshTokenResponse {
  message: string;
  accessToken: string;
  expiresIn: number;
}

class LoginStore {

  /**
   * Login service - authenticates user and stores tokens
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data: LoginResponse = await response.json();

      if (data.accessToken) {
        // Store both access and refresh tokens
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Keep backward compatibility
        localStorage.setItem('token', data.accessToken);

        return data;
      } else {
        throw new Error('No access token received');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Logout service - clears stored data and calls logout endpoint with refresh token
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();

      // Call logout endpoint if refresh token exists
      if (refreshToken) {
        await fetch(`${apiUrl}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ refreshToken })
        }).catch(() => {
          // Ignore logout endpoint errors - still clear local storage
        });
      }
    } finally {
      // Always clear local storage regardless of API call success
      this.clearAuthData();
    }
  }

  /**
   * Get stored access token
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken') || localStorage.getItem('token');
  }

  /**
   * Get stored access token (alias for getToken)
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Get stored user data
   */
  getUser(): User | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  /**
   * Clear all authentication data from localStorage
   */
  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  /**
   * Update stored user data
   */
  updateUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get authorization headers for API requests
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  /**
   * Check if access token is expired (basic check)
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Basic JWT token expiration check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      // If we can't parse the token, consider it expired
      return true;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await fetch(`${apiUrl}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refreshToken })
      });

      if (response.ok) {
        const data: RefreshTokenResponse = await response.json();
        if (data.accessToken) {
          // Update access token
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('token', data.accessToken); // Keep backward compatibility
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Attempt to refresh token if expired, return true if token is valid
   */
  async ensureValidToken(): Promise<boolean> {
    if (!this.isTokenExpired()) {
      return true;
    }

    // Token is expired, try to refresh
    const refreshed = await this.refreshToken();
    if (!refreshed) {
      // Refresh failed, clear auth data
      this.clearAuthData();
      return false;
    }

    return true;
  }
}

// Create and export a singleton instance
const loginStore = new LoginStore();
export default loginStore;

// Export types for use in components
export type { User, LoginCredentials, LoginResponse, RefreshTokenResponse };
