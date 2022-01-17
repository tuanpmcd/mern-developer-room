import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div
      className='col-lg-3 border mb-2 py-2 d-flex flex-column align-items-center'
      style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}
    >
      <img src={avatar} alt='' className="rounded-circle my-3" width={100} />
      <div className='d-flex flex-column align-items-center'>
        <h5>{name}</h5>
        <p className='text-center mb-2'>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='mb-2'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-info btn-sm text-white mb-2'>
          View Profile
        </Link>
      </div>
      <ul className='list-group list-group-flush'>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='list-group-item text-info'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
