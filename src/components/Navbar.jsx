import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = localStorage.getItem('user') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/stream">Streams</Link>
          <Link to="/party">Party</Link>
          <Link to="/premium">Premium</Link>
        </div>

        <div className="navbar-logo">
          <Link to="/">Gamor</Link>
        </div>

        <div className="navbar-controls">
          {isLoggedIn ? (
            <>
              <span className="navbar-user">Welcome, {user}</span>
              <button className="navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Create account</Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};