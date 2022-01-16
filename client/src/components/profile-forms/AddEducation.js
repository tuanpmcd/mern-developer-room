import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { school, degree, fieldofstudy, from, to, description, current } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 mb-4">
          <h4 className="mt-4">Add Your Education</h4>
          <small>* = required</small>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addEducation(formData, navigate);
            }}
          >
            <div className="my-3">
              <input
                type="text"
                className='form-control'
                placeholder="* School or Bootcamp"
                name="school"
                value={school}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
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
                  onChange={() => setFormData({ ...formData, current: !current })}
                />{' '}
                Current School
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
                placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
