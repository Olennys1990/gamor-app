import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import './Navbar.css';

export const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/">{t('home')}</Link>
          <Link to="/streams">{t('streams')}</Link>
          <Link to="/party">{t('party')}</Link>
          <Link to="/premium">{t('premium')}</Link>
        </div>

        <div className="navbar-logo">
          <Link to="/">{t('logo')}</Link>
        </div>

        <div className="navbar-controls">
          <Link to="/signin">{t('signin')}</Link>
          <Link to="/createaccount">{t('createaccount')}</Link>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};