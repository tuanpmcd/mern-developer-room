import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="bg-info p-2 d-flex flex-column align-items-center text-white">
      <img className="rounded-circle my-1" width={100} src={avatar} alt="" />
      <h3>{name}</h3>
      <p className="lead mb-2">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p className='mb-2'>{location ? <span>{location}</span> : null}</p>
      <div className="my-1">
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe text-white mx-1" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} text-white mx-1`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
