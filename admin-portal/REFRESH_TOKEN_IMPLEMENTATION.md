# Refresh Token Implementation - Admin Portal

This document explains the refresh token implementation in the admin portal, which provides automatic token refresh and enhanced security.

## Overview

The refresh token system has been implemented with the following components:

### 1. Updated Login Store (`src/store/loginStore.ts`)

**New Features:**
- Stores both access and refresh tokens
- Automatic token refresh functionality
- Enhanced token validation
- Proper logout with refresh token invalidation

**Key Methods:**
- `login()` - Stores both accessToken and refreshToken
- `logout()` - Sends refresh token to backend for invalidation
- `refreshToken()` - Refreshes access token using refresh token
- `ensureValidToken()` - Checks and refreshes token if needed
- `getAccessToken()` / `getRefreshToken()` - Token getters

### 2. Axios Instance with Interceptors (`src/utils/api.ts`)

**Features:**
- Automatic access token injection in requests
- Automatic token refresh on 401 TOKEN_EXPIRED errors
- Seamless retry of failed requests after token refresh
- Automatic logout on refresh failure

**How it works:**
1. Request interceptor adds access token to all requests
2. Response interceptor catches 401 TOKEN_EXPIRED errors
3. Attempts to refresh token using refresh token
4. Retries original request with new access token
5. Redirects to login if refresh fails

### 3. Authentication Hook (`src/hooks/useAuth.ts`)

**Provides:**
- Centralized authentication state management
- React-friendly authentication methods
- Loading states for UI feedback
- Automatic token validation on app start

**Usage in components:**
```typescript
const { user, isAuthenticated, isLoading, login, logout } = useAuth();
```

### 4. Enhanced App Component (`src/App.tsx`)

**Features:**
- Loading screen during authentication check
- Automatic token validation on app start
- Proper authentication state management

### 5. Updated Login Page (`src/pages/Login/index.tsx`)

**Improvements:**
- Uses useAuth hook for authentication
- Loading states during login
- Better error handling

### 6. Updated Formation Store (`src/store/formationStore.ts`)

**Changes:**
- Uses axios instance with automatic token refresh
- Better error handling with axios error responses
- Automatic authentication for protected endpoints

## Token Flow

### Login Process
1. User submits credentials
2. Backend returns accessToken, refreshToken, and user data
3. Both tokens are stored in localStorage
4. User is redirected to dashboard

### API Request Process
1. Axios interceptor adds access token to request
2. If token is expired (401 TOKEN_EXPIRED), interceptor:
   - Gets refresh token from storage
   - Calls `/refresh-token` endpoint
   - Updates access token in storage
   - Retries original request with new token
3. If refresh fails, user is logged out and redirected to login

### Logout Process
1. Sends refresh token to `/logout` endpoint
2. Backend invalidates the refresh token
3. Clears all tokens from localStorage
4. Redirects to login page

## Security Features

### Token Storage
- Access tokens: Short-lived (15 minutes)
- Refresh tokens: Long-lived (7 days)
- Both stored in localStorage (can be upgraded to httpOnly cookies)

### Automatic Cleanup
- Failed refresh attempts clear all auth data
- Logout invalidates refresh token on backend
- Expired tokens are automatically refreshed

### Error Handling
- Specific handling for TOKEN_EXPIRED errors
- Graceful fallback to login on refresh failure
- User-friendly error messages

## Backend Compatibility

The implementation is compatible with the backend refresh token system:

### Expected Endpoints
- `POST /login` - Returns accessToken, refreshToken, user, expiresIn
- `POST /refresh-token` - Accepts refreshToken, returns new accessToken
- `POST /logout` - Accepts refreshToken for invalidation

### Expected Error Format
```json
{
  "code": "TOKEN_EXPIRED",
  "message": "Access token has expired"
}
```

## Usage Examples

### Using the Auth Hook
```typescript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Making API Calls
```typescript
import api from '../utils/api';

// This will automatically include auth headers and handle token refresh
const fetchData = async () => {
  try {
    const response = await api.get('/protected-endpoint');
    return response.data;
  } catch (error) {
    // Handle error (user will be auto-logged out if auth fails)
    console.error('API call failed:', error);
  }
};
```

### Manual Token Refresh
```typescript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { ensureValidToken } = useAuth();
  
  const handleSensitiveOperation = async () => {
    // Ensure we have a valid token before sensitive operations
    const isValid = await ensureValidToken();
    if (isValid) {
      // Proceed with operation
    } else {
      // User will be redirected to login
    }
  };
};
```

## Migration Notes

### From Old System
- Old `token` storage is maintained for backward compatibility
- Existing components continue to work without changes
- New components should use `useAuth` hook

### Breaking Changes
- None - the implementation is backward compatible

## Future Improvements

1. **Secure Storage**: Move to httpOnly cookies for production
2. **Token Rotation**: Implement refresh token rotation
3. **Device Tracking**: Add device-specific refresh tokens
4. **Biometric Auth**: Add fingerprint/face ID support
5. **Session Management**: Add concurrent session limits

## Testing

To test the refresh token functionality:

1. **Login**: Verify both tokens are stored
2. **API Calls**: Check automatic token injection
3. **Token Expiry**: Wait for token to expire and verify auto-refresh
4. **Logout**: Confirm tokens are cleared and invalidated
5. **Refresh Failure**: Test behavior when refresh token is invalid

## Troubleshooting

### Common Issues

1. **Infinite Refresh Loop**: Check backend token expiration times
2. **CORS Errors**: Ensure backend allows refresh-token endpoint
3. **Storage Issues**: Verify localStorage is available
4. **Network Errors**: Handle offline scenarios gracefully

### Debug Mode

Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'auth');
```

This will log authentication events to the console.
