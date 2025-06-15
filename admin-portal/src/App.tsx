import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DefaultLayout from './components/Layout/DefaultLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Formations from './pages/Formations';
import CreateFormation from './pages/Formations/createFormation';
import { loginStore } from './store';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Set the direction of the document based on the language
  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Check authentication status and handle token refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (loginStore.isAuthenticated()) {
          // Check if token is valid or can be refreshed
          const isValid = await loginStore.ensureValidToken();
          setIsAuthenticated(isValid);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DefaultLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="formations" element={<Formations />} />
          <Route path="formations/create" element={<CreateFormation />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
