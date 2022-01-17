import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className='p-2'>
    {bio && (
      <>
        <h2 className='text-info'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
      </>
    )}
    <h2 className='text-info'>Skill Set</h2>
    <div>
      {skills.map((skill, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
