import { memo } from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = memo(({ isLoggedIn, user, onLogout }) => {
  return (
    <div className="mainboard-area left">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line-start">start</span>
          <span className="line-streaming">
            <span className="highlight">streaming</span>
            <span className="oval-decor streaming-oval"></span>
          </span>
          <span className="line-games">
            games
            <span className="oval-decor games-oval"></span>
          </span>
          <span className="line-differently">
            differently
            <span className="oval-decor differently-oval"></span>
          </span>
        </h1>
        <p className="hero-subtitle">
          gamor now has <span className="highlight-sub">stream party </span> platform
        </p>
        <div className="hero-actions">
          {isLoggedIn ? (
            <>
              <span className="hero-user">Welcome, {user}</span>
              <button className="hero-logout" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-signin">Sign in</Link>
              <Link to="/register" className="btn-create">Create account</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
});