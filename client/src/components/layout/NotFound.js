import React from 'react';

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 text-center">
      <div>
        <h1 className="text-info">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exist</p>
      </div>
    </div>
  );
};

export default NotFound;
