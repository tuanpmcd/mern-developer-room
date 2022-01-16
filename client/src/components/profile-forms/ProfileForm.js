import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({ profile: { profile, loading }, createProfile, getCurrentProfile }) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };

      // chỉ update những gì thay đổi profile
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      // chỉ update những gì thay đổi social network
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      // update những gì thay đổi skill, đẩy vào mảng skill, ngăn cách bởi dấu phẩy
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 mb-4">
          <h4 className="text-dark mt-4">
            {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
          </h4>
          <small>* = required</small>
          <form className="mb-3" onSubmit={onSubmit}>
            <div className="my-3">
              <select className='form-select' name="status" value={status} onChange={onChange}>
                <option>* Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange}
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
              <input
                type="text"
                className='form-control'
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript)
              </small>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className='form-control'
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="mb-3">
              <textarea
                className='form-control'
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type="button"
                className="btn btn-secondary me-2"
              >
                Add Social Network Links
              </button>
            </div>

            {displaySocialInputs && (
              <>
                <div className="mb-3 d-flex align-items-center">
                  <i className="fab fa-twitter fa-2x text-secondary me-2" />
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <i className="fab fa-facebook fa-2x text-secondary me-2" />
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <i className="fab fa-youtube fa-2x text-secondary me-2" />
                  <input
                    type="text"
                    className='form-control'
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <i className="fab fa-linkedin fa-2x text-secondary me-2" />
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <i className="fab fa-instagram fa-2x text-secondary me-2" />
                  <input
                    type="text"
                    className='form-control'
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={onChange}
                  />
                </div>
              </>
            )}

            <input type="submit" className="btn btn-info text-white my-1" />
            <Link className="btn btn-secondary mx-1 my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </div>
      </div>

    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
