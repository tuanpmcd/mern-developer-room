import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <div className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <div className='row'>
          <div className="col-md-8 mt-5 mx-auto">
            <div className="d-flex align-items-center mt-4 mb-3">
              <Link to="/profiles" className="btn btn-secondary btn-sm me-2">
                Go Back
              </Link>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to="/edit-profile" className="btn btn-secondary btn-sm">
                    Edit Profile
                  </Link>
                )}
            </div>
            <div className="my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="p-2">
                <h2 className="text-info">Experience</h2>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </>
                ) : (
                  <h6>No experience credentials</h6>
                )}
              </div>

              <div className="p-2">
                <h2 className="text-info">Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </>
                ) : (
                  <h6>No education credentials</h6>
                )}
              </div>

              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
