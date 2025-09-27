import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/backfround-image.jpg';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [translationsReady, setTranslationsReady] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  // Default translations in case i18n fails
  const defaultTranslations = {
    'login.title': 'Sign In',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.rememberMe': 'Remember Me',
    'login.loginBtn': 'Login',
    'login.googleBtn': 'Login with Google',
    'login.academy': 'Alraed Academy for Training & Formation',
    'login.site': 'www.academyalraeed.com',
    'login.forgotPassword': 'Forgot Password?',
    'login.noAccount': 'Don\'t have an account?',
    'login.createAccount': 'Create Account'
  };

  // Safe translation function
  const safeT = (key: string) => {
    if (translationsReady) {
      return t(key);
    }
    return defaultTranslations[key as keyof typeof defaultTranslations] || key;
  };

  // Check if i18n is initialized
  useEffect(() => {
    if (i18n.isInitialized) {
      setTranslationsReady(true);
    } else {
      const checkInit = () => {
        if (i18n.isInitialized) {
          setTranslationsReady(true);
        }
      };

      // Check again after a short delay
      const timer = setTimeout(checkInit, 100);
      return () => clearTimeout(timer);
    }
  }, [i18n]);

  // Determine direction based on language
  const isRTL = i18n.language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const result = await login({ email, password });
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center">
            <img src={logo} alt="Logo" className="h-20 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">
              {safeT('login.title')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {safeT('login.academy')}
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {safeT('login.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {safeT('login.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {safeT('login.rememberMe')}
                </label>
              </div>

              <Link
                to="/reset-password"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {safeT('login.forgotPassword')}
              </Link>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={toggleLanguage}
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  safeT('login.loginBtn')
                )}
              </button>

              <button
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <svg className="mr-2 -ml-1 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                {safeT('login.googleBtn')}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {safeT('login.noAccount')}{' '}
              <Link
                to="/create-account"
                className="font-medium text-primary hover:text-primary-hover"
              >
                {safeT('login.createAccount')}
              </Link>
            </p>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            {safeT('login.site')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
