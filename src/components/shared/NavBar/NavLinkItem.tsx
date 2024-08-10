import { Link } from '../Link/Link';
import styles from './NavBar.module.css';

const NavLinkItem = ({
  to,
  label,
  isActive,
  setIsMobileMenuOpen,
  external,
}: {
  to: string;
  label: string;
  isActive: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  external?: boolean;
}) => (
  <Link
    to={to}
    className={`${styles.navBar__item} ${isActive ? styles['navBar__item--active'] : ''}`}
    target={external ? '_blank' : undefined}
    onClick={() => setIsMobileMenuOpen(false)}
  >
    <span className={styles['p-menuitem-text']}>{label}</span>
  </Link>
);

export default NavLinkItem;
