import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { toast } from "react-toastify"

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match")
    } else if (!name || !email || !password || !password2) {
      toast.error("Please add all fields")
    }
    else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-4 mt-5 mx-auto">
          <h1 className="text-info mt-5 mb-4">Sign Up</h1>
          <p>
            <i className="fas fa-user" /> Create Your Account
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">Name</label>
              <input type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <div id="emailHelp" className="form-text text-info">This site uses Gravatar so if you want a profile image, use a Gravatar email.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <button type="submit" className="btn btn-info text-white">Register</button>
          </form>
          <p className="my-1">
            Already have an account? <Link className='text-info' to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
