import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const location = useLocation()
  const isActive = (r) => {
    if (r === location.pathname) return " active"
  }

  const authLinks = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/profiles")}`} aria-current="page" to="/profiles">
          <i className="fas fa-laptop-code me-1"></i>
          Developers
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/posts")}`} to="/posts">
          <i className="fas fa-newspaper me-1"></i>
          Posts
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">
          <i className="fas fa-user me-1" />
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt me-1" />
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/profiles")}`} aria-current="page" to="/profiles"><i className="fas fa-users me-1"></i>Developers</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/register")}`} to="/register">
          <i className="fas fa-user-plus me-1"></i>
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${isActive("/login")}`} to="/login">
          <i className="fas fa-sign-in-alt me-1"></i>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed vw-100" style={{ zIndex: "999" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevRoom
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
