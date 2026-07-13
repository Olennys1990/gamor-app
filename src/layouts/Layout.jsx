import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};