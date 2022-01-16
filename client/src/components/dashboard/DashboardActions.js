import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='row'>
      <div className="col-md-4 mb-2">
        <Link to='/edit-profile' className='btn btn-info btn-sm text-white w-100'>
          Edit Profile
        </Link>
      </div>
      <div className="col-md-4 mb-2">
        <Link to='/add-experience' className='btn btn-info btn-sm text-white w-100'>
          Add Experience
        </Link>
      </div>
      <div className="col-md-4 mb-2">
        <Link to='/add-education' className='btn btn-info btn-sm text-white w-100'>
          Add Education
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
