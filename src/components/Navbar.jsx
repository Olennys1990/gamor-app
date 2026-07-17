import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/stream" className={location.pathname === '/stream' ? 'active' : ''}>
            Streams
          </Link>
          <Link to="/party" className={location.pathname === '/party' ? 'active' : ''}>
            Party
          </Link>
          <Link to="/premium" className={location.pathname === '/premium' ? 'active' : ''}>
            Premium
          </Link>
        </div>

        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-g">G</span>amor
          </Link>
        </div>

        <div className="navbar-controls">
          {isLoggedIn ? (
            <>
              <span className="navbar-user">Welcome, {user}</span>
              <button className="navbar-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="btn-create-account">Create account</Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};