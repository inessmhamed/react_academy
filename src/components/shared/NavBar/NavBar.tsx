import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.css';
import LanguageToggle from './LanguageToggle';
import { languageToggleHandler } from '../../../utils';
import { useMediaQuery } from '~/hooks/useMediaQuery';
const Navbar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 960px)');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => location.pathname.startsWith(path);


  const items = [
    { key: 'home', to: '/home', label: t('navbar.home') },
    { key: 'aboutUs', to: '/about-us', label: t('navbar.aboutUs') },
    { key: 'formations', to: '/formations', label: t('navbar.formations') },
    { key: 'news', to: '/news', label: t('navbar.news') },
    { key: 'services', to: '/services', label: t('navbar.services') },
    { key: 'consulting', to: '/consulting', label: t('navbar.consulting') },
    { key: 'contact', to: '/contact-us', label: t('navbar.contactUs') },
  ];

  const navigationLinks = items.map((item) => (
    <li key={item.key} className={styles.navBar__listItem}>
      <Link
        to={item.to}
        className={isActive(item.to) ? styles.active : ''}
        onClick={() => isMobile && toggleMobileMenu()}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarInner}>

        {isMobile && (
          <button onClick={toggleMobileMenu} className={styles.language}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <div className={`${styles.navBar__menu} ${isMobileMenuOpen ? styles.navBar__menuOpen : ''}`}>
          <ul className={styles.navBar__list}>{navigationLinks}</ul>

        </div>
        <LanguageToggle
          currentLanguage={i18n.language}
          onToggle={() => languageToggleHandler(i18n)}
        />

      </div>
    </div>
  );
};

export default Navbar;