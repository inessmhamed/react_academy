import styles from './NavBar.module.css';

const LanguageToggle = ({
  currentLanguage,
  onToggle,
}: {
  currentLanguage: string;
  onToggle: () => void;
}) => (
  <button
    className={`${styles['navBar__item--languageToggle']} ${styles.navBar__item}`}
    onClick={onToggle}
    type='button'
  >
    <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
  </button>
);

export default LanguageToggle;
