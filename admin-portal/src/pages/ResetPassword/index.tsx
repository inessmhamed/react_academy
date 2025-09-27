import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import background from '../../assets/backfround-image.jpg';
import logo from '../../assets/logo.png';
import loginStore from '../../store/loginStore';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [translationsReady, setTranslationsReady] = useState(false);
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Default translations in case i18n fails
  const defaultTranslations = {
    'resetPassword.title': 'Reset Password',
    'resetPassword.subtitle': 'Enter your email address and we\'ll send you a link to reset your password',
    'resetPassword.email': 'Email Address',
    'resetPassword.sendResetLink': 'Send Reset Link',
    'resetPassword.backToLogin': 'Back to Login',
    'resetPassword.checkEmail': 'Check Your Email',
    'resetPassword.emailSent': 'We\'ve sent a password reset link to your email address. Please check your inbox and follow the instructions.',
    'resetPassword.confirmTitle': 'Set New Password',
    'resetPassword.confirmSubtitle': 'Enter your new password below',
    'resetPassword.newPassword': 'New Password',
    'resetPassword.confirmPassword': 'Confirm Password',
    'resetPassword.resetPasswordBtn': 'Reset Password',
    'resetPassword.passwordsDoNotMatch': 'Passwords do not match',
    'resetPassword.passwordTooShort': 'Password must be at least 8 characters long',
    'resetPassword.success': 'Password reset successful! You can now login with your new password.',
    'resetPassword.invalidToken': 'Invalid or expired reset token. Please request a new password reset.',
    'resetPassword.academy': 'Alraed Academy for Training & Formation',
    'resetPassword.site': 'www.academyalraeed.com'
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

  // Handle request password reset (send email)
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await loginStore.requestPasswordReset(email);
      setEmailSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle confirm password reset (with token)
  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError(safeT('resetPassword.passwordsDoNotMatch'));
      return;
    }

    if (newPassword.length < 8) {
      setError(safeT('resetPassword.passwordTooShort'));
      return;
    }

    if (!token) {
      setError(safeT('resetPassword.invalidToken'));
      return;
    }

    setIsLoading(true);

    try {
      await loginStore.confirmPasswordReset(token, newPassword);
      setSuccess(safeT('resetPassword.success'));
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setError(error.message || safeT('resetPassword.invalidToken'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  // If we have a token, show the confirm reset form
  if (token) {
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
                {safeT('resetPassword.confirmTitle')}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {safeT('resetPassword.confirmSubtitle')}
              </p>
            </div>

            {success ? (
              <div className="mt-8 text-center">
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
                <p className="text-sm text-gray-600">
                  Redirecting to login page...
                </p>
              </div>
            ) : (
              <form
                className="mt-8 space-y-6"
                onSubmit={handleConfirmReset}
                dir={isRTL ? "rtl" : "ltr"}
              >
                {error && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      {safeT('resetPassword.newPassword')}
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      {safeT('resetPassword.confirmPassword')}
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    {safeT('resetPassword.backToLogin')}
                  </Link>

                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    {i18n.language === 'ar' ? 'English' : 'العربية'}
                  </button>
                </div>

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
                    safeT('resetPassword.resetPasswordBtn')
                  )}
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              {safeT('resetPassword.site')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show email sent confirmation
  if (emailSent) {
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
                {safeT('resetPassword.checkEmail')}
              </h2>
            </div>

            <div className="mt-8 text-center">
              <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                {safeT('resetPassword.emailSent')}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  {safeT('resetPassword.backToLogin')}
                </Link>

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="text-sm font-medium text-primary hover:text-primary-hover"
                >
                  {i18n.language === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>

              <button
                onClick={() => setEmailSent(false)}
                className="mt-4 group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Another Email
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              {safeT('resetPassword.site')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: Show request reset form
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
              {safeT('resetPassword.title')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {safeT('resetPassword.subtitle')}
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleRequestReset}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {safeT('resetPassword.email')}
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

            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {safeT('resetPassword.backToLogin')}
              </Link>

              <button
                type="button"
                onClick={toggleLanguage}
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>

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
                safeT('resetPassword.sendResetLink')
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {safeT('resetPassword.site')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
