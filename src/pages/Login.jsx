import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      setError('Please fill in all fields');
      return;
    }
    login(user);
    navigate('/');
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="user">User</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={handleUserChange}
              placeholder="Enter your username"
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="login-input"
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p className="login-register">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};