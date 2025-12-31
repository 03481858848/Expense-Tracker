import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../utils/auth';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-professional">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ textDecoration: 'none' }}>
          <Logo size={45} showText={true} variant="navbar" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/add')}`} to="/add">
                Add Expense
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/expenses')}`} to="/expenses">
                Expense List
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/categories')}`} to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/reports')}`} to="/reports">
                Reports
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

