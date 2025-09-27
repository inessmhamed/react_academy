// Environment configuration
export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  // Add other environment variables here as needed
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Export individual config values for convenience
export const { apiUrl, isDevelopment, isProduction } = config;

export default config;
