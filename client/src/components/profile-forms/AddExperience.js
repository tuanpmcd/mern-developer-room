import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 mb-4">
          <h4 className="mt-4">Add An Experience</h4>
          <small>* = required</small>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addExperience(formData, navigate);
            }}
          >
            <div className="my-3">
              <input
                type="text"
                className='form-control'
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="* Company"
                name="company"
                value={company}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <h6>From Date</h6>
              <input type="date" className='form-control' name="from" value={from} onChange={onChange} />
            </div>
            <div className="mb-3">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                  }}
                />{' '}
                Current Job
              </p>
            </div>
            <div className="mb-3">
              <h6>To Date</h6>
              <input
                type="date"
                className='form-control'
                name="to"
                value={to}
                onChange={onChange}
                disabled={current}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="description"
                className='form-control'
                cols="30"
                rows="2"
                placeholder="Job Description"
                value={description}
                onChange={onChange}
              />
            </div>
            <input type="submit" className="btn btn-info text-white me-2 my-1" />
            <Link className="btn btn-secondary my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </div>
      </div>

    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
