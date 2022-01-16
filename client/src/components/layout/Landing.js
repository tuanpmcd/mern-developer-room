import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="landing d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: "#303338" }}>
      <h1 className='text-white mb-4'>Developer Room</h1>
      <p className='lead px-4 text-center text-white'>
        Create a developer profile, share posts and get help from
        other developers
      </p>
      <div>
        <Link to="/register" className="btn btn-info text-white mx-1">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-dark mx-1">
          Login
        </Link>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
