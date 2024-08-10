import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import i18n from '../i18nSetup';
import './App.css';
import NotFound from './NotFound';
import Loader from './components/shared/Loader/Loader';
import Header from './components/shared/Header/Header';
import { useTranslation } from 'react-i18next';
import Footer from './components/shared/Footer/Footer';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage/ContactUsPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));


const App = () => {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = t('common.AlRaeed Academy');
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;

  }, [t]);

  return (
    <>

      <div className='app'>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>

    </>
  );
};

export default App;
