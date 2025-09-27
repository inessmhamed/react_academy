import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nSetup';
import ErrorBoundary from './components/ErrorBoundary';

// Make sure i18n is initialized before rendering
const renderApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </I18nextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Initialize rendering
if (i18n.isInitialized) {
  renderApp();
} else {
  i18n.on('initialized', () => {
    renderApp();
  });
  
  // Fallback in case the event doesn't fire
  setTimeout(() => {
    if (!i18n.isInitialized) {
      console.warn('i18n initialization timed out, rendering anyway');
      renderApp();
    }
  }, 2000);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
