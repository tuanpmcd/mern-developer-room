import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto my-5">
          <h4 className="text-dark mt-5 mb-4">Dashboard</h4>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <div className="my-1">
                <button className="btn btn-danger btn-sm" onClick={() => deleteAccount()}>
                  Delete Account
                </button>
              </div>
            </>
          ) : (
            <>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-info text-white my-1">
                Create Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
